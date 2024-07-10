import { Session } from '@/index'
import { encode } from '@session.js/mnemonic'
import { generateSeedHex } from '@session.js/keypair'
import { ready } from '@/sodium'
await ready

// Edit `input_your_session_id_here` below to your session ID and run this script to receive nice image!
const SEND_IMAGE_TO = 'input_your_session_id_here'

const mnemonic = encode(generateSeedHex())
const session = new Session()
session.setMnemonic(mnemonic)
const image = await fetch('https://picsum.photos/100/100').then(res => res.arrayBuffer())
const file = new File([image], 'image.jpg', { type: 'image/jpeg' })
session.sendMessage({ to: SEND_IMAGE_TO, text: 'Here is your image!', attachments: [file] })