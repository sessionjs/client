import { doSnodeBatchRequest } from '@session-oxen/network/bun/batch-request'
import type { RequestGetSwarmsBody } from '@session-oxen/network/request'
import type { ResponseGetSwarms } from '@session-oxen/network/response'
import type { Swarm } from '@session-oxen/types/swarm'

export async function getSwarms({ snode, pubkey }: RequestGetSwarmsBody): Promise<ResponseGetSwarms> {
  const result = await doSnodeBatchRequest([{
    method: 'get_swarm',
    params: {
      pubkey,
    },
  }], snode, 10000)
  const swarms = result[0].body.snodes as Swarm[]
  return { swarms }
}