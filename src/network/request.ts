import type { Snode } from '@session-oxen/types/snode'
import type { RequestNamespace } from '@session-oxen/types/snode-retrieve'
import type { Swarm } from '@session-oxen/types/swarm'

export enum RequestType {
  Store = '/store',
  GetSnodes = '/get_snodes',
  GetSwarms = '/get_swarms',
  Poll = '/poll'
}

export type RequestStoreBody = {
  destination: string;
  data64: string;
  ttl: number;
  timestamp: number;
  namespace: number;
  swarm: Swarm;
}

export type RequestGetSwarmsBody = {
  snode: Snode;
  pubkey: string;
}

export type RequestPollBody = {
  swarm: Swarm;
  namespaces: RequestNamespace[];
}