import { expect, test } from 'bun:test'
import { Session } from '../src'
import { Poller } from '../src/polling'
import { ready } from '../src/sodium'
import type { SignalService } from '@/signal-service'
await ready

test('polling messages', async () => {
  const mnemonic = 'love love love love love love love love love love love love love'
  
  const session = new Session()
  session.setMnemonic(mnemonic, 'love devio')

  const poller = new Poller({ interval: null })
  session.addPoller(poller)

  const [messages1, messages2] = await Promise.all([
    poller.poll(),
    new Promise<SignalService.Content[]>(resolve => session.on('messagesReceived', messages => resolve(messages)))
  ])
  expect(messages1).toBeArray()
  expect(messages2).toBeArray()
})