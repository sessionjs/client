import https from 'https'
import { clone } from 'lodash'
import type { Snode } from '@session-oxen/types/snode'
import type { SnodeResponse } from './batch-request'
import { SessionFetchError, SessionFetchErrorCode } from '@session-oxen/errors/fetch'

export const ERROR_421_HANDLED_RETRY_REQUEST = '421 handled. Retry this request with a new snode.'

/**
 * This function will throw for a few reasons.
 * The loki-important ones are
 *  -> if we try to make a request to a path which fails too many times => user will need to retry himself
 *  -> if the targetNode gets too many errors => we will need to try to do this request again with another target node
 * The
 */
export async function snodeRpc(
  {
    method,
    params,
    targetNode,
    timeout = 10000,
  }: {
    method: string;
     
    params: Record<string, any> | Array<Record<string, any>>;
    targetNode: Snode;
    timeout?: number;
  } // the user pubkey this call is for. if the onion request fails, this is used to handle the error for this user swarm for instance
): Promise<undefined | SnodeResponse> {
  const url = `https://${targetNode.public_ip}:${targetNode.storage_port}/storage_rpc/v1`

  const body = {
    jsonrpc: '2.0',
    method,
    params: clone(params),
  }

  const fetchOptions: LokiFetchOptions = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    agent: null,
  }

  return doRequest({
    url,
    options: fetchOptions,
    targetNode,
    timeout,
  })
}


export interface LokiFetchOptions {
  method: 'GET' | 'POST';
  body: string | null;
  agent: https.Agent | null;
  headers: Record<string, string>;
}

/**
 * A small wrapper around node-fetch which deserializes response
 * returns insecureNodeFetch response or false
 */
async function doRequest({
  options,
  url,
  timeout,
}: {
  url: string;
  options: LokiFetchOptions;
  targetNode?: Snode;
  timeout: number;
}): Promise<undefined | SnodeResponse> {
  const method = options.method || 'GET'

  const fetchOptions = {
    ...options,
    timeout,
    method,
  }

  fetchOptions.headers = {
    'User-Agent': 'WhatsApp', // don't ask, it's a tradition: https://github.com/oxen-io/session-desktop/blob/48a245e13c3b9f99da93fc8fe79dfd5019cd1f0a/ts/session/apis/seed_node_api/SeedNodeAPI.ts#L259
    'Accept-Language': 'en-us',
    'Content-Type': 'application/json',
  }

  const response = await fetch(url, {
    ...fetchOptions,
    body: fetchOptions.body || undefined,
    tls: {
      rejectUnauthorized: false,
    }
  })
  if (response.status === 421) {
    throw new SessionFetchError({ code: SessionFetchErrorCode.RetryWithOtherNode421Error, message: ERROR_421_HANDLED_RETRY_REQUEST })
  }
  const result = await response.text()
  if (!response.ok) {
    throw new SessionFetchError({ code: SessionFetchErrorCode.FetchFailed, message: 'Error from snode: ' + (result.length > 500 ? result.slice(0, 500) + '...' : result) })
  }

  return {
    body: result,
    status: response.status,
    bodyBinary: null,
  }
}