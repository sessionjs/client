import { MAX_ATTACHMENT_FILESIZE_BYTES } from '@session.js/consts'
import sodium from 'libsodium-wrappers-sumo'

export async function encryptFileAttachment(file: File) {
  return await encryptAttachment(await file.arrayBuffer(), true)
}

export async function encryptLinkPreview() {
  // TODO: encryptAttachment with addPadding = false
}

export async function encryptQuote() {
  // TODO: encryptAttachment with addPadding = false
}

const PADDING_BYTE = 0x00
async function encryptAttachment(data: ArrayBuffer, addPadding = false) {
  const pointerKey = sodium.randombytes_buf(64)
  const iv = sodium.randombytes_buf(16)
  const padded = addPadding ? addAttachmentPadding(data) : data
  const encrypted = await encryptAttachmentData(padded, pointerKey.buffer as ArrayBuffer, iv.buffer as ArrayBuffer)
  return { ...encrypted, key: pointerKey }
}

function addAttachmentPadding(data: ArrayBufferLike): ArrayBuffer {
  const originalUInt = new Uint8Array(data)

  let paddedSize = Math.max(
    541,
    Math.floor(Math.pow(1.05, Math.ceil(Math.log(originalUInt.length) / Math.log(1.05))))
  )

  if (
    paddedSize > MAX_ATTACHMENT_FILESIZE_BYTES &&
    originalUInt.length <= MAX_ATTACHMENT_FILESIZE_BYTES
  ) {
    paddedSize = MAX_ATTACHMENT_FILESIZE_BYTES
  }
  const paddedData = new ArrayBuffer(paddedSize)
  const paddedUInt = new Uint8Array(paddedData)

  paddedUInt.fill(PADDING_BYTE, originalUInt.length)
  paddedUInt.set(originalUInt)

  return paddedUInt.buffer as ArrayBuffer
}

export async function encryptAttachmentData(
  plaintext: ArrayBuffer,
  keys: ArrayBuffer,
  iv: ArrayBuffer
) {
  if (!(plaintext instanceof ArrayBuffer) && !ArrayBuffer.isView(plaintext)) {
    throw new TypeError(
      `\`plaintext\` must be an \`ArrayBuffer\` or \`ArrayBufferView\`; got: ${typeof plaintext}`
    )
  }

  if (keys.byteLength !== 64) {
    throw new Error('Got invalid length attachment keys')
  }
  if (iv.byteLength !== 16) {
    throw new Error('Got invalid length attachment iv')
  }
  const aesKey = keys.slice(0, 32)
  const macKey = keys.slice(32, 64)

  return encrypt(aesKey, plaintext, iv).then(async (ciphertext: any) => {
    const ivAndCiphertext = new Uint8Array(16 + ciphertext.byteLength)
    ivAndCiphertext.set(new Uint8Array(iv))
    ivAndCiphertext.set(new Uint8Array(ciphertext), 16)

    return calculateMAC(macKey, ivAndCiphertext.buffer).then(async (mac: any) => {
      const encryptedBin = new Uint8Array(16 + ciphertext.byteLength + 32)
      encryptedBin.set(ivAndCiphertext)
      encryptedBin.set(new Uint8Array(mac), 16 + ciphertext.byteLength)
      return calculateDigest(encryptedBin.buffer as ArrayBuffer).then(digest => ({
        ciphertext: encryptedBin.buffer as ArrayBuffer,
        digest,
      }))
    })
  })
}

async function encrypt(key: any, data: any, iv: any) {
  return crypto.subtle
    .importKey('raw', key, { name: 'AES-CBC' }, false, ['encrypt'])
    .then(async secondKey => {
      return crypto.subtle.encrypt({ name: 'AES-CBC', iv: new Uint8Array(iv) }, secondKey, data)
    })
}

async function calculateMAC(key: any, data: any) {
  return sign(key, data)
}

async function sign(key: any, data: any) {
  return crypto.subtle
    .importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign'])
    .then(async secondKey => {
      return crypto.subtle.sign({ name: 'HMAC', hash: 'SHA-256' }, secondKey, data)
    })
}

async function calculateDigest(data: ArrayBuffer) {
  return crypto.subtle.digest({ name: 'SHA-256' }, data)
}