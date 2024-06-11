import type { RequestStoreBody } from '@session-oxen/network/request';
import type { ResponseStore } from '@session-oxen/network/response';
export declare function storeMessage({ swarm, data64, destination, namespace, timestamp, ttl }: RequestStoreBody): Promise<ResponseStore>;
