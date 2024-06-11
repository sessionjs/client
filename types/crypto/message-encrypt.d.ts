import { SignalService } from '../signal-service';
import type { Keypair } from '../keypair';
export type EncryptResult = {
    envelopeType: SignalService.Envelope.Type;
    cipherText: Uint8Array;
};
export declare function encrypt(senderKeypair: Keypair, recipient: string, plainTextBuffer: Uint8Array, encryptionType: SignalService.Envelope.Type): Promise<EncryptResult>;
type SharedEncryptAndWrap = {
    ttl: number;
    identifier: string;
    isSyncMessage: boolean;
};
type EncryptAndWrapMessage = {
    isGroup: boolean;
    plainTextBuffer: Uint8Array;
    destination: string;
    namespace: number | null;
} & SharedEncryptAndWrap;
export type EncryptAndWrapMessageResults = {
    data64: string;
    networkTimestamp: number;
    data: Uint8Array;
    namespace: number;
} & SharedEncryptAndWrap;
export declare function wrap(senderKeypair: Keypair, messages: EncryptAndWrapMessage[], { networkTimestamp }: {
    networkTimestamp: number;
}): Promise<EncryptAndWrapMessageResults[]>;
export {};
