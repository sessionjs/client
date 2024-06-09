export { InMemoryStorage } from './in-memory'

export interface Storage {
  get(key: string): string | null | Promise<string | null>
  set(key: string, value: string): void | Promise<void>
  delete(key: string): void | Promise<void>
  has(key: string): boolean | Promise<boolean>
}

export enum StorageKeys {
  LastHashes = 'last_hashes',
}