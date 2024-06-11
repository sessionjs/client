import { SignalService } from '../signal-service';
import { SnodeNamespaces } from '../types/namespaces';
export type LokiProfile = {
    displayName: string;
    avatarPointer?: string;
    profileKey: Uint8Array | null;
};
export interface MessageParams {
    timestamp: number;
    identifier?: string;
}
export declare abstract class SignalMessage {
    readonly timestamp: number;
    readonly identifier: string;
    constructor({ timestamp, identifier }: MessageParams);
}
export declare abstract class ContentMessage extends SignalMessage {
    plainTextBuffer(): Uint8Array;
    ttl(): number;
    abstract contentProto(): SignalService.Content;
}
export type RawMessage = {
    identifier: string;
    plainTextBuffer: Uint8Array;
    recipient: string;
    ttl: number;
    encryption: SignalService.Envelope.Type;
    namespace: SnodeNamespaces;
};
export declare function toRawMessage(destinationPubKey: string, message: ContentMessage, namespace: SnodeNamespaces, isGroup?: boolean): RawMessage;
