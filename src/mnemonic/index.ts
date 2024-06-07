import { SessionValidationError, SessionValidationErrorCode } from '../errors/validation'
import englishWords from './english.json'
import { crc32 } from './utils'

export enum MnemonicWordset {
  english = 'english'
}

function getChecksumIndex(words: Array<string>, prefixLen: number) {
  let trimmedWords = ''

  for (let i = 0; i < words.length; i++) {
    trimmedWords += words[i].slice(0, prefixLen)
  }
  const checksum = crc32(trimmedWords)
  const index = checksum % words.length
  return index
}

/** Turns 13-words mnemonic phrase to seed's hex */
export function encode(str: string, wordsetName: MnemonicWordset = MnemonicWordset.english): string {
  const wordset = mnemonicLanguages[wordsetName]
  let out: string[] = []
  const n = wordset.words.length
  let strCopy = str
  for (let j = 0; j < strCopy.length; j += 8) {
    strCopy =
      strCopy.slice(0, j) + swapEndian4byte(strCopy.slice(j, j + 8)) + strCopy.slice(j + 8)
  }
  for (let i = 0; i < strCopy.length; i += 8) {
    const x = parseInt(strCopy.substr(i, 8), 16)
    const w1 = x % n
    const w2 = (Math.floor(x / n) + w1) % n
    const w3 = (Math.floor(Math.floor(x / n) / n) + w2) % n
    out = out.concat([wordset.words[w1], wordset.words[w2], wordset.words[w3]])
  }
  if (wordset.prefixLen > 0) {
    out.push(out[getChecksumIndex(out, wordset.prefixLen)])
  }
  return out.join(' ')
}

function swapEndian4byte(str: string) {
  if (str.length !== 8) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: `Invalid input length: ${str.length}` })
  }
  return str.slice(6, 8) + str.slice(4, 6) + str.slice(2, 4) + str.slice(0, 2)
}

/** Turns seed's hex to 13-words mnemonic phrase */
export function decode(str: string, wordsetName: MnemonicWordset = MnemonicWordset.english): string {
  const wordset = mnemonicLanguages[wordsetName]
  let out = ''
  const n = wordset.words.length
  const wlist = str.split(' ')
  let checksumWord = ''
  if (wlist.length < 12) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in provided string when decoding mnemonic. Expected 13 words, got less than that' })
  }
  if (
    (wordset.prefixLen === 0 && wlist.length % 3 !== 0) ||
    (wordset.prefixLen > 0 && wlist.length % 3 === 2)
  ) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in provided string when decoding mnemonic. Expected 13 words, got less than that' })
  }
  if (wordset.prefixLen > 0 && wlist.length % 3 === 0) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in provided string when decoding mnemonic. Missing last checksum word' })
  }
  if (wordset.prefixLen > 0) {
    checksumWord = wlist.pop() as string
  }
  for (let i = 0; i < wlist.length; i += 3) {
    let w1
    let w2
    let w3
    if (wordset.prefixLen === 0) {
      w1 = wordset.words.indexOf(wlist[i])
      w2 = wordset.words.indexOf(wlist[i + 1])
      w3 = wordset.words.indexOf(wlist[i + 2])
    } else {
      w1 = wordset.truncWords.indexOf(wlist[i].slice(0, wordset.prefixLen))
      w2 = wordset.truncWords.indexOf(wlist[i + 1].slice(0, wordset.prefixLen))
      w3 = wordset.truncWords.indexOf(wlist[i + 2].slice(0, wordset.prefixLen))
    }
    if (w1 === -1 || w2 === -1 || w3 === -1) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid word in mnemonic' })
    }

    const x = w1 + n * ((n - w1 + w2) % n) + n * n * ((n - w2 + w3) % n)
    if (x % n !== w1) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Couldn\'t decode mnemonic' })
    }
    out += swapEndian4byte(`0000000${x.toString(16)}`.slice(-8))
  }
  if (wordset.prefixLen > 0) {
    const index = getChecksumIndex(wlist, wordset.prefixLen)
    const expectedChecksumWord = wlist[index]
    if (
      expectedChecksumWord.slice(0, wordset.prefixLen) !== checksumWord.slice(0, wordset.prefixLen)
    ) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid checksum last word in mnemonic' })
    }
  }
  return out
}

export const addMnemonicLanguage = ({ prefixLen, words }: {
  prefixLen: number
  words: string[]
}) => {
  const truncWords: string[] = []
  if (prefixLen !== 0) {
    for (let j = 0; j < words.length; ++j) {
      truncWords.push(words[j].slice(0, prefixLen))
    }
  }
  return { prefixLen, words, truncWords }
}

export const mnemonicLanguages: { [key in MnemonicWordset]: { prefixLen: number, words: string[], truncWords: string[] } } = {
  english: addMnemonicLanguage({
    prefixLen: 3,
    words: englishWords,
  })
}