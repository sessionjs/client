import { v4 as uuid } from 'uuid'
import type { Session } from '@/instance'
import { encryptFileAttachment } from '@/attachments/encrypt'
import { wrap } from '@/crypto/message-encrypt'
import {
  SessionRuntimeError, SessionRuntimeErrorCode, 
  SessionValidationError, SessionValidationErrorCode 
} from '@session.js/errors'
import {
  VisibleMessage,
  type AttachmentPointerWithUrl
} from '@/messages/schema/visible-message'
import { isHex } from '@/utils'
import type { ResponseUploadAttachment } from '@session.js/types/network/response'
import { RequestType, type RequestUploadAttachment } from '@session.js/types/network/request'
import { SnodeNamespaces } from '@session.js/types'
import { toRawMessage } from '@/messages/signal-message'
import { MAX_ATTACHMENT_FILESIZE_BYTES } from '@session.js/consts'

export async function sendMessage(this: Session, { to, text, attachments }: {
  to: string,
  text?: string,
  attachments?: File[]
}): Promise<{ messageHash: string, syncMessageHash: string, timestamp: number }> {
  if (!this.sessionID || !this.keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
  if (to.length !== 66) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Invalid session ID length' })
  if (!to.startsWith('05') || !isHex(to)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidSessionID, message: 'Session ID must be a hex string starting from 05' })
  if (attachments?.some(a => !(a instanceof File))) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidAttachment, message: 'Attachments must be instances of File' })
  if (attachments?.some(a => a.size > MAX_ATTACHMENT_FILESIZE_BYTES)) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidAttachment, message: 'Attachment size exceeds the limit: ' + MAX_ATTACHMENT_FILESIZE_BYTES + ' bytes' })

  const attachmentsPointers: AttachmentPointerWithUrl[] = []
  if (attachments) {
    for (const attachment of attachments ?? []) {
      const encrypted = await encryptFileAttachment(attachment)
      const uploaded = await this._request<ResponseUploadAttachment, RequestUploadAttachment>({ type: RequestType.UploadAttachment, body: { data: encrypted.ciphertext } })
      attachmentsPointers.push({
        contentType: attachment.type,
        id: uploaded.id,
        url: uploaded.url,
        size: attachment.size,
        key: encrypted.key,
        digest: new Uint8Array(encrypted.digest),
        fileName: attachment.name
      })
    }
  }

  const timestamp = this.getNowWithNetworkOffset()
  const msg = new VisibleMessage({
    body: text,
    profile: this._getProfile(),
    timestamp: timestamp,
    expirationType: 'unknown',
    expireTimer: 0,
    identifier: uuid(),
    attachments: attachmentsPointers,
    preview: [],
    quote: undefined
  })
  const syncMessage = new VisibleMessage({
    body: text,
    profile: undefined,
    timestamp: timestamp,
    expirationType: 'unknown',
    expireTimer: 0,
    identifier: uuid(),
    attachments: [],
    preview: [],
    reaction: undefined,
    syncTarget: to,
    quote: undefined
  })

  const rawMessage = toRawMessage(to, msg, SnodeNamespaces.UserMessages)
  const rawSyncMessage = toRawMessage(to, syncMessage, SnodeNamespaces.UserMessages)

  const [messageEncrypted, syncMessageEncrypted] = await wrap(this.keypair, [
    {
      destination: to,
      plainTextBuffer: rawMessage.plainTextBuffer,
      namespace: rawMessage.namespace,
      ttl: rawMessage.ttl,
      identifier: rawMessage.identifier,
      isSyncMessage: false,
      isGroup: false
    }, {
      destination: this.sessionID,
      plainTextBuffer: rawSyncMessage.plainTextBuffer,
      namespace: rawSyncMessage.namespace,
      ttl: rawMessage.ttl,
      identifier: rawSyncMessage.identifier,
      isSyncMessage: true,
      isGroup: false
    }
  ], { networkTimestamp: timestamp })

  const messageHash = await this._storeMessage({ message: rawMessage, data: messageEncrypted })
  const syncMessageHash = await this._storeMessage({ message: rawSyncMessage, data: syncMessageEncrypted })

  return { messageHash, syncMessageHash, timestamp }
}