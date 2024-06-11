import type { RequestGetSwarmsBody } from '@session-oxen/network/request';
import type { ResponseGetSwarms } from '@session-oxen/network/response';
export declare function getSwarms({ snode, pubkey }: RequestGetSwarmsBody): Promise<ResponseGetSwarms>;
