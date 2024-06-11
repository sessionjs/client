import type { SnodeNamespaces } from '@session-oxen/types/namespaces';
import type { Snode } from '@session-oxen/types/snode';
import type { RetrieveMessageItem } from '@session-oxen/types/snode-retrieve';
import type { Swarm } from '@session-oxen/types/swarm';
export type ResponseStore = {
    hash: string;
};
export type ResponseGetSnodes = {
    snodes: Snode[];
};
export type ResponseGetSwarms = {
    swarms: Swarm[];
};
export type ResponsePoll = {
    messages: {
        namespace: SnodeNamespaces;
        messages: RetrieveMessageItem[];
    }[];
};
