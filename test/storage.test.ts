import { expect, test } from 'bun:test'
import { InMemoryStorage } from '../src/storage'

test('in-memory storage', () => {
  const storage = new InMemoryStorage()
  const randomKey = (Math.random() + 1).toString(36).substring(2)
  const randomValue = (Math.random() + 1).toString(36).substring(2)
  expect(storage.get(randomKey)).toBeNull()
  expect(storage.has(randomKey)).toBeFalse()
  expect(storage.set(randomKey, randomValue)).toBeUndefined()
  expect(storage.get(randomKey)).toBe(randomValue)
  expect(storage.has(randomKey)).toBeTrue()
  storage.delete(randomKey)
  expect(storage.has(randomKey)).toBeFalse()
  expect(storage.get(randomKey)).toBeNull()
})