import { PROFILE_IV_LENGTH, PROFILE_KEY_LENGTH, PROFILE_TAG_LENGTH } from '@/profile'
import { SessionCryptoError, SessionCryptoErrorCode } from '@session.js/errors'

export async function decryptProfile(data: ArrayBuffer, key: Uint8Array): Promise<ArrayBuffer> {
  if (data.byteLength < 12 + 16 + 1) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentDecryptionFailed, message: `Got too short input: ${data.byteLength}` })
  }
  const iv = data.slice(0, PROFILE_IV_LENGTH)
  const ciphertext = data.slice(PROFILE_IV_LENGTH, data.byteLength)
  if (key.byteLength !== PROFILE_KEY_LENGTH) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentDecryptionFailed, message: 'Got invalid length profile key' })
  }
  if (iv.byteLength !== PROFILE_IV_LENGTH) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentDecryptionFailed, message: 'Got invalid length profile iv' })
  }
  const error = new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Failed to decrypt profile data' })
  return await crypto.subtle
    .importKey('raw', key, { name: 'AES-GCM' }, false, ['decrypt'])
    .then(keyForEncryption =>
      crypto.subtle
        .decrypt(
          { name: 'AES-GCM', iv, tagLength: PROFILE_TAG_LENGTH },
          keyForEncryption,
          ciphertext
        )
        .catch(e => {
          if (e.name === 'OperationError') {
            // bad mac
          }
          throw error
        })
    )
}