export enum SessionCryptoErrorCode {
  MessageEncryptionFailed = 'message_encryption_failed',
  MessageDecryptionFailed = 'message_decryption_failed',
  MessageVerificationFailed = 'message_verification_failed',
}

/** Generic error for cases where developer does something incorrectly */
export class SessionCryptoError extends Error {
  code: SessionCryptoErrorCode

  constructor({ code, message }: {
    code: SessionCryptoErrorCode,
    message: string
  }) {
    super(message)
    this.code = code
  }
}