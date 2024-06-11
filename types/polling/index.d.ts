import { Session } from '@session-oxen/instance';
import { SignalService } from '@session-oxen/signal-service';
import { type Storage } from '@session-oxen/storage';
import type { EnvelopePlus } from '@session-oxen/types/envelope';
import { SnodeNamespaces } from '@session-oxen/types/namespaces';
type InstanceMethodsForPoller = {
    onMessagesReceived: (messages: {
        hash: string;
        envelope: EnvelopePlus;
        content: SignalService.Content;
    }[]) => void;
    updateLastHashes: (hashes: {
        namespace: SnodeNamespaces;
        lastHash: string;
    }[]) => void;
    storage: Storage;
};
export declare class Poller {
    private interval;
    private polling;
    private instance;
    private methods;
    private intervalId;
    private namespaces;
    /**
     * New poller of messages for Session instance. Starts polling as soon as attached to instance of interval is not null, call stopPolling to stop automatic polling and startPolling to resume.
     * @param interval — Polling interval in milliseconds, must either be integer > 0. Set to null to disable automatic polling. Default is 3000ms.
     */
    constructor(options?: {
        interval?: number | null;
        namespaces?: Set<SnodeNamespaces>;
    });
    /** @private */
    _attachedToInstance(instance: Session, methods: InstanceMethodsForPoller): void;
    /** Manually resumes auto-polling. Does nothing if `interval` of Poller is null */
    startPolling(): void;
    /** Stops auto-polling. Does nothing if `interval` of Poller is null */
    stopPolling(): void;
    setInterval(interval: number | null): void;
    /** Return if this Poller is set to poll automatically */
    isPolling(): boolean;
    private getLastHashes;
    /** Trigger manual messages polling */
    poll(): Promise<{
        hash: string;
        envelope: EnvelopePlus;
        content: SignalService.Content;
    }[]>;
}
export {};
