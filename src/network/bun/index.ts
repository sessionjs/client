import { RequestType, type RequestGetSwarmsBody, type RequestPollBody, type RequestStoreBody, type RequestUploadAttachment } from '@/network/request'
import type { ResponseGetSnodes, ResponseGetSwarms, ResponseStore, ResponseUploadAttachment } from '@/network/response'
import type { Network } from '@/network'
import { storeMessage } from './routes/store'
import { getSnodes } from './routes/get-snodes'
import { getSwarms } from './routes/get-swarms'
import { poll } from '@/network/bun/routes/poll'
import { uploadAttachment } from '@/network/bun/routes/upload-attachment'

export async function onRequest(type: RequestType.Store, body: RequestStoreBody): Promise<ResponseStore>
export async function onRequest(type: RequestType.GetSnodes, body: object): Promise<ResponseGetSnodes>
export async function onRequest(type: RequestType.GetSwarms, body: RequestGetSwarmsBody): Promise<ResponseGetSwarms>
export async function onRequest(type: RequestType.UploadAttachment, body: RequestUploadAttachment): Promise<ResponseUploadAttachment>
export async function onRequest(type: RequestType, body: object): Promise<object> {
  switch(type) {
    case RequestType.Store:
      return await storeMessage(body as RequestStoreBody)

    case RequestType.GetSnodes:
      return await getSnodes()

    case RequestType.GetSwarms:
      return await getSwarms(body as RequestGetSwarmsBody)

    case RequestType.Poll:
      return await poll(body as RequestPollBody)

    case RequestType.UploadAttachment:
      return await uploadAttachment(body as RequestUploadAttachment)

    default:
      throw new Error('Invalid request type')
  }
}

export class BunNetwork implements Network {
  onRequest(type: RequestType, body: object): Promise<object> {
    return onRequest(type as any, body as any)
  }
}