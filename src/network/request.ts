export enum RequestType {
  Store = '/store'
}

export type RequestStoreBody = {
  params: {
    pubkey: string;
    data64: string;
    ttl: number;
    timestamp: number;
    namespace: number;
  }
  snode: string;
  sync: {
    pubkey: string;
    data: string;
  }
}