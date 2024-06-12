import type { Snode } from '@/types/snode'
import { seeds } from '../seeds'
import { SessionFetchError, SessionFetchErrorCode } from '@/errors/fetch'
import type { ResponseGetSnodes } from '@/network/response'

export async function getSnodes(): Promise<ResponseGetSnodes> {
  for(const seed of seeds) {
    try {
      const snode = seeds[0]
      const snodesRequest = await fetch(`https://${snode.url}/json_rpc`, {
        headers: {
          'User-Agent': 'WhatsApp', // don't ask, it's a tradition: https://github.com/oxen-io/session-desktop/blob/48a245e13c3b9f99da93fc8fe79dfd5019cd1f0a/ts/session/apis/seed_node_api/SeedNodeAPI.ts#L259
        },
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 0,
          method: 'get_n_service_nodes',
          params: {
            fields: {
              'public_ip': true,
              'storage_port': true,
              'pubkey_x25519': true,
              'pubkey_ed25519': true
            }
          }
        }),
        tls: {
          rejectUnauthorized: false
        }
      })
      if (!snodesRequest.ok) {
        throw new Error('Failed to fetch snodes: ' + snodesRequest.statusText)
        }
      const snodesResponse = await snodesRequest.json()
      const snodes = (snodesResponse.result.service_node_states as Snode[])
        .filter(snode => snode.public_ip !== '0.0.0.0')
      return { snodes }
    } catch(e) {
      if(process.env.NODE_ENV === 'development') {
        console.error('Failed to fetch snodes from', seed.url, e)
      }
    }
  }
  throw new SessionFetchError({ code: SessionFetchErrorCode.FetchFailed, message: 'Couldn\'t fetch snodes using seeds' })
}