import { SignalService } from '@session-oxen/signal-service';
import type { DisappearingMessageType } from '@session-oxen/types/disappearing-message';
import { ContentMessage, type MessageParams } from './signal-message';
export interface ExpirableMessageParams extends MessageParams {
    expirationType: DisappearingMessageType | null;
    expireTimer: number | null;
}
export declare class ExpirableMessage extends ContentMessage {
    readonly expirationType: DisappearingMessageType | null;
    /** in seconds, 0 means no expiration */
    readonly expireTimer: number | null;
    constructor(params: ExpirableMessageParams);
    contentProto(): SignalService.Content;
    dataProto(): SignalService.DataMessage;
    getDisappearingMessageType(): DisappearingMessageType | undefined;
    ttl(): number;
}
