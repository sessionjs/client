import { RequestType, type RequestGetSwarmsBody, type RequestStoreBody } from '@/network/request'
import type { ResponseGetSnodes, ResponseGetSwarms, ResponseStore } from '@/network/response'
import type { Network } from '@/network'
import { storeMessage } from './routes/store'
import { getSnodes } from './routes/get-snodes'
import { getSwarms } from './routes/get-swarms'

export async function onRequest(type: RequestType.Store, body: RequestStoreBody): Promise<ResponseStore>
export async function onRequest(type: RequestType.GetSnodes, body: object): Promise<ResponseGetSnodes>
export async function onRequest(type: RequestType.GetSwarms, body: RequestGetSwarmsBody): Promise<ResponseGetSwarms>
export async function onRequest(type: RequestType, body: object): Promise<object> {
  switch(type) {
    case RequestType.Store:
      return await storeMessage(body as RequestStoreBody)

    case RequestType.GetSnodes:
      return await getSnodes()

    case RequestType.GetSwarms:
      return await getSwarms(body as RequestGetSwarmsBody)

    default:
      throw new Error('Invalid request type')
  }
}

export class BunNetwork implements Network {
  onRequest(type: RequestType, body: object): Promise<object> {
    return onRequest(type as any, body as any)
  }
}