import type { RequestType } from '@session-oxen/network/request'

export interface Network {
  onRequest(type: RequestType, body: unknown): Promise<unknown>
}