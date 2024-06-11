import { SignalService } from '@session-oxen/signal-service';
import { ExpirableMessage, type ExpirableMessageParams } from '../expirable-message';
import type { LokiProfile } from '../signal-message';
import type { Reaction } from '@session-oxen/reactions';
interface AttachmentPointerCommon {
    contentType?: string;
    key?: Uint8Array;
    size?: number;
    thumbnail?: Uint8Array;
    digest?: Uint8Array;
    fileName?: string;
    flags?: number;
    width?: number;
    height?: number;
    caption?: string;
}
export interface AttachmentPointer extends AttachmentPointerCommon {
    url?: string;
    id?: number;
}
export interface AttachmentPointerWithUrl extends AttachmentPointerCommon {
    url: string;
    id: number;
}
export interface Preview {
    url: string;
    title?: string;
    image?: AttachmentPointer;
}
export interface PreviewWithAttachmentUrl {
    url: string;
    id: number;
    title?: string;
    image?: AttachmentPointerWithUrl;
}
interface QuotedAttachmentCommon {
    contentType?: string;
    fileName?: string;
}
export interface QuotedAttachment extends QuotedAttachmentCommon {
    thumbnail?: AttachmentPointer;
}
export interface QuotedAttachmentWithUrl extends QuotedAttachmentCommon {
    thumbnail?: AttachmentPointerWithUrl | QuotedAttachment;
}
export interface Quote {
    id: number;
    author: string;
    text?: string;
    attachments?: Array<QuotedAttachmentWithUrl>;
}
export interface VisibleMessageParams extends ExpirableMessageParams {
    attachments?: Array<AttachmentPointerWithUrl>;
    body?: string;
    quote?: Quote;
    lokiProfile?: LokiProfile;
    preview?: Array<PreviewWithAttachmentUrl>;
    reaction?: Reaction;
    syncTarget?: string;
}
export declare class VisibleMessage extends ExpirableMessage {
    readonly reaction?: Reaction;
    private readonly attachments?;
    private readonly body?;
    private readonly quote?;
    private readonly profileKey?;
    private readonly profile?;
    private readonly preview?;
    private readonly syncTarget?;
    constructor(params: VisibleMessageParams);
    contentProto(): SignalService.Content;
    dataProto(): SignalService.DataMessage;
    isEqual(comparator: VisibleMessage): boolean;
}
export declare function buildProfileForOutgoingMessage(params: {
    lokiProfile?: LokiProfile;
}): {
    lokiProfile: SignalService.DataMessage.ILokiProfile | undefined;
    profileKey: Uint8Array | undefined;
};
export {};
