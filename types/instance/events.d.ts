import type { Message } from '@session-oxen/messages';
export type EventCallbackSignatures = {
    message: (message: Message) => void;
};
export type EventName = keyof EventCallbackSignatures;
export type EventCallback<E extends EventName> = EventCallbackSignatures[E];
