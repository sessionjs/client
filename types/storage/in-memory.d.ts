import type { Storage } from './index';
export declare class InMemoryStorage implements Storage {
    storage: Map<string, string>;
    constructor();
    get(key: string): string | null;
    set(key: string, value: string): void;
    delete(key: string): void;
    has(key: string): boolean;
}
