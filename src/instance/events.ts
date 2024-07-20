import type { MediaSavedNotification, Message, MessageDeleted, MessageReadEvent, MessageTypingIndicator, ScreenshotTakenNotification } from '../messages'

export type EventCallbackSignatures = {
  message: (message: Message) => void
  syncMessage: (message: Message) => void
  messageDeleted: (message: MessageDeleted) => void
  messageRead: (message: MessageReadEvent) => void
  messageTypingIndicator: (indicator: MessageTypingIndicator) => void
  screenshotTaken: (notification: ScreenshotTakenNotification) => void
  mediaSaved: (notification: MediaSavedNotification) => void
}
export type EventName = keyof EventCallbackSignatures
export type EventCallback<E extends EventName> = EventCallbackSignatures[E]