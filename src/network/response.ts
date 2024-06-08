import type { Snode } from '@/types/snode'
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