import { PROFILE_IV_LENGTH, PROFILE_KEY_LENGTH, PROFILE_TAG_LENGTH } from '@/profile'
import { SessionCryptoError, SessionCryptoErrorCode } from '@session.js/errors'
import sodium from 'libsodium-wrappers-sumo'

export async function encryptProfile(data: ArrayBuffer, key: Uint8Array): Promise<ArrayBuffer> {
  const iv = await sodium.randombytes_buf(PROFILE_IV_LENGTH)
  if (key.byteLength !== PROFILE_KEY_LENGTH) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentEncryptionFailed, message: 'Got invalid length profile key' })
  }
  if (iv.byteLength !== PROFILE_IV_LENGTH) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentEncryptionFailed, message: 'Got invalid length profile iv' })
  }
  return crypto.subtle
    .importKey('raw', key, { name: 'AES-GCM' }, false, ['encrypt'])
    .then(keyForEncryption =>
      crypto.subtle
        .encrypt({ name: 'AES-GCM', iv, tagLength: PROFILE_TAG_LENGTH }, keyForEncryption, data)
        .then(ciphertext => {
          const ivAndCiphertext = new Uint8Array(PROFILE_IV_LENGTH + ciphertext.byteLength)
          ivAndCiphertext.set(new Uint8Array(iv))
          ivAndCiphertext.set(new Uint8Array(ciphertext), PROFILE_IV_LENGTH)
          return ivAndCiphertext.buffer as ArrayBuffer
        })
    )
}
