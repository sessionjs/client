import type { SnodeSignatureResult } from '@session-oxen/types/snode-signature-result';
import { type KeyPair } from 'libsodium-wrappers-sumo';
export declare function getSnodeSignatureParams(params: {
    ed25519Key: KeyPair;
    namespace: number | null | 'all';
    method: 'retrieve' | 'store' | 'delete_all';
}): SnodeSignatureResult;
