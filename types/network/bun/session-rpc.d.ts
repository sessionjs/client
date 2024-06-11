/// <reference types="node" />
import https from 'https';
import type { Snode } from '@session-oxen/types/snode';
import type { SnodeResponse } from './batch-request';
export declare const ERROR_421_HANDLED_RETRY_REQUEST = "421 handled. Retry this request with a new snode.";
/**
 * This function will throw for a few reasons.
 * The loki-important ones are
 *  -> if we try to make a request to a path which fails too many times => user will need to retry himself
 *  -> if the targetNode gets too many errors => we will need to try to do this request again with another target node
 * The
 */
export declare function snodeRpc({ method, params, targetNode, timeout, }: {
    method: string;
    params: Record<string, any> | Array<Record<string, any>>;
    targetNode: Snode;
    timeout?: number;
}): Promise<undefined | SnodeResponse>;
export interface LokiFetchOptions {
    method: 'GET' | 'POST';
    body: string | null;
    agent: https.Agent | null;
    headers: Record<string, string>;
}
