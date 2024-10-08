import type { Session } from '@/instance'
import sodium, { to_hex } from 'libsodium-wrappers-sumo'
import { v4 as uuid } from 'uuid'
import { hexToUint8Array, Uint8ArrayToBase64 } from '@/utils'
import { VisibleMessage, type AttachmentPointerWithUrl } from '@/messages/schema/visible-message'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '@session.js/errors'
import type { Keypair } from '@session.js/keypair'
import { sign } from 'curve25519-js'
import type { KeyPair } from 'libsodium-wrappers-sumo'

export function blindSessionId(this: Session, serverPk: string): string {
  if (!this.sessionID || !this.keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
  const blindedKeyPair = getBlindingValues(
    hexToUint8Array(serverPk),
    this.keypair.ed25519
  )
  const blindedSessionId = '15' + to_hex(blindedKeyPair.publicKey)
  return blindedSessionId
}

export function encodeSogsMessage(this: Session, { serverPk, text, attachments }: {
  serverPk: string
  text?: string
  attachments?: AttachmentPointerWithUrl[]
}): { data: string, signature: string } {
  if (!this.sessionID || !this.keypair) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })

  const timestamp = this.getNowWithNetworkOffset()
  const msg = new VisibleMessage({
    body: text,
    profile: this._getProfile(),
    timestamp: timestamp,
    expirationType: null,
    expireTimer: null,
    identifier: uuid(),
    attachments: attachments,
    preview: [],
    quote: undefined
  })

  const paddedBody = addMessagePadding(msg.plainTextBuffer())
  const data = Uint8ArrayToBase64(paddedBody)

  const blindedKeyPair = getBlindingValues(
    hexToUint8Array(serverPk),
    this.keypair.ed25519
  )

  const signature = getSignatureWithBlinding({
    data: paddedBody,
    keypair: this.keypair,
    blindedKeyPair
  })
  
  return { data, signature }
}

export function addMessagePadding(messageBuffer: Uint8Array): Uint8Array {
  const plaintext = new Uint8Array(getPaddedMessageLength(messageBuffer.byteLength + 1) - 1)
  plaintext.set(new Uint8Array(messageBuffer))
  plaintext[messageBuffer.byteLength] = 0x80

  return plaintext
}

function getPaddedMessageLength(originalLength: number): number {
  const messageLengthWithTerminator = originalLength + 1
  let messagePartCount = Math.floor(messageLengthWithTerminator / 160)

  if (messageLengthWithTerminator % 160 !== 0) {
    messagePartCount += 1
  }

  return messagePartCount * 160
}

export async function getSignature(data: Uint8Array, keypair: Keypair): Promise<string> {
  const signature = sign(keypair.x25519.privateKey, data, null)
  if (!signature || signature.length === 0) {
    throw new Error('Couldn\'t sign message')
  }
  const base64Sig = Uint8ArrayToBase64(signature)
  return base64Sig
}

function getSignatureWithBlinding({ data, keypair, blindedKeyPair }: {
  data: Uint8Array, 
  blindedKeyPair: {
    a: Uint8Array
    secretKey: Uint8Array
    publicKey: Uint8Array
  },
  keypair: Keypair
}): string {
  const signature = getSogsSignature({
    blinded: true,
    ka: blindedKeyPair.secretKey,
    kA: blindedKeyPair.publicKey,
    toSign: data,
    signingKeys: keypair.ed25519,
  })
  if (!signature || signature.length === 0) {
    throw new Error('Couldn\'t sign message')
  }

  const base64Sig = Uint8ArrayToBase64(signature)
  return base64Sig
}

export function getBlindingValues(
  serverPK: Uint8Array,
  signingKeys: KeyPair,
): {
  a: Uint8Array;
  secretKey: Uint8Array
  publicKey: Uint8Array
} {
  const k = sodium.crypto_core_ed25519_scalar_reduce(sodium.crypto_generichash(64, serverPK))

  let a = sodium.crypto_sign_ed25519_sk_to_curve25519(signingKeys.privateKey)

  if (a.length > 32) {
    a = a.slice(0, 32)
  }

  const ka = sodium.crypto_core_ed25519_scalar_mul(k, a)
  const kA = sodium.crypto_scalarmult_ed25519_base_noclamp(ka)

  return {
    a,
    secretKey: ka,
    publicKey: kA,
  }
}

const sha512Multipart = (parts: Array<Uint8Array>) => {
  return sodium.crypto_hash_sha512(concatUInt8Array(...parts))
}

function blindedED25519Signature(
  messageParts: Uint8Array,
  ourKeyPair: KeyPair,
  ka: Uint8Array,
  kA: Uint8Array
): Uint8Array {
  const sEncode = ourKeyPair.privateKey.slice(0, 32)
  const shaFullLength = sodium.crypto_hash_sha512(sEncode)
  const Hrh = shaFullLength.slice(32)
  const r = sodium.crypto_core_ed25519_scalar_reduce(sha512Multipart([Hrh, kA, messageParts]))
  const sigR = sodium.crypto_scalarmult_ed25519_base_noclamp(r)
  const HRAM = sodium.crypto_core_ed25519_scalar_reduce(sha512Multipart([sigR, kA, messageParts]))
  const sigS = sodium.crypto_core_ed25519_scalar_add(
    r,
    sodium.crypto_core_ed25519_scalar_mul(HRAM, ka)
  )

  const fullSig = concatUInt8Array(sigR, sigS)
  return fullSig
}

export const concatUInt8Array = (...args: Array<Uint8Array>): Uint8Array => {
  const totalLength = args.reduce((acc, current) => acc + current.length, 0)

  const concatted = new Uint8Array(totalLength)
  let currentIndex = 0
  args.forEach(arr => {
    concatted.set(arr, currentIndex)
    currentIndex += arr.length
  })

  return concatted
}

function getSogsSignature({
  blinded,
  ka,
  kA,
  toSign,
  signingKeys,
}: {
  blinded: boolean
  ka?: Uint8Array
  kA?: Uint8Array
  toSign: Uint8Array
  signingKeys: KeyPair
}) {
  if (blinded && ka && kA) {
    return blindedED25519Signature(toSign, signingKeys, ka, kA)
  }
  return sodium.crypto_sign_detached(toSign, signingKeys.privateKey)
}
