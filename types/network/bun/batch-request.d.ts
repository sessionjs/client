import { type NotEmptyArrayOfBatchResults, type SnodeApiSubRequests } from './snode-request-types';
import type { Snode } from '@session-oxen/types/snode';
/**
 * When sending a request over onion, we might get two status.
 * The first one, on the request itself, the other one in the json returned.
 *
 * If the request failed to reach the one of the node of the onion path, the one on the request is set.
 * But if the request reaches the destination node and it fails to process the request (bad node for this pubkey),
 * you will get a 200 on the request itself, but the json you get will contain the real status.
 */
export interface SnodeResponse {
    bodyBinary: Uint8Array | null;
    body: string;
    status?: number;
}
/**
 * This is the equivalent to the batch send on sogs. The target node runs each sub request and returns a list of all the sub status and bodies.
 * If the global status code is not 200, an exception is thrown.
 * The body is already parsed from json and is enforced to be an Array of at least one element
 * @param subRequests the list of requests to do
 * @param targetNode the node to do the request to, once all the onion routing is done
 * @param timeout the timeout at which we should cancel this request.
 * @param method can be either batch or sequence. A batch call will run all calls even if one of them fails. A sequence call will stop as soon as the first one fails
 */
export declare function doSnodeBatchRequest(subRequests: Array<SnodeApiSubRequests>, targetNode: Snode, timeout: number, method?: 'batch' | 'sequence'): Promise<NotEmptyArrayOfBatchResults>;
