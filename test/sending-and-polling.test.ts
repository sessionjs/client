import { expect, test } from 'bun:test'
import { Session } from '@/index'
import { Poller } from '@/polling'
import type { Message } from '@/messages'
import { encode } from '@session.js/mnemonic'
import { generateSeedHex } from '@session.js/keypair'
import { ready } from '@/index'
await ready

const session = new Session()
session.setMnemonic(encode(generateSeedHex()))
const sessionID = session.getSessionID()

const poller = new Poller({ interval: null })
session.addPoller(poller)

const randomText = (Math.random() + 1).toString(36).substring(2)

test('sending text message to the Session user', async () => {
  const session = new Session()
  session.setMnemonic(encode(generateSeedHex()))
  const { messageHash, syncMessageHash } = await session.sendMessage({ to: sessionID, text: randomText })
  expect(messageHash).toBeString()
  expect(syncMessageHash).toBeString()
})

test('polling text messages', async () => {
  const [messages1, message] = await Promise.all([
    poller.poll(),
    new Promise<Message>(resolve => session.on('message', message => resolve(message)))
  ])
  expect(messages1).toBeArray()
  expect(message.id).toBeString()
  expect(message.text).toBe(randomText)
})