import { wrap } from '@/crypto/message-encrypt'
import type { Session } from '@/instance'
import { ConfigurationMessage } from '@/messages/schema/configuration-message'
import { toRawMessage } from '@/messages/signal-message'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import { SnodeNamespaces } from '@session.js/types/namespaces'
import { StorageKeys } from '@session.js/types/storage'

export const forbiddenDisplayCharRegex = /\uFFD2*/g

export async function setDisplayName(this: Session, displayName: string) {
  const keypair = this.keypair
  if (!keypair) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.Generic, message: 'No keypair found' })
  }
  if (displayName.length > 64 || displayName.length === 0) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidDisplayName, message: 'Display name must be between 1 and 64 characters' })
  } else {
    this.displayName = displayName.replace(forbiddenDisplayCharRegex, '')
    await this.storage.set(StorageKeys.DisplayName, this.displayName)
    const configMessage = new ConfigurationMessage({
      displayName: this.displayName,
      profilePicture: this.avatar?.url,
      profileKey: this.avatar?.key,
      activeClosedGroups: [],
      activeOpenGroups: [],
      contacts: [],
      timestamp: this.getNowWithNetworkOffset()
    })
    const rawMessage = toRawMessage(this.getSessionID(), configMessage, SnodeNamespaces.UserMessages)
    const [wrappedMessage] = await wrap(keypair, [{
      destination: this.getSessionID(),
      plainTextBuffer: rawMessage.plainTextBuffer,
      namespace: rawMessage.namespace,
      ttl: rawMessage.ttl,
      identifier: rawMessage.identifier,
      isSyncMessage: true,
      isGroup: false
    }], { networkTimestamp: configMessage.timestamp })
    await this._storeMessage({ message: rawMessage, data: wrappedMessage })
  }
}