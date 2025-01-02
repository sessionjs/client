import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { MessageRequestResponse } from '@/messages/schema/conversation-request-message'
import { toRawMessage } from '@/messages/signal-message'
import { SnodeNamespaces } from '@session.js/types'

export async function acceptConversationRequest(this: Session, { from }: {
  from: string
}) {
  const messageRequestResponse = new MessageRequestResponse({
    timestamp: Date.now(),
    profile: this.getMyProfile()
  })
  const timestamp = this.getNowWithNetworkOffset()
  const rawMessage = toRawMessage(from, messageRequestResponse, SnodeNamespaces.UserMessages)
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