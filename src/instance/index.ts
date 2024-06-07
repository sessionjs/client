import type { Storage } from '../storage'
import { checkStorage } from '../storage/utils'
import { SessionValidationError, SessionValidationErrorCode } from '../errors/validation'
import { decode } from '../mnemonic'
import { getKeypairFromSeed, type Keypair } from '../keypairs'
import { Uint8ArrayToHex } from '../utils'
import { SessionRuntimeError, SessionRuntimeErrorCode } from '../errors/runtime'

export class Session {
  private mnemonic: string | undefined
  private keypair: Keypair | undefined
  private sessionID: string | undefined

  constructor(options: {
    storage: Storage
  }) {
    checkStorage(options.storage)
  }

  public setMnemonic(mnemonic: string) {
    mnemonic = mnemonic.trim()
    const words = mnemonic.split(' ')
    if (words.length !== 13) throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMnemonic, message: 'Invalid number of words in mnemonic provided in setMnemonic call. Expected 13 words, got ' + words.length })
    const seed = decode(mnemonic)
    this.keypair = getKeypairFromSeed(seed)
    this.sessionID = Uint8ArrayToHex(this.keypair.x25519.publicKey)
    this.mnemonic = mnemonic
  }

  public getMnemonic() {
    return this.mnemonic
  }

  public getSessionID(): string {
    if(this.sessionID === undefined) throw new SessionRuntimeError({ code: SessionRuntimeErrorCode.EmptyUser, message: 'Instance is not initialized; use setMnemonic first' })
    return this.sessionID
  }
}