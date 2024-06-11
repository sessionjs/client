import { SignalService } from '@session-oxen/signal-service';
import type { EnvelopePlus } from '@session-oxen/types/envelope';
export declare function signalMessageToMessage({ hash, envelope, content }: {
    hash: string;
    envelope: EnvelopePlus;
    content: SignalService.Content;
}): Message;
export type PrivateMessage = {
    type: 'private';
};
export type ClosedGroupMessage = {
    type: 'group';
    groupId: string;
};
export type Message = (PrivateMessage | ClosedGroupMessage) & {
    id: string;
    from: string;
    text?: string;
    _envelope: EnvelopePlus;
    _content: SignalService.Content;
};
