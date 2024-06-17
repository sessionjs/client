import { SessionFetchError, SessionFetchErrorCode } from '@/errors/fetch'
import { doSnodeBatchRequest } from '@/network/bun/batch-request'
import type { DeleteByHashesFromNodeParams, DeleteFromNodeSubRequest, NotEmptyArrayOfBatchResults, StoreOnNodeParams, StoreOnNodeSubRequest } from '@/network/bun/snode-request-types'
import type { RequestStoreBody } from '@/network/request'
import type { ResponseStore } from '@/network/response'
import type { Swarm } from '@/types/swarm'
import _ from 'lodash'

export async function storeMessage({ swarm, data64, destination, namespace, timestamp, ttl }: RequestStoreBody): Promise<ResponseStore> {
  const results = await storeOnNode(
    swarm,
    [{
      data: data64,
      namespace: namespace,
      pubkey: destination,
      timestamp: timestamp,
      ttl: ttl
    }],
    null
  )
  return { hash: results[0].body.hash }
}
/**
 * Send a 'store' request to the specified targetNode, using params as argument
 * @returns the Array of stored hashes if it is a success, or null
 */
async function storeOnNode(
  swarm: Swarm,
  params: Array<StoreOnNodeParams>,
  toDeleteOnSequence: DeleteByHashesFromNodeParams | null
): Promise<NotEmptyArrayOfBatchResults> {
  const subRequests = buildStoreRequests(params, toDeleteOnSequence)
  const result = await doSnodeBatchRequest(
    subRequests,
    { public_ip: swarm.ip, storage_port: Number(swarm.port), pubkey_ed25519: swarm.pubkey_ed25519, pubkey_x25519: swarm.pubkey_x25519 },
    4000,
    toDeleteOnSequence ? 'sequence' : 'batch'
  )

  if (!result || !result.length) {
    throw new SessionFetchError({ code: SessionFetchErrorCode.InvalidResponse, message: 'Invalid result in storeOnMode' })
  }

  const firstResult = result[0]

  if (firstResult.code !== 200) {
    throw new SessionFetchError({ code: SessionFetchErrorCode.InvalidResponse, message: 'Invalid status code: ' + firstResult.code })
  }

  return result
}

function buildStoreRequests(
  params: Array<StoreOnNodeParams>,
  toDeleteOnSequence: DeleteByHashesFromNodeParams | null
): Array<StoreOnNodeSubRequest | DeleteFromNodeSubRequest> {
  if (!toDeleteOnSequence || _.isEmpty(toDeleteOnSequence)) {
    return justStores(params)
  }
  return [...justStores(params), ...buildDeleteByHashesSubRequest(toDeleteOnSequence)]
}

function justStores(params: Array<StoreOnNodeParams>) {
  return params.map(p => {
    return {
      method: 'store',
      params: p,
    } as StoreOnNodeSubRequest
  })
}

function buildDeleteByHashesSubRequest(
  params: DeleteByHashesFromNodeParams
): Array<DeleteFromNodeSubRequest> {
  return [
    {
      method: 'delete',
      params,
    },
  ]
}