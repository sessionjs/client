export declare const reactionLimit: number;
export declare class RecentReactions {
    items: Array<string>;
    constructor(items: Array<string>);
    size(): number;
    push(item: string): void;
    pop(): string | undefined;
    swap(index: number): void;
}
export declare enum Action {
    REACT = 0,
    REMOVE = 1
}
export interface Reaction {
    id: number;
    author: string;
    emoji: string;
    action: Action;
}
export type ReactionList = Record<string, {
    count: number;
    index: number;
    senders: Array<string>;
    you: boolean;
}>;
export type SortedReactionList = Array<[
    string,
    {
        count: number;
        index: number;
        senders: Array<string>;
        you?: boolean;
    }
]>;
export interface OpenGroupReaction {
    index: number;
    count: number;
    you: boolean;
    reactors: Array<string>;
}
export type OpenGroupReactionList = Record<string, OpenGroupReaction>;
export interface OpenGroupReactionResponse {
    added?: boolean;
    removed?: boolean;
    seqno: number;
}
