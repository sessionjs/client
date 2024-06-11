import { Session } from '@session-oxen/index'
import { Poller } from '@session-oxen/polling'
import { encode } from '@session-oxen/mnemonic'
import { generateSeedHex } from '@session-oxen/keypair'
import { ready } from '@session-oxen/sodium'
await ready

const mnemonic = encode(generateSeedHex())

const session = new Session()
session.setMnemonic(mnemonic)
console.log('Try to send message to', session.getSessionID())
console.log('Or log in in Session client and send someone message from this Session ID with')
console.log('this mnemonic:', mnemonic)

const poller = new Poller()
session.addPoller(poller)

session.on('message', message => {
  console.log('Received new message!',
    'From:', message.from,
    'Is from closed group:', message.type === 'group',
    'Group id:', message.type === 'group' ? message.groupId : 'Not group',
    'Text:', message.text ?? 'No text',
  )
})