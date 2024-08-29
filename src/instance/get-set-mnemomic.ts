import type { Session } from '@/instance'
import { Uint8ArrayToHex } from '@/utils'
import { 
  SessionRuntimeError, SessionRuntimeErrorCode, 
  SessionValidationError, SessionValidationErrorCode 
} from '@session.js/errors'
import { getKeypairFromSeed } from '@session.js/keypair'
import { decode } from '@session.js/mnemonic'
import { StorageKeys } from '@session.js/types/storage'

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
  } else {
    const displayNameStorage =this.storage.get(StorageKeys.DisplayName)
    if (typeof displayNameStorage === 'string') {
      this.displayName = displayNameStorage
    } else if (displayNameStorage) {
      displayNameStorage.then(dn => { 
        if(dn) {
          this.displayName = dn
        }
      })
    }
  }
  const avatarStorageRequest = this.storage.get(StorageKeys.Avatar)
  if (avatarStorageRequest !== null) {
    loadAvatar.call(this, avatarStorageRequest)
  }
  this.isAuthorized = true
  this.pollers.forEach(poller => poller.startPolling())
}

export function getMnemonic(this: Session): string | undefined {
  return this.mnemonic
}

type AvatarStorage = { key: number[], url: string }
async function loadAvatar(this: Session, avatarStorageRequest: string | Promise<string | null>) {
  const avatarStorageSerialized = typeof avatarStorageRequest === 'string' 
    ? avatarStorageRequest 
    : await avatarStorageRequest
  if (typeof avatarStorageSerialized === 'string') {
    const { key, url } = JSON.parse(avatarStorageSerialized) as AvatarStorage
    const profileKey = new Uint8Array(key)
    this.avatar = { key: profileKey, url }
  }
}