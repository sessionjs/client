import type { Storage } from './index'

export class InMemoryStorage implements Storage {
  storage: Map<string, string>

  constructor() {
    this.storage = new Map()
  }

  get(key: string) {
    return this.storage.get(key) ?? null
  }

  set(key: string, value: string) {
    this.storage.set(key, value)
  }

  delete(key: string) {
    this.storage.delete(key)
  }

  has(key: string) {
    return this.storage.has(key)
  }
}