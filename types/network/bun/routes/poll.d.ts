import type { RetrieveSubRequestType } from '@session-oxen/network/bun/snode-request-types';
import type { RequestPollBody } from '@session-oxen/network/request';
import type { ResponsePoll } from '@session-oxen/network/response';
import { SnodeNamespaces } from '@session-oxen/types/namespaces';
import type { Snode } from '@session-oxen/types/snode';
import type { RequestNamespace, RetrieveMessageItem, RetrieveMessagesResultsBatched } from '@session-oxen/types/snode-retrieve';
import type { Swarm } from '@session-oxen/types/swarm';
export declare function poll({ swarm, namespaces }: RequestPollBody): Promise<ResponsePoll>;
export declare function pollSnode({ swarm, namespaces }: {
    swarm: Swarm;
    namespaces: Array<RequestNamespace>;
}): Promise<{
    namespace: SnodeNamespaces;
    messages: RetrieveMessageItem[];
}[]>;
export declare const ERROR_CODE_NO_CONNECT = "ENETUNREACH: No network connection.";
export declare function retrieveNextMessages(targetNode: Snode, retrieveRequestsParams: RetrieveSubRequestType[], namespaces: Array<SnodeNamespaces>): Promise<RetrieveMessagesResultsBatched>;
