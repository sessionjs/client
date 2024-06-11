import { type Storage } from '@session-oxen/storage';
import type { Network } from '@session-oxen/network';
import { type Keypair } from '../keypair';
import { RequestType } from '@session-oxen/network/request';
import type { Snode } from '@session-oxen/types/snode';
import type { Swarm } from '@session-oxen/types/swarm';
import { Poller } from '@session-oxen/polling';
import type { EventCallback, EventName } from '@session-oxen/instance/events';
export declare const forbiddenDisplayCharRegex: RegExp;
export declare class Session {
    private mnemonic;
    private keypair;
    private sessionID;
    private displayName;
    private network;
    private storage;
    private snodes;
    private ourSwarms;
    private ourSwarm;
    private pollers;
    isAuthorized: boolean;
    constructor(options?: {
        storage: Storage;
        network: Network;
    });
    /** Sets mnemonic for this instance, parses it to keypair. Throws SessionValidationError if mnemonic is invalid. Make sure you call this method only once, otherwise it will throw SessionRuntimeError */
    setMnemonic(mnemonic: string, displayName?: string): void;
    /** Returns mnemonic of this instance or undefined, if you haven't set it with setMnemonic yet */
    getMnemonic(): string | undefined;
    /** Returns Session ID of this instance. Throws if you haven't set user with setMnemonic yet */
    getSessionID(): string;
    /** Set display name of this instance */
    setDisplayName(displayName: string): void;
    /** Get cached display name of this instance. Note that it doesn't fetch display name from network, since display name comes in configuration message, so this method might return undefined */
    getDisplayName(): string | undefined;
    /**
     * Sends message to other Session ID
     * Might throw SessionFetchError if there is a connection issue
     * @param to — Session ID of the recipient
     * @returns `Promise<{ messageHash: string, syncMessageHash: string }>` — hashes (identifiers) of the messages sent (visible and sync message_
     */
    sendMessage({ to, text }: {
        to: string;
        text?: string;
    }): Promise<{
        messageHash: string;
        syncMessageHash: string;
    }>;
    getNowWithNetworkOffset(): number;
    request<Response, Body = any>({ type, body }: {
        type: RequestType;
        body: Body;
    }): Promise<Response>;
    getSwarmsFor(sessionID: string): Promise<Swarm[]>;
    getOurSwarm(): Promise<Swarm>;
    getSnodes(): Promise<Snode[]>;
    resolveONS(): Promise<void>;
    addPoller(poller: Poller): void;
    getKeypair(): Keypair | undefined;
    private events;
    on<E extends EventName>(eventName: E, callback: EventCallback<E>): void;
    off<E extends EventName>(eventName: E, callback: EventCallback<E>): void;
    addEventListener<E extends EventName>(eventName: E, callback: EventCallback<E>): void;
    removeEventListener<E extends EventName>(eventName: E, callback: EventCallback<E>): void;
}
