import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { ReadReceiptMessage } from '@/messages/schema/read-receipt-message'
import { toRawMessage } from '@/messages/signal-message'
import { SnodeNamespaces } from '@session.js/types'

export async function markMessagesAsRead(this: Session, { from, messagesTimestamps, readAt }: {
  from: string
  messagesTimestamps: Array<number>
  readAt?: number
}) {
  const readReceiptMessage = new ReadReceiptMessage({
    timestamp: readAt ?? Date.now(),
    timestamps: messagesTimestamps,
  })
  const timestamp = this.getNowWithNetworkOffset()
  const rawMessage = toRawMessage(from, readReceiptMessage, SnodeNamespaces.UserMessages)
  const [wrappedMessage] = await wrap(this.keypair!, [{
    destination: from,
    plainTextBuffer: rawMessage.plainTextBuffer,
    namespace: rawMessage.namespace,
    ttl: rawMessage.ttl,
    identifier: rawMessage.identifier,
    isSyncMessage: false,
    isGroup: false
  }], { networkTimestamp: timestamp })
  await this._storeMessage({ message: rawMessage, data: wrappedMessage })
}