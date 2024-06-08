// CREDIT: OXEN, Session-Desktop
// github.com/oxen-io/session-desktop

import { isArray } from 'lodash'
import { snodeRpc } from './session-rpc'
import {
  MAX_SUBREQUESTS_COUNT,
  type NotEmptyArrayOfBatchResults,
  type SnodeApiSubRequests,
} from './snode-request-types'
import type { Snode } from '@/types/snode'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '@/errors/runtime'

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
 * @param associatedWith used mostly for handling 421 errors, we need the pubkey the change is associated to
 * @param method can be either batch or sequence. A batch call will run all calls even if one of them fails. A sequence call will stop as soon as the first one fails
 */
export async function doSnodeBatchRequest(
  subRequests: Array<SnodeApiSubRequests>,
  targetNode: Snode,
  timeout: number,
  associatedWith: string | null,
  method: 'batch' | 'sequence' = 'batch'
): Promise<NotEmptyArrayOfBatchResults> {
  if (subRequests.length > MAX_SUBREQUESTS_COUNT) {
    throw new SessionRuntimeError({
      code: SessionRuntimeErrorCode.Generic,
      message: `batch subRequests count cannot be more than ${MAX_SUBREQUESTS_COUNT}. Got ${subRequests.length}`
    })
  }
  const result = await snodeRpc({
    method,
    params: { requests: subRequests },
    targetNode,
    associatedWith,
    timeout,
  })
  if (!result) {
    throw new SessionRuntimeError({
      code: SessionRuntimeErrorCode.Generic,
      message: `doSnodeBatchRequest - sessionRpc could not talk to ${targetNode.public_ip}:${targetNode.storage_port}`
    })
  }
  const decoded = decodeBatchRequest(result)

  // if (decoded?.length) {
  //   for (let index = 0; index < decoded.length; index++) {
  // const resultRow = decoded[index]
  // // eslint-disable-next-line no-await-in-loop
  // await processOnionRequestErrorAtDestination({
  //   statusCode: resultRow.code,
  //   body: JSON.stringify(resultRow.body),
  //   associatedWith: associatedWith || undefined,
  //   destinationSnodeEd25519: targetNode.pubkey_ed25519,
  // })
  //   }
  // }

  return decoded
}

/**
 * Make sure the global batch status code is 200, parse the content as json and return it
 */
function decodeBatchRequest(snodeResponse: SnodeResponse): NotEmptyArrayOfBatchResults {
  if (snodeResponse.status !== 200) {
    throw new SessionRuntimeError({ 
      code: SessionRuntimeErrorCode.Generic,
      message: `decodeBatchRequest invalid status code: ${snodeResponse.status}`
    })
  }
  const parsed = JSON.parse(snodeResponse.body)

  if (!isArray(parsed.results)) {
    throw new SessionRuntimeError({ 
      code: SessionRuntimeErrorCode.Generic,
      message: 'decodeBatchRequest results is not an array'
    })
  }

  if (!parsed.results.length) {
    throw new SessionRuntimeError({ 
      code: SessionRuntimeErrorCode.Generic,
      message: 'decodeBatchRequest results an empty array'
    })
  }

  return parsed.results
}
