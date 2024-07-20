import type { Session } from '@/instance'
import { uploadAvatar } from '@/profile'

export async function setAvatar(this: Session, avatar: ArrayBuffer) {
  const { profileKey, avatarPointer } = await uploadAvatar.call(this, avatar)
  await this.storage.set('avatar', JSON.stringify({ key: Array.from(profileKey), url: avatarPointer }))
  this.avatar = { key: profileKey, url: avatarPointer }
}