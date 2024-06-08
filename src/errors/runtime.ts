export enum SessionRuntimeErrorCode {
  EmptyUser = 'empty_user',
  Generic = 'generic',
  NoSwarmsAvailable = 'no_swarms_available',
}

/** Generic error for cases where developer does something incorrectly */
export class SessionRuntimeError extends Error {
  code: SessionRuntimeErrorCode

  constructor({ code, message }: {
    code: SessionRuntimeErrorCode,
    message: string
  }) {
    super(message)
    this.code = code
  }
}