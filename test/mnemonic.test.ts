import { expect, test } from 'bun:test'
import { encode, decode } from '../src/mnemonic'

test('encoding mnemonic', () => {
  const encodedMnemonic = encode('39038c8988db02c1af44e8c847bd9713')
  expect(encodedMnemonic).toBe('puffin luxury annoyed rustled memoir faxed smidgen puddle kiwi nylon utopia zinger kiwi')
})

test('decoding mnemonic', () => {
  const decodedMnemonic = decode('puffin luxury annoyed rustled memoir faxed smidgen puddle kiwi nylon utopia zinger kiwi')
  expect(decodedMnemonic).toBe('39038c8988db02c1af44e8c847bd9713')
})