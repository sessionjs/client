import { InMemoryStorage, type Storage } from '@/storage'
import type { Network } from '@/network'
import { checkStorage } from '../storage/utils'
import { SessionValidationError, SessionValidationErrorCode } from '../errors/validation'
import { decode } from '../mnemonic'
import { getKeypairFromSeed, type Keypair } from '../keypair'
import { Uint8ArrayToHex, isHex } from '../utils'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '../errors/runtime'
import { wrap } from '../crypto/message-encrypt'
import { VisibleMessage } from '@/messages/messages/visible-message'
import { v4 as uuid } from 'uuid'
import { toRawMessage } from '@/messages'
import { SnodeNamespaces } from '@/types/namespaces'
import { RequestType } from '@/network/request'
import { BunNetwork } from '@/network/bun'
import type { ResponseStore } from '@/network/response'

export const forbiddenDisplayCharRegex = /\uFFD2*/g

export class Session {
  private mnemonic: string | undefined
  private keypair: Keypair | undefined
  private sessionID: string | undefined
  private displayName: string | undefined
  private network: Network
  private storage: Storage

  constructor(options: {
    storage: Storage
    network: Network
  }) {
    if (options.storage) {
      checkStorage(options.storage)
    }
    // todo: same with network
    this.network = options.network ?? new BunNetwork()
    this.storage = options.storage ?? new InMemoryStorage()
  }

  /** Sets mnemonic for this instance, parses it to keypair. Throws SessionValidationError if mnemonic is invalid */
  public setMnemonic(mnemonic: string, displayName?: string) {
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
  public getDisplayName(name: string): string | undefined {
    return this.displayName
  }

  /**
   * Sends message to other Session ID
   * Might throw SessionFetchError if there is a connection issue
   * @param to — Session ID of the recipient
   * @returns `Promise<boolean>` — whether the message was sent successfully
   */
  public async sendMessage({ to, text }: {
    to: string,
    text?: string,
  }): Promise<boolean> {
    if(!this.sessionID || !this.keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    if(to.length !== 66) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Invalid session ID length' })
    if (!to.startsWith('05') || !isHex(to)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Session ID must be a hex string starting from 05' })

    const timestamp = this.getNowWithNetworkOffset()
    const msg = new VisibleMessage({
      body: text,
      lokiProfile: {
        displayName: this.displayName ?? `(${this.sessionID.slice(0, 3)}...${this.sessionID.slice(0, 3)})`,
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

    const { messageHash, syncMessageHash } = await this.request({
      type: RequestType.Store,
      body: {
        params: {
          pubkey: rawMessage.recipient,
          data64: messageEncrypted.data64,
          ttl: messageEncrypted.ttl,
          timestamp: messageEncrypted.networkTimestamp,
          namespace: messageEncrypted.namespace,
        },
        snode: await getTargetNode(),
        sync: {
          pubkey: this.sessionID,
          data: syncMessageEncrypted.data64
        }
      }
    }) as ResponseStore

    return true
  }

  getNowWithNetworkOffset() {
    return Date.now() // todo: replace with network timestamp
  }

  async request({ type, body }: {
    type: RequestType,
    body: any
  }) {
    // todo
    return await this.network.onRequest(type, body)
  }
}