import type { Storage } from './index'
import fs from 'fs'

export class PersistantKeyvalStorage implements Storage {
  storage: Map<string, string>
  _changes = false

  constructor(options?: {
    filePath?: string
  }) {
    const filePath = options?.filePath ?? 'storage.db'
    fs.existsSync(filePath) || fs.writeFileSync(filePath, '')
    fs.accessSync(filePath, fs.constants.F_OK | fs.constants.W_OK | fs.constants.R_OK)
    const serialized = fs.readFileSync(filePath, 'utf8')
    const lines = serialized.split('\n').filter(Boolean)
    this.storage = new Map()
    for(const line of lines) {
      const index = line.indexOf('=')
      if (index === -1) continue
      const key = decodeURIComponent(line.slice(0, index))
      const value = decodeURIComponent(line.slice(index + 1).trimEnd())
      this.storage.set(key, value)
    }
    setInterval(() => persist(), 1000)
    process.on('SIGINT', async () => {
      await persist()
      process.exit()
    })
    const persist = async () => {
      if (this._changes) {
        const deserialized = Array.from(this.storage.entries())
        const serialized = deserialized.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('\n')
        await fs.promises.writeFile(filePath, serialized, 'utf8')
      }
    }
  }

  get(key: string) {
    return this.storage.get(key) ?? null
  }

  set(key: string, value: string) {
    this.storage.set(key, value)
    this._changes = true
  }

  delete(key: string) {
    this.storage.delete(key)
    this._changes = true
  }

  has(key: string) {
    return this.storage.has(key)
  }
}