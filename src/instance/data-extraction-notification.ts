import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { DataExtractionNotificationMessage } from '@/messages/schema/data-extraction-message'
import { toRawMessage } from '@/messages/signal-message'
import { SnodeNamespaces } from '@session.js/types'
import { SignalService } from '@session.js/types/signal-bindings'

export async function notifyScreenshotTaken(this: Session, { conversation }: {
  conversation: string
}) {
  await sendDataExtractionNotification.call(this, {
    conversation,
    action: SignalService.DataExtractionNotification.Type.SCREENSHOT,
    timestamp: Date.now()
  })
}

export async function notifyMediaSaved(this: Session, { conversation, savedMessageTimestamp }: {
  conversation: string
  savedMessageTimestamp: number
}) {
  await sendDataExtractionNotification.call(this, { 
    conversation,
    action: SignalService.DataExtractionNotification.Type.MEDIA_SAVED,
    timestamp: savedMessageTimestamp,
  })
}

async function sendDataExtractionNotification(this: Session, { conversation, action, timestamp }: {
  conversation: string
  action: SignalService.DataExtractionNotification.Type
  timestamp: number
}) {
  // TODO: if convo has expirationMode = 'legacy' or 'off', use 'unknown' with expirationTimer = 0
  // if it has expirationMode = 'deleteAfterSend', use 'deleteAfterRead' with expirationTimer from convo settings
  // otherwise just use expirationMode from convo
  const expirationType = 'unknown'
  const expireTimer = 0
  const dataExtractionNotificationMessage = new DataExtractionNotificationMessage({
    action,
    timestamp,
    expirationType,
    expireTimer,
  })
  const dataExtractionNotificationTimestamp = this.getNowWithNetworkOffset()
  const rawMessage = toRawMessage(conversation, dataExtractionNotificationMessage, SnodeNamespaces.UserMessages)
  const [wrappedMessage] = await wrap(this.keypair!, [{
    destination: conversation,
    plainTextBuffer: rawMessage.plainTextBuffer,
    namespace: rawMessage.namespace,
    ttl: rawMessage.ttl,
    identifier: rawMessage.identifier,
    isSyncMessage: false,
    isGroup: false
  }], { networkTimestamp: dataExtractionNotificationTimestamp })
  await this._storeMessage({ message: rawMessage, data: wrappedMessage })
}