// NOTE this must match Content.ExpirationType in the protobuf
export type DisappearingMessageType = (typeof DisappearingMessageMode)[number];
export const DisappearingMessageMode = ['unknown', 'deleteAfterRead', 'deleteAfterSend'] as const