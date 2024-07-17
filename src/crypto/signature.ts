import type { SnodeSignatureResult } from '@session.js/types/snode-signature-result'
import { Uint8ArrayToBase64, Uint8ArrayToHex } from '@/utils'
import ByteBuffer from 'bytebuffer'
import sodium, { type KeyPair } from 'libsodium-wrappers-sumo'

export function getSnodeSignatureParams(params: {
  ed25519Key: KeyPair
  namespace: number | null | 'all'; // 'all' can be used to clear all namespaces (during account deletion)
  method: 'retrieve' | 'store' | 'delete_all'
}): SnodeSignatureResult {
  const namespace = params.namespace || 0

  const signatureTimestamp = Date.now() // TODO: replace with getNowWithNetworkOffset

  const withoutNamespace = `${params.method}${signatureTimestamp}`
  const withNamespace = `${params.method}${namespace}${signatureTimestamp}`
  const verificationData =
    namespace === 0
      ? ByteBuffer.wrap(withoutNamespace, 'utf8').toArrayBuffer()
      : ByteBuffer.wrap(withNamespace, 'utf8').toArrayBuffer()

  const message = new Uint8Array(verificationData)

  const signature = sodium.crypto_sign_detached(message, params.ed25519Key.privateKey)
  const signatureBase64 = Uint8ArrayToBase64(signature)

  return {
    // sig_timestamp: signatureTimestamp,
    timestamp: signatureTimestamp,
    signature: signatureBase64,
    pubkeyEd25519: Uint8ArrayToHex(params.ed25519Key.publicKey),
  }
}

export async function sign(key: any, data: any) {
  return crypto.subtle
    .importKey('raw', key, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, ['sign'])
    .then(async secondKey => {
      return crypto.subtle.sign({ name: 'HMAC', hash: 'SHA-256' }, secondKey, data)
    })
}