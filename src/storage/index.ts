export { InMemoryStorage } from './in-memory'

export interface Storage {
  get(key: string): string | null | Promise<string | null>
  set(key: string, value: string): void | Promise<void>
}