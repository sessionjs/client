import type { SnodeNamespaces } from './namespaces';
export type RetrieveMessageItem = {
    hash: string;
    expiration: number;
    data: string;
    timestamp: number;
};
export type RetrieveMessagesResultsContent = {
    hf?: Array<number>;
    messages?: Array<RetrieveMessageItem>;
    more: boolean;
    t: number;
};
export type RetrieveRequestResult = {
    code: number;
    messages: RetrieveMessagesResultsContent;
    namespace: SnodeNamespaces;
};
export type RetrieveMessagesResultsBatched = Array<RetrieveRequestResult>;
export type RequestNamespace = {
    namespace: SnodeNamespaces | 'all';
    pubkey: string;
    isOurPubkey: boolean;
    signature: {
        timestamp: number;
        pubkeyEd25519: string;
        signature: string;
    };
    lastHash: string | undefined;
};
