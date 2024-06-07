export enum SessionValidationErrorCode {
  InvalidMnemonic = 'invalid_mnemonic',
  InvalidDisplayName = 'invalid_display_name',
  InvalidSessionID = 'invalid_session_id',
}

/** Validation error, indicating that the developer provided invalid input */
export class SessionValidationError extends Error {
  code: SessionValidationErrorCode

  constructor({ code, message }: {
    code: SessionValidationErrorCode, 
    message: string
  }) {
    super(message)
    this.code = code
  }
}