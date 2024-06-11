import { SnodeNamespaces } from '@session-oxen/types/namespaces';
export type SwarmForSubRequest = {
    method: 'get_swarm';
    params: {
        pubkey: string;
    };
};
type RetrieveMaxCountSize = {
    max_count?: number;
    max_size?: number;
};
type RetrieveAlwaysNeeded = {
    pubkey: string;
    namespace: number;
    lastHash: string;
    timestamp?: number;
};
export type RetrievePubkeySubRequestType = {
    method: 'retrieve';
    params: {
        signature: string;
        pubkey_ed25519: string;
        namespace: number;
    } & RetrieveAlwaysNeeded & RetrieveMaxCountSize;
};
/** Those namespaces do not require to be authenticated for storing messages.
 *  -> 0 is used for our swarm, and anyone needs to be able to send message to us.
 *  -> -10 is used for legacy closed group and we do not have authentication for them yet (but we will with the new closed groups)
 *  -> others are currently unused
 *
 */
export type RetrieveLegacyClosedGroupSubRequestType = {
    method: 'retrieve';
    params: {
        namespace: SnodeNamespaces.ClosedGroupMessage;
    } & RetrieveAlwaysNeeded & RetrieveMaxCountSize;
};
export type RetrieveSubKeySubRequestType = {
    method: 'retrieve';
    params: {
        subkey: string;
        signature: string;
        namespace: number;
    } & RetrieveAlwaysNeeded & RetrieveMaxCountSize;
};
export type RetrieveSubRequestType = RetrieveLegacyClosedGroupSubRequestType | RetrievePubkeySubRequestType | RetrieveSubKeySubRequestType | UpdateExpiryOnNodeSubRequest;
/**
 * OXEND_REQUESTS
 */
export type OnsResolveSubRequest = {
    method: 'oxend_request';
    params: {
        endpoint: 'ons_resolve';
        params: {
            type: 0;
            name_hash: string;
        };
    };
};
export type GetServiceNodesSubRequest = {
    method: 'oxend_request';
    params: {
        endpoint: 'get_service_nodes';
        params: {
            active_only: true;
            fields: {
                public_ip: true;
                storage_port: true;
                pubkey_x25519: true;
                pubkey_ed25519: true;
            };
        };
    };
};
export type StoreOnNodeParams = {
    pubkey: string;
    ttl: number;
    timestamp: number;
    data: string;
    namespace: number;
    signature?: string;
    pubkey_ed25519?: string;
};
export type StoreOnNodeParamsNoSig = Pick<StoreOnNodeParams, 'pubkey' | 'ttl' | 'timestamp' | 'ttl' | 'namespace'> & {
    data64: string;
};
export type DeleteFromNodeWithTimestampParams = {
    timestamp: string | number;
    namespace: number | null | 'all';
} & DeleteSigParameters;
export type DeleteByHashesFromNodeParams = {
    messages: Array<string>;
} & DeleteSigParameters;
export type StoreOnNodeMessage = {
    pubkey: string;
    timestamp: number;
    namespace: number;
    message: any;
};
export type StoreOnNodeSubRequest = {
    method: 'store';
    params: StoreOnNodeParams;
};
export type NetworkTimeSubRequest = {
    method: 'info';
    params: object;
};
type DeleteSigParameters = {
    pubkey: string;
    pubkey_ed25519: string;
    signature: string;
};
export type DeleteAllFromNodeSubRequest = {
    method: 'delete_all';
    params: DeleteFromNodeWithTimestampParams;
};
export type DeleteFromNodeSubRequest = {
    method: 'delete';
    params: DeleteByHashesFromNodeParams;
};
export type UpdateExpireNodeParams = {
    pubkey: string;
    pubkey_ed25519: string;
    messages: Array<string>;
    expiry: number;
    signature: string;
    extend?: boolean;
    shorten?: boolean;
};
export type UpdateExpiryOnNodeSubRequest = {
    method: 'expire';
    params: UpdateExpireNodeParams;
};
export type GetExpiriesNodeParams = {
    pubkey: string;
    pubkey_ed25519: string;
    messages: Array<string>;
    timestamp: number;
    signature: string;
};
export type GetExpiriesFromNodeSubRequest = {
    method: 'get_expiries';
    params: GetExpiriesNodeParams;
};
export declare const fakeHash = "///////////////////////////////////////////";
export type OxendSubRequest = OnsResolveSubRequest | GetServiceNodesSubRequest;
export type SnodeApiSubRequests = RetrieveSubRequestType | SwarmForSubRequest | OxendSubRequest | StoreOnNodeSubRequest | NetworkTimeSubRequest | DeleteFromNodeSubRequest | DeleteAllFromNodeSubRequest | UpdateExpiryOnNodeSubRequest | GetExpiriesFromNodeSubRequest;
export type NonEmptyArray<T> = [T, ...T[]];
export type NotEmptyArrayOfBatchResults = NonEmptyArray<{
    code: number;
    body: Record<string, any>;
}>;
export type WithShortenOrExtend = {
    shortenOrExtend: 'shorten' | 'extend' | '';
};
export declare const MAX_SUBREQUESTS_COUNT = 20;
export {};
