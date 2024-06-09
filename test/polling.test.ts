import { expect, test } from 'bun:test'
import { Session } from '../src'
import { Poller } from '../src/polling'
import { ready } from '../src/sodium'
await ready

test('polling messages', async () => {
  const mnemonic = 'love love love love love love love love love love love love love'
  
  const session = new Session()
  session.setMnemonic(mnemonic, 'love devio')

  const poller = new Poller({ interval: null })
  session.addPoller(poller)

  const messages = await poller.poll()
  console.log(messages)

  expect(messages).toBeArray()
})


