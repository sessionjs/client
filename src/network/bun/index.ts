import { RequestType, type RequestStoreBody } from '@/network/request'
import type { ResponseStore } from '@/network/response'
import { storeMessage } from '@/network/bun/store'
import type { Network } from '@/network'

export async function onRequest(type: RequestType.Store, body: RequestStoreBody): Promise<ResponseStore>
export async function onRequest(type: RequestType, body: object): Promise<object> {
  switch(type) {
    case RequestType.Store:
      return await storeMessage(body as RequestStoreBody)

    default:
      throw new Error('Invalid request type')
  }
}

export class BunNetwork implements Network {
  onRequest(type: RequestType, body: object): Promise<object> {
    return onRequest(type, body as any)
  }
}