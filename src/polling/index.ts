import { getSnodeSignatureParams } from '@/crypto/signature'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '@/errors/runtime'
import { Session } from '@/instance'
import { RequestType, type RequestPollBody } from '@/network/request'
import type { ResponsePoll } from '@/network/response'
import { SnodeNamespaces } from '@/types/namespaces'
import type { RequestNamespace } from '@/types/snode-retrieve'
import { z } from 'zod'

// SnodeNamespaces.ClosedGroupMessage is legacy
const allNamespaces = new Set([SnodeNamespaces.UserMessages, SnodeNamespaces.ConvoInfoVolatile, SnodeNamespaces.UserContacts, SnodeNamespaces.UserGroups, SnodeNamespaces.UserProfile])

export class Poller {
  private interval: number | null
  private polling: boolean = false
  private instance: Session | undefined
  private intervalId: Timer | undefined
  private namespaces: Set<SnodeNamespaces>

  /**
   * New poller of messages for Session instance. Starts polling as soon as attached to instance of interval is not null, call stopPolling to stop automatic polling and startPolling to resume.
   * @param interval — Polling interval in milliseconds, must either be integer > 0. Set to null to disable automatic polling
   */
  constructor(options?: {
    interval?: number | null
    namespaces?: Set<SnodeNamespaces>
  }) {
    const { interval } = z.object({
      interval: z.number().int().positive().default(10000).or(z.literal(null))
    }).parse(options)
    this.interval = interval
    this.namespaces = options?.namespaces ?? allNamespaces
  }

  /** @private */
  _attachedToInstance(instance: Session) {
    if (this.instance) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.MultipleInstancesNotAllowed, message: 'Poller can\'t be attached to multiple instances' })
    this.instance = instance
    if(this.interval !== null) {
      if (instance.isAuthorized) {
        this.startPolling()
      }
    }
  }

  /** Manually resumes auto-polling. Does nothing if `interval` of Poller is null */
  startPolling() {
    if(!this.instance) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoInstancePolling, message: 'Polling can\'t be started without attaching Session instance' })
    if(!this.instance.isAuthorized) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Polling can\'t be started without user' })
    if (this.polling === false) {
      this.polling = true
      this.intervalId = setInterval(() => this.poll())
    }
  }

  /** Stops auto-polling. Does nothing if `interval` of Poller is null */
  stopPolling() {
    if(this.polling === true) {
      this.polling = false
      clearInterval(this.intervalId)
      this.intervalId = undefined
    }
  }

  /** Return if this Poller is set to poll automatically */
  isPolling() {
    return this.polling
  }

  /** Trigger manual messages polling */
  async poll() {
    if (!this.instance) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoInstancePolling, message: 'Polling can\'t be started without attaching Session instance' })
    const keypair = await this.instance.getKeypair()
    if(!keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.Generic, message: 'Polling can\'t be started without keypair' })

    const sessionID = this.instance.getSessionID()
    const ourSwarm = await this.instance.getOurSwarm()
    
    const { messages } = await this.instance.request<ResponsePoll, RequestPollBody>({
      type: RequestType.Poll,
      body: {
        swarm: ourSwarm,
        namespaces: Array.from(this.namespaces.values()).map<RequestNamespace>(namespace => ({
          namespace,
          pubkey: sessionID,
          isOurPubkey: true,
          signature: getSnodeSignatureParams({
            ed25519Key: keypair.ed25519,
            method: 'retrieve',
            namespace: namespace
          }),
          lastHash: undefined
        })),
      }
    })

    return messages
  }
}