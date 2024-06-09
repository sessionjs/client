export enum SessionRuntimeErrorCode {
  EmptyUser = 'empty_user',
  Generic = 'generic',
  NoSwarmsAvailable = 'no_swarms_available',
  MultipleInstancesNotAllowed = 'multiple_instances_not_allowed',
  NoInstancePolling = 'no_instance_polling',
  InstanceAlreadyAuthorized = 'instance_already_authorized',
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