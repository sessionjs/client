import _ from 'lodash'
import pRetry from 'p-retry'
import type { Session } from '@/instance'
import {
  SessionFetchError, SessionFetchErrorCode,
  SessionRuntimeError, SessionRuntimeErrorCode
} from '@session.js/errors'
import type { ResponseGetSwarms } from '@session.js/types/network/response'
import {
  RequestType,
  type RequestGetSwarmsBody
} from '@session.js/types/network/request'

export async function getSwarmsFor(this: Session, sessionID: string) {
  const snodes = await this.getSnodes()
  return await pRetry(async () => {
    const snode = _.sample(snodes)
    if (!snode) throw new SessionFetchError({ code: SessionFetchErrorCode.NoSnodesAvailable, message: 'No snodes available' })
    try {
      const { swarms } = await this._request<ResponseGetSwarms, RequestGetSwarmsBody>({ type: RequestType.GetSwarms, body: { snode, pubkey: sessionID } })
      if (swarms.length === 0) {
        throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoSwarmsAvailable, message: 'No swarms found for ' + sessionID })
      }
      return swarms
    } catch (e) {
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

export async function getOurSwarm(this: Session) {
  if (!this.sessionID) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
  if (this.ourSwarm) {
    return this.ourSwarm
  }
  this.ourSwarms = await this.getSwarmsFor(this.sessionID)
  this.ourSwarm = _.sample(this.ourSwarms)
  if (!this.ourSwarm) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.NoSwarmsAvailable, message: 'No swarms found for this instance' })
  return this.ourSwarm
}