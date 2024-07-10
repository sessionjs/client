import type { SnodeNamespaces } from '@/types/namespaces'
import type { Snode } from '@/types/snode'
import type { RetrieveMessageItem } from '@/types/snode-retrieve'
import type { Swarm } from '@/types/swarm'

export type ResponseStore = {
  hash: string
}

export type ResponseGetSnodes = {
  snodes: Snode[]
}

export type ResponseGetSwarms = {
  swarms: Swarm[]
}

export type ResponsePoll = {
  messages: { namespace: SnodeNamespaces, messages: RetrieveMessageItem[] }[]
}

export type ResponseUploadAttachment = {
  url: string
  id: number
}