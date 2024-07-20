import _ from 'lodash'
import type { Session } from '@/instance'
import { Poller } from '@/polling'
import { StorageKeys } from '@session.js/types/storage'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import type { Swarm } from '@session.js/types/swarm'
import {
  mapDataMessage,
  mapUnsendMessage,
  mapReceiptMessage
} from '@/messages'

export function addPoller(this: Session, poller: Poller) {
  if (!(poller instanceof Poller)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidPoller, message: 'Poller must be an instance of Poller' })
  this.pollers.add(poller)
  poller._attachedToInstance(this, {
    onMessagesReceived: async (messages) => {
      const newMessages: typeof messages = []
      for (const m of messages) {
        if (!await this.storage.has('message_hash:' + m.hash)) {
          await this.storage.set('message_hash:' + m.hash, Date.now().toString())
          newMessages.push(m)
        }
      }

      newMessages
        .filter(m => m.content.dataMessage)
        .filter(m => !m.content.dataMessage?.syncTarget)
        .map(m => mapDataMessage(m))
        .forEach(m => this._emit('message', m))

      newMessages
        .filter(m => m.content.dataMessage)
        .filter(m => m.content.dataMessage?.syncTarget)
        .map(m => mapDataMessage(m))
        .forEach(m => this._emit('syncMessage', m))

      newMessages
        .filter(m => m.content.unsendMessage)
        .map(m => mapUnsendMessage(m))
        .forEach(m => this._emit('messageDeleted', m))

      newMessages
        .filter(m => m.content.receiptMessage)
        .map(m => mapReceiptMessage(m))
        .flat()
        .forEach(m => this._emit('messageRead', m))
    },
    updateLastHashes: async (hashes) => {
      const lastHashes = await this.storage.get(StorageKeys.LastHashes)
      let newLastHashes = hashes
      if (lastHashes !== null) {
        newLastHashes = JSON.parse(lastHashes) as typeof hashes
      }
      hashes.forEach(h => {
        const existing = newLastHashes.find(lh => lh.namespace === h.namespace)
        if (existing) {
          existing.lastHash = h.lastHash
        } else {
          newLastHashes.push(h)
        }
      })
      this.storage.set(StorageKeys.LastHashes, JSON.stringify(newLastHashes))
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