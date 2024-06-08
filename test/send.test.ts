import { expect, test } from 'bun:test'
import { Session } from '@/instance'
import { ready } from '@/sodium'
await ready

test('send message to the Session user', async () => {
  const session = new Session()
  session.setMnemonic('love love love love love love love love love love love love love')
  const { messageHash, syncMessageHash } = await session.sendMessage({ to: '054830367d369d94605247999a375dbd0a0f65fdec5de1535612bcb6d4de452c69', text: 'Hello world' })
  expect(messageHash).toBeString()
  expect(syncMessageHash).toBeString()
})