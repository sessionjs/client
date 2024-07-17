import type { Session } from '@/instance'
import { Uint8ArrayToHex } from '@/utils'
import { 
  SessionRuntimeError, SessionRuntimeErrorCode, 
  SessionValidationError, SessionValidationErrorCode 
} from '@session.js/errors'
import { getKeypairFromSeed } from '@session.js/keypair'
import { decode } from '@session.js/mnemonic'

export function setMnemonic(this: Session, mnemonic: string, displayName ?: string) {
  if (this.isAuthorized) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.InstanceAlreadyAuthorized, message: 'Mnemonic can\'t be set after it was already set' })
  mnemonic = mnemonic.trim()
  const words = mnemonic.split(' ')
  if (words.length !== 13) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in mnemonic provided in setMnemonic call. Expected 13 words, got ' + words.length })
  const seed = decode(mnemonic)
  this.keypair = getKeypairFromSeed(seed)
  this.sessionID = Uint8ArrayToHex(this.keypair.x25519.publicKey)
  this.mnemonic = mnemonic
  if (displayName !== undefined) {
    this.setDisplayName(displayName)
  }
  this.isAuthorized = true
  this.pollers.forEach(poller => poller.startPolling())
}

export function getMnemonic(this: Session): string | undefined {
  return this.mnemonic
}