import ByteBuffer from 'bytebuffer'

// 👇 Credit: https://stackoverflow.com/a/69585881 👇

const HEX_STRINGS = '0123456789abcdef'
const MAP_HEX: { [k: string]: number } = {
  0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6,
  7: 7, 8: 8, 9: 9, a: 10, b: 11, c: 12, d: 13,
  e: 14, f: 15, A: 10, B: 11, C: 12, D: 13,
  E: 14, F: 15
}

export function Uint8ArrayToHex(bytes: Uint8Array): string {
  return Array.from(bytes || [])
    .map((b) => HEX_STRINGS[b >> 4] + HEX_STRINGS[b & 15])
    .join('')
}

export function hexToUint8Array(hexString: string) {
  const bytes = new Uint8Array(Math.floor((hexString || '').length / 2))
  let i
  for (i = 0; i < bytes.length; i++) {
    const a = MAP_HEX[hexString[i * 2]]
    const b = MAP_HEX[hexString[i * 2 + 1]]
    if (a === undefined || b === undefined) {
      break
    }
    bytes[i] = (a << 4) | b
  }
  return i === bytes.length ? bytes : bytes.slice(0, i)
}

// 👆 Credit: https://stackoverflow.com/a/69585881 👆

export const concatUInt8Array = (...args: Array<Uint8Array>): Uint8Array => {
  const totalLength = args.reduce((acc, current) => acc + current.length, 0)

  const concatted = new Uint8Array(totalLength)
  let currentIndex = 0
  args.forEach(arr => {
    concatted.set(arr, currentIndex)
    currentIndex += arr.length
  })

  return concatted
}

export const removePrefixIfNeeded = (sessionID: string): string => {
  if (sessionID.startsWith('05')) {
    return sessionID.slice(2)
  }
  return sessionID
}

export const isHex = (str: string): boolean => {
  return /^([0-9a-f]{2})+$/i.test(str)
}

export function Uint8ArrayToBase64(uint8array: Uint8Array): string {
  return ByteBuffer.wrap(uint8array).toString('base64')
}