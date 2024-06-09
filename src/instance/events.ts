import type { Message } from '@/messages'

export type EventCallbackSignatures = {
  message: (message: Message) => void;
}
export type EventName = keyof EventCallbackSignatures;
export type EventCallback<E extends EventName> = EventCallbackSignatures[E];