import type { Session } from '@/instance'
import { decryptProfile } from '@/profile/decrypt'
import { encryptProfile } from '@/profile/encrypt'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import { type RequestDownloadAttachment, RequestType, type RequestUploadAttachment } from '@session.js/types/network/request'
import type { ResponseUploadAttachment } from '@session.js/types/network/response'
import { SignalService } from '@session.js/types/signal-bindings'
import sodium from 'libsodium-wrappers-sumo'

export const PROFILE_IV_LENGTH = 12 // bytes
export const PROFILE_KEY_LENGTH = 32 // bytes
export const PROFILE_TAG_LENGTH = 128 // bits

export type Profile = {
  /** Name, displayed instead of your Session ID. Acts like nickname. All unicode characters are accepted except for `ￒ` (0xffd2) which is reserved by Session for mentions. Max length: 64 characters */
  displayName: string
  /** Image, displayed near display name in Session clients. Acts like profile picture. */
  avatar?: {
    /** URL to avatar, uploaded to Session file server */
    url: string
    /** 32 bytes key used for avatar encryption */
    key: Uint8Array
  }
}

export type SignalILokiProfile = {
  lokiProfile: SignalService.DataMessage.ILokiProfile | null | undefined
  profileKey: Uint8Array | null | undefined
}
export function serializeProfile(profile: Profile): SignalILokiProfile {
  let signalILokiProfile: SignalService.DataMessage.ILokiProfile | undefined
  if (profile.avatar || profile.displayName) {
    signalILokiProfile = new SignalService.DataMessage.LokiProfile()

    if (profile.avatar && profile.avatar.url && profile.avatar.key.length) {
      signalILokiProfile.profilePicture = profile.avatar.url
    }

    if (profile.displayName) {
      signalILokiProfile.displayName = profile.displayName
    }
  }

  return {
    lokiProfile: signalILokiProfile,
    profileKey: profile.avatar?.key,
  }
}

export async function downloadAvatar(this: Session, avatar: NonNullable<Profile['avatar']>): Promise<ArrayBuffer> {
  const fileServerURL = 'http://filev2.getsession.org/file/'
  if (!avatar.url.startsWith(fileServerURL)) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidAttachment, message: 'Avatar must be hosted on Session file server' })
  }
  const fileId = avatar.url.substring(fileServerURL.length)
  if(!/^\d+$/.test(fileId)) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidAttachment, message: 'Invalid avatar file ID' })
  }
  const avatarFile = await this._request<ArrayBuffer, RequestDownloadAttachment>({
    type: RequestType.DownloadAttachment,
    body: {
      id: fileId,
    }
  })
  const decryptedAvatarImage = await decryptProfile(avatarFile, avatar.key)
  return decryptedAvatarImage
}

export function deserializeProfile(signalILokiProfile: SignalILokiProfile): Profile {
  const profile: Profile = {
    displayName: signalILokiProfile.lokiProfile?.displayName || '',
    avatar: (signalILokiProfile.lokiProfile?.profilePicture && signalILokiProfile.profileKey) ? {
      url: signalILokiProfile.lokiProfile.profilePicture,
      key: signalILokiProfile.profileKey
    } : undefined
  }

  return profile
}

export async function uploadAvatar(this: Session, avatar: ArrayBuffer) {
  const profileKey = await sodium.randombytes_buf(32)
  const encryptedAvatar = await encryptProfile(avatar, profileKey)
  const uploadRequest = await this._request<ResponseUploadAttachment, RequestUploadAttachment>({
    type: RequestType.UploadAttachment,
    body: {
      data: encryptedAvatar
    }
  })
  return { 
    profileKey,
    avatarPointer: uploadRequest.url
  }
}