import { InMemoryStorage, StorageKeys, type Storage } from '@/storage'
import type { Network } from '@/network'
import { checkStorage } from '../storage/utils'
import { SessionValidationError, SessionValidationErrorCode } from '../errors/validation'
import { decode } from '../mnemonic'
import { getKeypairFromSeed, type Keypair } from '../keypair'
import { Uint8ArrayToHex, isHex } from '../utils'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '../errors/runtime'
import { wrap, type EncryptAndWrapMessageResults } from '../crypto/message-encrypt'
import { VisibleMessage } from '@/messages/messages/visible-message'
import { v4 as uuid } from 'uuid'
import { toRawMessage, type RawMessage } from '@/messages/signal-message'
import { SnodeNamespaces } from '@/types/namespaces'
import { RequestType, type RequestGetSwarmsBody, type RequestStoreBody } from '@/network/request'
import { BunNetwork } from '@/network/bun'
import type { ResponseGetSnodes, ResponseGetSwarms, ResponseStore } from '@/network/response'
import type { Snode } from '@/types/snode'
import _ from 'lodash'
import { SessionFetchError, SessionFetchErrorCode } from '@/errors/fetch'
import pRetry from 'p-retry'
import type { Swarm } from '@/types/swarm'
import { Poller } from '@/polling'
import type { EventCallback, EventName } from './events'
import { signalMessageToMessage } from '@/messages'

export const forbiddenDisplayCharRegex = /\uFFD2*/g

export class Session {
  private mnemonic: string | undefined
  private keypair: Keypair | undefined
  private sessionID: string | undefined
  private displayName: string | undefined
  private network: Network
  private storage: Storage
  private snodes: Snode[] | undefined
  private ourSwarms: Swarm[] | undefined
  private ourSwarm: Swarm | undefined
  private pollers = new Set<Poller>()
  public isAuthorized: boolean = false

  constructor(options?: {
    storage: Storage
    network: Network
  }) {
    if (options?.storage) {
      checkStorage(options?.storage)
    }
    // todo: same with network

    this.network = options?.network ?? new BunNetwork()
    this.storage = options?.storage ?? new InMemoryStorage()
  }

  /** Sets mnemonic for this instance, parses it to keypair. Throws SessionValidationError if mnemonic is invalid. Make sure you call this method only once, otherwise it will throw SessionRuntimeError */
  public setMnemonic(mnemonic: string, displayName?: string) {
    if (this.isAuthorized) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.InstanceAlreadyAuthorized, message: 'Mnemonic can\'t be set after it was already set' })
    mnemonic = mnemonic.trim()
    const words = mnemonic.split(' ')
    if (words.length !== 13) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in mnemonic provided in setMnemonic call. Expected 13 words, got ' + words.length })
    const seed = decode(mnemonic)
    this.keypair = getKeypairFromSeed(seed)
    this.sessionID = Uint8ArrayToHex(this.keypair.x25519.publicKey)
    this.mnemonic = mnemonic
    if (displayName !== undefined) {
      this.setDisplayName(displayName)
    }
    this.isAuthorized = true
    this.pollers.forEach(poller => poller.startPolling())
  }

  /** Returns mnemonic of this instance or undefined, if you haven't set it with setMnemonic yet */
  public getMnemonic(): string | undefined {
    return this.mnemonic
  }

  /** Returns Session ID of this instance. Throws if you haven't set user with setMnemonic yet */
  public getSessionID(): string {
    if(this.sessionID === undefined) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    return this.sessionID
  }

  /** Set display name of this instance */
  public setDisplayName(displayName: string) {
    if (displayName.length > 64 || displayName.length === 0) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidDisplayName, message: 'Display name must be between 1 and 64 characters' })
    } else {
      this.displayName = displayName.replace(forbiddenDisplayCharRegex, '')
    }
  }

  /** Get cached display name of this instance. Note that it doesn't fetch display name from network, since display name comes in configuration message, so this method might return undefined */
  public getDisplayName(): string | undefined {
    return this.displayName
  }

  /**
   * Sends message to other Session ID
   * Might throw SessionFetchError if there is a connection issue
   * @param to — Session ID of the recipient
   * @returns `Promise<{ messageHash: string, syncMessageHash: string }>` — hashes (identifiers) of the messages sent (visible and sync message_
   */
  public async sendMessage({ to, text }: {
    to: string,
    text?: string,
  }): Promise<{ messageHash: string, syncMessageHash: string }> {
    if(!this.sessionID || !this.keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    if(to.length !== 66) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Invalid session ID length' })
    if (!to.startsWith('05') || !isHex(to)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Session ID must be a hex string starting from 05' })

    const timestamp = this.getNowWithNetworkOffset()
    const msg = new VisibleMessage({
      body: text,
      lokiProfile: {
        displayName: this.displayName ?? `(${this.sessionID.slice(0, 3)}...${this.sessionID.slice(-3)})`,
        avatarPointer: undefined,
        profileKey: null//new Uint8Array(keypair.pubKey),
      },
      timestamp: timestamp,
      expirationType: 'unknown',
      expireTimer: 0,
      identifier: uuid(),
      attachments: [],
      preview: [],
      quote: undefined
    })
    const syncMessage = new VisibleMessage({
      body: text,
      lokiProfile: undefined,
      timestamp: timestamp,
      expirationType: 'unknown',
      expireTimer: 0,
      identifier: uuid(),
      attachments: [],
      preview: [],
      reaction: undefined,
      syncTarget: to,
      quote: undefined
    })

    const rawMessage = toRawMessage(to, msg, SnodeNamespaces.UserMessages)
    const rawSyncMessage = toRawMessage(to, syncMessage, SnodeNamespaces.UserMessages)

    const [messageEncrypted, syncMessageEncrypted] = await wrap(this.keypair, [
      {
        destination: to,
        plainTextBuffer: rawMessage.plainTextBuffer,
        namespace: rawMessage.namespace,
        ttl: rawMessage.ttl,
        identifier: rawMessage.identifier,
        isSyncMessage: false,
        isGroup: false
      }, {
        destination: this.sessionID,
        plainTextBuffer: rawSyncMessage.plainTextBuffer,
        namespace: rawSyncMessage.namespace,
        ttl: rawMessage.ttl,
        identifier: rawSyncMessage.identifier,
        isSyncMessage: true,
        isGroup: false
      }
    ], { networkTimestamp: timestamp })

    const send = async ({ message, data }: { message: RawMessage, data: EncryptAndWrapMessageResults }) => {
      const messageToSelf = message.recipient === this.sessionID
      let swarms = messageToSelf
        ? [await this.getOurSwarm()]
        : await this.getSwarmsFor(message.recipient)
      return await pRetry(async () => {
        let swarm
        if (messageToSelf) {
          if (swarms.length) {
            swarm = _.sample(swarms)
          } else {
            swarm = _.sample(this.ourSwarms)
            this.ourSwarm = swarm
          }
        } else {
          swarm = _.sample(swarms)
        }
        if (!swarm) throw new SessionFetchError({ code: SessionFetchErrorCode.NoSwarmsAvailable, message: 'No swarms available' })
        try {
          const { hash } = await this.request<ResponseStore, RequestStoreBody>({
            type: RequestType.Store,
            body: {
              swarm: swarm,
              destination: message.recipient,
              data64: data.data64,
              ttl: data.ttl,
              timestamp: data.networkTimestamp,
              namespace: data.namespace,
            }
          })
          return hash
        } catch (e) {
          if (e instanceof SessionFetchError && e.code === SessionFetchErrorCode.RetryWithOtherNode421Error) {
            swarms = swarms.filter(s => s !== swarm)
            this.ourSwarms = this.ourSwarms!.filter(s => s !== swarm)
          }
          throw e
        }
      }, {
        retries: 5,
        shouldRetry: e => e instanceof SessionFetchError && e.code === SessionFetchErrorCode.RetryWithOtherNode421Error
      })
    }
    
    const messageHash = await send({ message: rawMessage, data: messageEncrypted })
    const syncMessageHash = await send({ message: rawSyncMessage, data: syncMessageEncrypted })

    return { messageHash, syncMessageHash }
  }

  getNowWithNetworkOffset() {
    return Date.now() // todo: replace with network timestamp
  }

  async request<Response, Body = any>({ type, body }: {
    type: RequestType,
    body: Body
  }): Promise<Response> {
    return await this.network.onRequest(type, body) as Response
  }

  async getSwarmsFor(sessionID: string) {
    const snodes = await this.getSnodes()
    return await pRetry(async () => {
      const snode = _.sample(snodes)
      if (!snode) throw new SessionFetchError({ code: SessionFetchErrorCode.NoSnodesAvailable, message: 'No snodes available' })
      try {
        const { swarms } = await this.request<ResponseGetSwarms, RequestGetSwarmsBody>({ type: RequestType.GetSwarms, body: { snode, pubkey: sessionID } })
        if(swarms.length === 0) {
          throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoSwarmsAvailable, message: 'No swarms found for ' + sessionID })
        }
        return swarms
      } catch(e) {
        if (e instanceof SessionFetchError && e.code === SessionFetchErrorCode.RetryWithOtherNode421Error) {
          this.snodes = this.snodes!.filter(s => s !== snode)
        }
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch swarms from', snode?.public_ip, e)
        }
        throw e
      }
    }, {
      retries: 5,
      shouldRetry: e => e instanceof SessionFetchError && e.code === SessionFetchErrorCode.RetryWithOtherNode421Error
    })
  }

  async getOurSwarm() {
    if (!this.sessionID) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    if (this.ourSwarm) {
      return this.ourSwarm
    }
    this.ourSwarms = await this.getSwarmsFor(this.sessionID)
    this.ourSwarm = _.sample(this.ourSwarms)
    if(!this.ourSwarm) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoSwarmsAvailable, message: 'No swarms found for this instance' })
    return this.ourSwarm
  }

  async getSnodes() {
    if(!this.snodes) {
      const { snodes } = await this.request<ResponseGetSnodes>({ type: RequestType.GetSnodes, body: {} })
      this.snodes = snodes
    }
    return this.snodes
  }

  async resolveONS() {
    
  }

  addPoller(poller: Poller) {
    if (!(poller instanceof Poller)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidPoller, message: 'Poller must be an instance of Poller' })
    this.pollers.add(poller)
    poller._attachedToInstance(this, {
      onMessagesReceived: (messages) => {
        const dataMessages = messages
          .filter(m => m.content.dataMessage)
          .filter(m => typeof m.content.dataMessage?.syncTarget !== 'string')
        this.events.get('message')?.forEach(cb => {
          dataMessages.forEach(m => cb(signalMessageToMessage(m)))
        })
      },
      updateLastHashes: (hashes) => {
        this.storage.set(StorageKeys.LastHashes, JSON.stringify(hashes))
      },
      storage: this.storage,
      onSwarmConnectionFailed: (swarm: Swarm) => {
        this.ourSwarms = this.ourSwarms?.filter(s => s !== swarm)
        const nextSwarm = _.sample(this.ourSwarms)
        this.ourSwarm = nextSwarm
        return nextSwarm
      }
    })
  }

  getKeypair() {
    return this.keypair
  }

  private events: Map<EventName, EventCallback<EventName>[]> = new Map()
  on<E extends EventName>(eventName: E, callback: EventCallback<E>) {
    this.addEventListener(eventName, callback)
  }

  off<E extends EventName>(eventName: E, callback: EventCallback<E>) {
    this.removeEventListener(eventName, callback)
  }

  addEventListener<E extends EventName>(eventName: E, callback: EventCallback<E>) {
    this.events.set(eventName, [...(this.events.get(eventName) ?? []), callback])
  }

  removeEventListener<E extends EventName>(eventName: E, callback: EventCallback<E>) {
    this.events.set(eventName, (this.events.get(eventName) ?? []).filter(cb => cb !== callback))
  }
}