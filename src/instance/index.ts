import { checkStorage, checkNetwork, getPlaceholderDisplayName } from '@/utils'
import type { Storage, Network } from '@session.js/types'

import {
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
import { getFile } from './get-file'
import { deleteMessage, deleteMessages } from './delete-message'
import { markMessagesAsRead } from './mark-message-as-read'
import { showTypingIndicator, hideTypingIndicator } from './typing-indicator'
import { notifyScreenshotTaken, notifyMediaSaved } from './data-extraction-notification'
import { acceptConversationRequest } from './accept-conversation-request'
import { setAvatar } from './set-avatar'
import { setDisplayName } from './display-name'
import { addReaction, removeReaction } from './reactions'

import { _storeMessage } from './store-message'
import type { EventCallback, EventName } from './events'
import { downloadAvatar, type Profile } from '@/profile'

export class Session {
  protected mnemonic: string | undefined
  protected keypair: Keypair | undefined
  protected sessionID: string | undefined
  protected displayName: string | undefined
  protected avatar: Profile['avatar']
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

  protected async _init() {
    const savedAvatar = await this.storage.get('avatar')
    if (savedAvatar !== null) {
      const { key, url } = JSON.parse(savedAvatar) as { key: number[], url: string }
      const profileKey = new Uint8Array(key)
      this.avatar = { key: profileKey, url }
    }
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
  /** 
   * Set display name of this instance by saving it locally and to network. 
   * All unicode characters are accepted except for `ￒ` (0xffd2) which is reserved by Session for mentions. Max length: 64 characters
   * Might throw SessionFetchError if there is a connection issue
   * */
  public setDisplayName = setDisplayName.bind(this)

  /** 
   * Get this instance's cached avatar.  Note that it doesn't fetch avatar from network, since avatar comes in a configuration message, so this method might return undefined
   * If you're looking for a way to get other user's avatar, please make yourself familiar with [How Session profiles work](https://sessionjs.github.io/docs/principles/users/#how-session-profiles-work) in the documentation
   * If you're looking for a method to download and decrypt avatar's image, please use downloadAvatar
   */
  public getAvatar() {
    return this.avatar
  }
  /** 
   * Set this instance's avatar by uploading it to file server and saving to network. It must be a valid image that can be displayed in most Session clients.
   * Might throw SessionFetchError if there is a connection issue
   */
  public setAvatar = setAvatar.bind(this)
  /**
   * Download avatar using URL and key from Profile object. Returns decrypted ArrayBuffer with image data.
   * Might throw SessionFetchError if there is a connection issue
   * Might throw SessionValidationError if avatar's URL is not from Session file server
   * @param avatar Avatar object from Profile's object with `url` and `key` properties
   */
  public downloadAvatar = downloadAvatar.bind(this)

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
  public addPoller = addPoller.bind(this)

  /** Download attachment received in message object. Returns File with decrypted content */
  public getFile = getFile.bind(this)

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

  /**
   * Mark message as read and broadcast it to recipient
   * Might throw SessionFetchError if there is a connection issue
   * @param from Session ID of sender of the message
   * @param messagesTimestamps Array of timestamps of the messages to mark as read, returned from message constructor
   * @param readAt Timestamp when recipient of the message read it, defaults to current time. Does not seem to be used in current Session implementations
   */
  public markMessagesAsRead = markMessagesAsRead.bind(this)

  /**
   * Show message typing indicator to recipient for 20 seconds or until hideTypingIndicator is called
   * Might throw SessionFetchError if there is a connection issue
   * @param conversation Session ID of conversation where typing indicator should appear
   */
  public showTypingIndicator = showTypingIndicator.bind(this)
  /**
   * Hide message typing indicator from recipient
   * Might throw SessionFetchError if there is a connection issue
   * @param conversation Session ID of conversation where typing indicator should disappear
   */
  public hideTypingIndicator = hideTypingIndicator.bind(this)

  /**
   * Show notification that screenshot was taken in chat and broadcast it to other clients
   * Might throw SessionFetchError if there is a connection issue
   * @param conversation Session ID of conversation where screenshot was taken
   */
  public notifyScreenshotTaken = notifyScreenshotTaken.bind(this)

  /**
   * Show notification that attachment was downloaded in chat and broadcast it to other clients
   * Might throw SessionFetchError if there is a connection issue
   * @param conversation Session ID of conversation where attachment was downloaded
   * @param savedMessageTimestamp Timestamp of the message with attachment, returned from sendMessage
   */
  public notifyMediaSaved = notifyMediaSaved.bind(this)

  /**
   * Accept conversation request from another Session ID
   * Might throw SessionFetchError if there is a connection issue
   * @param from Session ID of the sender of the conversation request
   */
  public acceptConversationRequest = acceptConversationRequest.bind(this)

  /**
   * Add emoji reaction to the message
   * Might throw SessionFetchError if there is a connection issue
   * @param messageTimestamp Timestamp of the message to react to, obtained from message object
   * @param messageAuthor Session ID of the author of the message to react to
   * @param emoji Emoji as string to add to reactions list. Any unicode character(s) are accepted, length is practically unlimited, but most clients will only display reaction if it's a single valid emoji.
   */
  public addReaction = addReaction.bind(this)
  /**
   * Remove emoji reaction from the message
   * Might throw SessionFetchError if there is a connection issue
   * @param messageTimestamp Timestamp of the message to remove react from, obtained from message object
   * @param messageAuthor Session ID of the author of the message to remove reaction from
   * @param emoji Emoji as string to add to reactions list. Any unicode character(s) are accepted, length is practically unlimited, but most clients will only display reaction if it's a single valid emoji
   */
  public removeReaction = removeReaction.bind(this)

  protected _storeMessage = _storeMessage.bind(this)

  async _request<Response, Body = any>({ type, body }: {
    type: RequestType,
    body: Body
  }): Promise<Response> {
    return await this.network.onRequest(type, body) as Response
  }

  protected _getProfile() {
    return {
      displayName: this.displayName ?? getPlaceholderDisplayName(this.getSessionID()),
      avatar: this.getAvatar(),
    }
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
  protected _emit<E extends EventName>(eventName: E, ...args: Parameters<EventCallback<E>>) {
    this.events.get(eventName)?.forEach(cb => {
      (cb as (...args: unknown[]) => void)(...args)
    })
  }
}