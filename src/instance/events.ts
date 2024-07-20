import type { Message, MessageDeleted, MessageReadEvent } from '../messages'

export type EventCallbackSignatures = {
  message: (message: Message) => void
  syncMessage: (message: Message) => void
  messageDeleted: (message: MessageDeleted) => void
  messageRead: (message: MessageReadEvent) => void
}
export type EventName = keyof EventCallbackSignatures
export type EventCallback<E extends EventName> = EventCallbackSignatures[E]