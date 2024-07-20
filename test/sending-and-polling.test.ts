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

const randomImageBuffer = await fetch('https://picsum.photos/200/300')
  .then(response => response.arrayBuffer())
const randomImage = new File([new Uint8Array(randomImageBuffer)], 'random-image.jpg', { type: 'image/jpeg' })

let messageHash: string, timestamp: number

test('sending chat message to the Session user', async () => {
  const session = new Session()
  session.setMnemonic(encode(generateSeedHex()))
  const response = await session.sendMessage({ 
    to: sessionID,
    text: randomText,
    attachments: [randomImage]
  })
  messageHash = response.messageHash
  timestamp = response.timestamp
  expect(messageHash).toBeString()
  expect(response.syncMessageHash).toBeString()
})

test('polling chat messages', async () => {
  const [messages1, message] = await Promise.all([
    poller.poll(),
    new Promise<Message>(resolve => session.on('message', message => resolve(message)))
  ])
  expect(messages1).toBeArray()
  expect(message.id).toBeString()
  expect(message.text).toBe(randomText)
  expect(message.attachments).toBeArray()
  expect(message.attachments).toHaveLength(1)
  
  const file = message.attachments![0]
  expect(file.id).toMatch(/^\d+$/)
  expect(file.size).toBe(randomImage.size)
  expect(file.name).toBe(randomImage.name)
  expect(file.metadata.contentType).toBe(randomImage.type)

  const image = await session.getFile(file)
  expect(image.type).toBe(randomImage.type)
  expect(image.name).toBe(randomImage.name)
  expect(image.size).toBe(randomImage.size)
  
  const imageBuffer = new Uint8Array(await image.arrayBuffer())
  const randomImageBuffer = new Uint8Array(await randomImage.arrayBuffer())
  expect(Buffer.compare(imageBuffer, randomImageBuffer)).toBe(0)
})

test('deleting message', async () => {
  await session.deleteMessage({ to: sessionID, timestamp, hash: messageHash })
  const messageDeletedPromise = new Promise<{ timestamp: number, from: string }>(resolve => session.on('messageDeleted', resolve))
  await poller.poll()
  const message = await messageDeletedPromise
  expect(message.timestamp).toBe(timestamp)
})