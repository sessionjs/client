import type { Session } from '@/instance'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'

export const forbiddenDisplayCharRegex = /\uFFD2*/g

export async function setDisplayName(this: Session, displayName: string) {
  if (displayName.length > 64 || displayName.length === 0) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidDisplayName, message: 'Display name must be between 1 and 64 characters' })
  } else {
    this.displayName = displayName.replace(forbiddenDisplayCharRegex, '')
    await this.storage.set('displayName', this.displayName)
  }
}