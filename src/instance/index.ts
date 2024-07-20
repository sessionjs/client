import { checkStorage, checkNetwork } from '@/utils'
import type { Storage, Network } from '@session.js/types'

import {
  SessionValidationError,
  SessionValidationErrorCode,
  SessionRuntimeError,
  SessionRuntimeErrorCode
} from '@session.js/errors'

import { InMemoryStorage } from '@/storage'
import { bunNetworkModule } from '@/initializers'

import { RequestType } from '@session.js/types/network/request'

import type { Keypair } from '@session.js/keypair'
import type { Snode } from '@session.js/types/snode'
import type { Swarm } from '@session.js/types/swarm'
import type { Poller } from '@/polling'

import { getMnemonic, setMnemonic } from './get-set-mnemomic'
import { sendMessage } from './send-message'
import { getOurSwarm, getSwarmsFor } from './swarms'
import { addPoller } from './polling'
import { getSnodes } from './snodes'
import { getFile } from '@/instance/get-file'
import { deleteMessage, deleteMessages } from '@/instance/delete-message'

import { _storeMessage } from '@/instance/_store-message'
import type { EventCallback, EventName } from './events'

export const forbiddenDisplayCharRegex = /\uFFD2*/g

export class Session {
  protected mnemonic: string | undefined
  protected keypair: Keypair | undefined
  protected sessionID: string | undefined
  protected displayName: string | undefined
  protected network: Network
  protected storage: Storage
  protected snodes: Snode[] | undefined
  protected ourSwarms: Swarm[] | undefined
  protected ourSwarm: Swarm | undefined
  protected pollers = new Set<Poller>()
  public isAuthorized: boolean = false

  constructor(options?: {
    storage?: Storage
    network?: Network
  }) {
    if (options?.storage) {
      checkStorage(options?.storage)
    }

    if (options?.network) {
      checkNetwork(options.network)
      this.network = options.network
    } else {
      if (typeof Bun !== 'undefined') {
        this.network = new bunNetworkModule.BunNetwork()
      } else {
        throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NetworkNotProvided, message: 'You haven\'t provided @session.js/client compatible network, yet trying to use Session instance outside of Bun runtime. This will not work, you must either run this project with bun.sh or provide compatible Network and other modular instruments. Alternatively, if you just want to use utilities, take a look at packages like @session.js/ons, @session.js/keypair, @session.js/mnemonic and others that @session.js/client uses under the hood and that do not require Bun server runtime.' })
      }
    }
    this.storage = options?.storage ?? new InMemoryStorage()
  }

  /** Returns mnemonic of this instance or undefined, if you haven't set it with setMnemonic yet */
  public getMnemonic = getMnemonic.bind(this)
  /** Sets mnemonic for this instance, parses it to keypair. Throws SessionValidationError if mnemonic is invalid. Make sure you call this method only once, otherwise it will throw SessionRuntimeError */
  public setMnemonic = setMnemonic.bind(this)

  /** Returns Session ID of this instance. Throws if you haven't set user with setMnemonic yet */
  public getSessionID(): string {
    if(this.sessionID === undefined) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    return this.sessionID
  }
  
  /** Get cached display name of this instance. Note that it doesn't fetch display name from network, since display name comes in configuration message, so this method might return undefined */
  public getDisplayName(): string | undefined {
    return this.displayName
  }
  /** Set display name of this instance */
  public setDisplayName(displayName: string) {
    if (displayName.length > 64 || displayName.length === 0) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidDisplayName, message: 'Display name must be between 1 and 64 characters' })
    } else {
      this.displayName = displayName.replace(forbiddenDisplayCharRegex, '')
    }
  }

  /** Returns Session.keypair of this instance. Returns undefined if you haven't initialized this instance with mnemonic yet. */
  getKeypair() {
    return this.keypair
  }

  /** Advanced use. Returns current timestamp just like Date.now() but with network connection offset */
  getNowWithNetworkOffset() {
    return Date.now() // todo: replace with network timestamp
  }

  /** Advanced use. Returns swarms for specified Session ID */
  getSwarmsFor = getSwarmsFor.bind(this)
  /** Advanced use. Returns swarms that store messages for our Session ID */
  getOurSwarm = getOurSwarm.bind(this)
  /** Advanced use. Returns Session nodes list */
  getSnodes = getSnodes.bind(this)

  /** Add Poller class instance to this Session instance to start polling new messages */
  addPoller = addPoller.bind(this)

  /** Download attachment received in message object. Returns File with decrypted content */
  getFile = getFile.bind(this)

  /**
   * Sends a visible chat message to other Session ID
   * Might throw SessionFetchError if there is a connection issue
   * @param to — Session ID of the recipient
   * @param attachments Array of instances of File bytes to send with the message
   * @returns `Promise<{ messageHash: string, syncMessageHash: string }>` — hashes (identifiers) of the messages sent (visible and sync message)
   */
  public sendMessage = sendMessage.bind(this)

  /**
   * Propogates unsend request which Session clients use to delete messages locally. For performance reasons, choose deleteMessages for batch deletion of multiple messages
   * Might throw SessionFetchError if there is a connection issue
   * @param to Session ID of recipient of the message
   * @param timestamp Timestamp of the message, returned from sendMessage; this is important and **must be exactly what's returned from sendMessage result**, otherwise clients which already received the message won't be able to delete it
   * @param hash Saved messageHash identifier of the message to delete, returned from sendMessage
   */
  public deleteMessage = deleteMessage.bind(this)
  /**
   * Propogates unsend requests which Session clients use to delete messages locally. Alternatively, use deleteMessage for single message deletion
   * Might throw SessionFetchError if there is a connection issue
   * @param to Session ID of recipient of the message
   * @param timestamp Timestamp of the message, returned from sendMessage; this is important and **must be exactly what's returned from sendMessage result**, otherwise clients which already received the message won't be able to delete it
   * @param hashes Saved messages hashes identifiers of the message to delete, returned from sendMessage's messageHash
   */
  public deleteMessages = deleteMessages.bind(this)

  protected _storeMessage = _storeMessage.bind(this)

  async request<Response, Body = any>({ type, body }: {
    type: RequestType,
    body: Body
  }): Promise<Response> {
    return await this.network.onRequest(type, body) as Response
  }

  protected events: Map<EventName, EventCallback<EventName>[]> = new Map()
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
  protected emit<E extends EventName>(eventName: E, ...args: Parameters<EventCallback<E>>) {
    this.events.get(eventName)?.forEach(cb => {
      (cb as (...args: unknown[]) => void)(...args)
    })
  }
}