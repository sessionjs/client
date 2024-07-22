import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { VisibleMessage, type VisibleMessageParams } from '@/messages/schema/visible-message'
import { toRawMessage } from '@/messages/signal-message'
import { ReactionAction } from '@/reactions'
import { SnodeNamespaces } from '@session.js/types'

export async function addReaction(this: Session, { messageTimestamp, messageAuthor, emoji }: {
  messageTimestamp: number,
  emoji: string,
  messageAuthor: string
}): Promise<void> {
  await sendReactionMessage.call(this, {
    messageTimestamp,
    emoji,
    action: ReactionAction.REACT,
    messageAuthor
  })
}

export async function removeReaction(this: Session, { messageTimestamp, messageAuthor, emoji }: {
  messageTimestamp: number,
  emoji: string,
  messageAuthor: string
}): Promise<void> {
  await sendReactionMessage.call(this, {
    messageTimestamp,
    emoji,
    action: ReactionAction.REMOVE,
    messageAuthor
  })
}

async function sendReactionMessage(this: Session, { messageTimestamp, action, messageAuthor, emoji }: {
  messageTimestamp: number,
  emoji: string,
  messageAuthor: string
  action: ReactionAction
}): Promise<void> {
  const reactionMessageParams: VisibleMessageParams = {
    body: '',
    timestamp: this.getNowWithNetworkOffset(),
    reaction: {
      id: messageTimestamp,
      action,
      author: messageAuthor,
      emoji,
    },
    profile: this._getProfile(),
    expirationType: null,
    expireTimer: null,
  }
  const reactionMessage = new VisibleMessage(reactionMessageParams)
  const rawMessage = toRawMessage(messageAuthor, reactionMessage, SnodeNamespaces.UserMessages)
  const syncReactionMessage = new VisibleMessage({
    ...reactionMessageParams,
    syncTarget: messageAuthor
  })
  const syncRawMessage = toRawMessage(this.getSessionID(), syncReactionMessage, SnodeNamespaces.UserMessages)
  const [wrappedMessage, syncWrappedMessage] = await wrap(this.keypair!, [{
    destination: messageAuthor,
    plainTextBuffer: rawMessage.plainTextBuffer,
    namespace: rawMessage.namespace,
    ttl: rawMessage.ttl,
    identifier: rawMessage.identifier,
    isSyncMessage: false,
    isGroup: false
  }, {
    destination: this.getSessionID(),
    plainTextBuffer: syncRawMessage.plainTextBuffer,
    namespace: syncRawMessage.namespace,
    ttl: syncRawMessage.ttl,
    identifier: syncRawMessage.identifier,
    isSyncMessage: true,
    isGroup: false
  }], { networkTimestamp: this.getNowWithNetworkOffset() })
  await this._storeMessage({ message: rawMessage, data: wrappedMessage })
  await this._storeMessage({ message: syncRawMessage, data: syncWrappedMessage })

}