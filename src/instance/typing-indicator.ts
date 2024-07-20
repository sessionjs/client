import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { TypingMessage } from '@/messages/schema/typing-indicator-message'
import { toRawMessage } from '@/messages/signal-message'
import { SnodeNamespaces } from '@session.js/types'

export async function showTypingIndicator(this: Session, { conversation }: {
  conversation: string
}) {
  await updateTypingIndicator.call(this, { isTyping: true, conversation })
}

export async function hideTypingIndicator(this: Session, { conversation }: {
  conversation: string
}) {
  await updateTypingIndicator.call(this, { isTyping: false, conversation })
}

async function updateTypingIndicator(this: Session, { isTyping, conversation }: {
  conversation: string
  isTyping: boolean
}) {
  const timestamp = this.getNowWithNetworkOffset()
  const typingMessage = new TypingMessage({
    isTyping,
    timestamp: timestamp,
    typingTimestamp: timestamp
  })
  const rawMessage = toRawMessage(conversation, typingMessage, SnodeNamespaces.UserMessages)
  const [wrappedMessage] = await wrap(this.keypair!, [{
    destination: conversation,
    plainTextBuffer: rawMessage.plainTextBuffer,
    namespace: rawMessage.namespace,
    ttl: rawMessage.ttl,
    identifier: rawMessage.identifier,
    isSyncMessage: false,
    isGroup: false
  }], { networkTimestamp: timestamp })
  await this._storeMessage({ message: rawMessage, data: wrappedMessage })
}