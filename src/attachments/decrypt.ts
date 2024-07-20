import { sign } from '@/crypto/signature'
import { SessionCryptoError, SessionCryptoErrorCode, SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'

export async function decryptAttachment(data: ArrayBuffer, { size, keyBuffer, digestBuffer }: {
  size?: number,
  keyBuffer: Uint8Array,
  digestBuffer: Uint8Array
}) {
  if (keyBuffer.byteLength !== 64) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentDecryptionFailed, message: 'Got invalid length attachment keys' })
  }
  if (data.byteLength < 16 + 32) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.AttachmentDecryptionFailed, message: 'Got invalid length attachment' })
  }

  const aesKey = keyBuffer.slice(0, 32)
  const macKey = keyBuffer.slice(32, 64)

  const iv = data.slice(0, 16)
  const ciphertext = data.slice(16, data.byteLength - 32)
  const ivAndCiphertext = data.slice(0, data.byteLength - 32)
  const mac = data.slice(data.byteLength - 32, data.byteLength)

  await verifyMAC(ivAndCiphertext, macKey, mac, 32)
  await verifyDigest(data, digestBuffer)
  let decryptedData = await decrypt(aesKey, ciphertext, iv)

  if (size !== undefined && size !== data.byteLength) {
    if (size < data.byteLength) {
      decryptedData = decryptedData.slice(0, size)
    } else {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidAttachment, message: 'Decrypted attachment size does not match expected size' })
    }
  }

  return decryptedData
}

async function verifyMAC(data: any, key: any, mac: any, length: any) {
  return sign(key, data).then(calculatedMac => {
    if (mac.byteLength !== length || calculatedMac.byteLength < length) {
      throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Bad attachment MAC' })
    }
    const a = new Uint8Array(calculatedMac)
    const b = new Uint8Array(mac)
    let result = 0
    for (let i = 0; i < mac.byteLength; ++i) {
       
      result |= a[i] ^ b[i]
    }
    if (result !== 0) {
      throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Bad attachment MAC' })
    }
  })
}

async function verifyDigest(data: ArrayBuffer, theirDigest: Uint8Array) {
  return crypto.subtle.digest({ name: 'SHA-256' }, data).then(ourDigest => {
    const a = new Uint8Array(ourDigest)
    const b = theirDigest
    let result = 0
    for (let i = 0; i < theirDigest.byteLength; i += 1) {
       
      result |= a[i] ^ b[i]
    }
    if (result !== 0) {
      throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Bad attachment digest' })
    }
  })
}

async function decrypt(key: any, data: any, iv: any) {
  return crypto.subtle
    .importKey('raw', key, { name: 'AES-CBC' }, false, ['decrypt'])
    .then(async secondKey => {
      return crypto.subtle.decrypt({ name: 'AES-CBC', iv: new Uint8Array(iv) }, secondKey, data)
    })
}