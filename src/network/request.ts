import type { Snode } from '@/types/snode'
import type { RequestNamespace } from '@/types/snode-retrieve'
import type { Swarm } from '@/types/swarm'

export enum RequestType {
  Store = '/store',
  GetSnodes = '/get_snodes',
  GetSwarms = '/get_swarms',
  Poll = '/poll',
  UploadAttachment = '/upload_attachment',
}

export type RequestStoreBody = {
  destination: string
  data64: string
  ttl: number
  timestamp: number
  namespace: number
  swarm: Swarm
}

export type RequestGetSwarmsBody = {
  snode: Snode
  pubkey: string
}

export type RequestPollBody = {
  swarm: Swarm
  namespaces: RequestNamespace[]
}

export type RequestUploadAttachment = {
  data: ArrayBuffer
}