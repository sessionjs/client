import { RequestType, type RequestGetSwarmsBody, type RequestStoreBody } from '@session-oxen/network/request';
import type { ResponseGetSnodes, ResponseGetSwarms, ResponseStore } from '@session-oxen/network/response';
import type { Network } from '@session-oxen/network';
export declare function onRequest(type: RequestType.Store, body: RequestStoreBody): Promise<ResponseStore>;
export declare function onRequest(type: RequestType.GetSnodes, body: object): Promise<ResponseGetSnodes>;
export declare function onRequest(type: RequestType.GetSwarms, body: RequestGetSwarmsBody): Promise<ResponseGetSwarms>;
export declare class BunNetwork implements Network {
    onRequest(type: RequestType, body: object): Promise<object>;
}
