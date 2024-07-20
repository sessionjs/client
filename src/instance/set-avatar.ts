import type { Session } from '@/instance'
import { uploadAvatar } from '@/profile'
import { StorageKeys } from '@session.js/types/storage'

export async function setAvatar(this: Session, avatar: ArrayBuffer) {
  const { profileKey, avatarPointer } = await uploadAvatar.call(this, avatar)
  await this.storage.set(StorageKeys.Avatar, JSON.stringify({ key: Array.from(profileKey), url: avatarPointer }))
  this.avatar = { key: profileKey, url: avatarPointer }
}