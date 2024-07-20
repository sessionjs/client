import type { Session } from '@/instance'
import { RequestType } from '@session.js/types/network/request'
import type { ResponseGetSnodes } from '@session.js/types/network/response'

export async function getSnodes(this: Session) {
  if (!this.snodes) {
    const { snodes } = await this._request<ResponseGetSnodes>({ type: RequestType.GetSnodes, body: {} })
    this.snodes = snodes
  }
  return this.snodes
}