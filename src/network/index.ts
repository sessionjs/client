import type { RequestType } from '@/network/request'

export interface Network {
  onRequest(type: RequestType, body: unknown): Promise<unknown>
}