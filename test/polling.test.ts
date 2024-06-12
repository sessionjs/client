import { expect, test } from 'bun:test'
import { Session } from '@/index'
import { Poller } from '@/polling'
import { ready } from '@/sodium'
import type { Message } from '@/messages'
await ready

test('polling messages', async () => {
  const mnemonic = 'love love love love love love love love love love love love love'
  
  const session = new Session()
  session.setMnemonic(mnemonic, 'love devio')

  const poller = new Poller({ interval: null })
  session.addPoller(poller)

  const [messages1, message] = await Promise.all([
    poller.poll(),
    new Promise<Message>(resolve => session.on('message', message => resolve(message)))
  ])
  expect(messages1).toBeArray()
  expect(message.id).toBeString()
})