import { expect, test } from 'bun:test'
import { decode } from '../src/mnemonic'
import { getKeypairFromSeed } from '../src/keypairs'
import { Uint8ArrayToHex } from '../src/utils'
import { ready } from '../src/sodium'
await ready

const tests = [
  { 
    mnemonic: 'session session session session session session session session session session session session session',
    sessionID: '0512742fb4ac033a8a33f5776aa0e7e88f35f7af9f65dee31e57fbc7d6f8664b12'
  },
  { 
    mnemonic: 'love love love love love love love love love love love love love',
    sessionID: '053db493811f729da20289e31498b8fe2b28edc90358cd3ec11a6b12ac1b9fb818'
  },
  { 
    mnemonic: 'puffin luxury annoyed rustled memoir faxed smidgen puddle kiwi nylon utopia zinger kiwi',
    sessionID: '054830367d369d94605247999a375dbd0a0f65fdec5de1535612bcb6d4de452c69'
  },
  { 
    mnemonic: 'unknown number jukebox pledge lipstick sieve tumbling federal womanly outbreak tapestry gorilla sieve',
    sessionID: '05ab0badfc19ac18f71d7bb10d5ca5c92731aa301cc483169c691cf697b83e765a' // ab0ba 🅰️🅱️🅾️🅱️🅰️
  },
]

test('mnemonic -> session id correct', () => {
  tests.forEach(({ mnemonic, sessionID }) => {
    const seed = decode(mnemonic)
    const keypair = getKeypairFromSeed(seed)
    const generatedSessionID = Uint8ArrayToHex(keypair.x25519.publicKey)
    expect(generatedSessionID).toBe(sessionID)
  })
})