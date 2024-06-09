import { doSnodeBatchRequest } from '@/network/bun/batch-request'
import type { RequestGetSwarmsBody } from '@/network/request'
import type { ResponseGetSwarms } from '@/network/response'
import type { Swarm } from '@/types/swarm'

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