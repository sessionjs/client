import type { SignalService } from '@/signal-service'

export type EventCallbackSignatures = {
  messagesReceived: (messages: SignalService.Content[]) => void;
}
export type EventName = keyof EventCallbackSignatures;
export type EventCallback<E extends EventName> = EventCallbackSignatures[E];