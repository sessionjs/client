export enum SessionFetchErrorCode {
  RetryWithOtherNode421Error = 'retry_with_other_node_421_error',
  NoSnodesAvailable = 'no_snodes_available',
  NoSwarmsAvailable = 'no_swarms_available',
  FetchFailed = 'fetch_failed',
  InvalidResponse = 'invalid_response',
  PollingFailed = 'polling_failed',
}

/** Generic error for cases where developer does something incorrectly */
export class SessionFetchError extends Error {
  code: SessionFetchErrorCode

  constructor({ code, message }: {
    code: SessionFetchErrorCode,
    message: string
  }) {
    super(message)
    this.code = code
  }
}