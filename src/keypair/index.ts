import sodium from 'libsodium-wrappers-sumo'
import { Uint8ArrayToHex, hexToUint8Array } from '../utils'

export type Keypair = {
  x25519: sodium.KeyPair
  ed25519: sodium.KeyPair
}

export function getKeypairFromSeed(seedHex: string): Keypair {
  const privKeyHexLength = 32 * 2
  if (seedHex.length !== privKeyHexLength) {
    seedHex = seedHex.concat('0'.repeat(32))
    seedHex = seedHex.substring(0, privKeyHexLength)
  }
  const seed = hexToUint8Array(seedHex)
  const ed25519KeyPair = sodium.crypto_sign_seed_keypair(new Uint8Array(seed))
  const x25519PublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(ed25519KeyPair.publicKey)
  const origPub = new Uint8Array(x25519PublicKey)
  const prependedX25519PublicKey = new Uint8Array(33)
  prependedX25519PublicKey.set(origPub, 1)
  prependedX25519PublicKey[0] = 5
  const x25519SecretKey = sodium.crypto_sign_ed25519_sk_to_curve25519(ed25519KeyPair.privateKey)

  const x25519KeyPair: sodium.KeyPair = {
    keyType: 'x25519',
    publicKey: prependedX25519PublicKey,
    privateKey: x25519SecretKey,
  }

  return { x25519: x25519KeyPair, ed25519: ed25519KeyPair }
}

export function generateSeedHex() {
  const seed = sodium.randombytes_buf(16)
  return Uint8ArrayToHex(seed)
}