import _ from 'lodash'
import type { Session } from '@/instance'
import { Poller } from '@/polling'
import { StorageKeys } from '@session.js/types/storage'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import type { Swarm } from '@session.js/types/swarm'
import { SignalService } from '@session.js/types/signal-bindings'
import {
  mapDataMessage,
  mapUnsendMessage,
  mapReceiptMessage,
  mapTypingMessage,
  mapScreenshotTakenMessage,
  mapMediaSavedMessage,
  mapMessageRequestResponseMessage
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

      newMessages
        .filter(m => m.content.typingMessage)
        .map(m => mapTypingMessage(m))
        .forEach(m => this._emit('messageTypingIndicator', m))

      newMessages
        .filter(m => m.content.dataExtractionNotification &&
          m.content.dataExtractionNotification.type ===
          SignalService.DataExtractionNotification.Type.SCREENSHOT
        )
        .map(m => mapScreenshotTakenMessage(m))
        .forEach(m => this._emit('screenshotTaken', m))

      newMessages
        .filter(m => m.content.dataExtractionNotification && 
          m.content.dataExtractionNotification.type === 
          SignalService.DataExtractionNotification.Type.MEDIA_SAVED
        )
        .map(m => mapMediaSavedMessage(m))
        .forEach(m => this._emit('mediaSaved', m))

      newMessages
        .filter(m => m.content.messageRequestResponse)
        .map(m => mapMessageRequestResponseMessage(m))
        .forEach(m => this._emit('messageRequestApproved', m))

      const configMessage = newMessages
        .filter(m => m.content.configurationMessage)
        .sort((a, b) => {
          let aTimestamp = a.envelope.timestamp
          let bTimestamp = b.envelope.timestamp
          if(typeof aTimestamp !== 'number') {
            aTimestamp = aTimestamp.toNumber()
          }
          if(typeof bTimestamp !== 'number') {
            bTimestamp = bTimestamp.toNumber()
          }
          return bTimestamp - aTimestamp
        }).at(-1)

      if (configMessage) {
        const syncedDisplayName = configMessage.content.configurationMessage?.displayName
        console.log({ syncedDisplayName, current: this.displayName })
        if (syncedDisplayName) {
          if(this.displayName !== syncedDisplayName) {
            this._emit('syncDisplayName', syncedDisplayName)
          }
          this.displayName = syncedDisplayName
          this.storage.set(StorageKeys.DisplayName, syncedDisplayName)
        }
        const syncedProfileKey = configMessage.content.configurationMessage?.profileKey
        const syncedProfilePicture = configMessage.content.configurationMessage?.profilePicture
        if (syncedProfileKey && syncedProfileKey.length && syncedProfilePicture) {
          const avatar = {
            key: syncedProfileKey,
            url: syncedProfilePicture
          }
          if (!_.isEqual(this.avatar, avatar)) {
            this._emit('syncAvatar', avatar)
          }
          this.avatar = avatar
          this.storage.set(StorageKeys.Avatar, JSON.stringify(avatar))
        } else {
          this.avatar = undefined
          this.storage.delete(StorageKeys.Avatar)
        }
      }
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