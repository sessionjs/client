import { Session } from '@/index'
import { Poller } from '@/polling'
import { encode } from '@session.js/mnemonic'
import { generateSeedHex } from '@session.js/keypair'
import { ready } from '@/sodium'
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