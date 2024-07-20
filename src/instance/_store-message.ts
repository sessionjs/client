import _ from 'lodash'
import pRetry from 'p-retry'
import type { Session } from '@/instance'
import type { RawMessage } from '@/messages/signal-message'
import type { EncryptAndWrapMessageResults } from '@/crypto/message-encrypt'
import type { ResponseStore } from '@session.js/types/network/response'
import { SessionFetchError, SessionFetchErrorCode } from '@session.js/errors'
import { RequestType, type RequestStoreBody } from '@session.js/types/network/request'

export async function _storeMessage(this: Session, { message, data }: { message: RawMessage, data: EncryptAndWrapMessageResults }) {
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
      const { hash } = await this._request<ResponseStore, RequestStoreBody>({
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
    shouldRetry: (e: Error) => e instanceof SessionFetchError && e.code === SessionFetchErrorCode.RetryWithOtherNode421Error
  })
}