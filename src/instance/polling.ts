import _ from 'lodash'
import type { Session } from '@/instance'
import { Poller } from '@/polling'
import { signalMessageToMessage, type Message } from '@/messages'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import { StorageKeys } from '@session.js/types/storage'
import type { Swarm } from '@session.js/types/swarm'

export function addPoller(this: Session, poller: Poller) {
  if (!(poller instanceof Poller)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidPoller, message: 'Poller must be an instance of Poller' })
  this.pollers.add(poller)
  poller._attachedToInstance(this, {
    onMessagesReceived: async (messages) => {
      const dataMessages = messages
        .filter(m => m.content.dataMessage)
        .filter(m => !m.content.dataMessage?.syncTarget)
      const newDataMessages: Message[] = []
      for (const m of dataMessages) {
        if (!await this.storage.has('message_hash:' + m.hash)) {
          await this.storage.set('message_hash:' + m.hash, Date.now().toString())
          const message = signalMessageToMessage(m)
          newDataMessages.push(message)
        }
      }
      this.events.get('message')?.forEach(cb => {
        newDataMessages.forEach(m => cb(m))
      })
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