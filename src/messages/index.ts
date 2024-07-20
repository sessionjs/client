import { SignalService } from '@session.js/types/signal-bindings'
import type { EnvelopePlus } from '@session.js/types/envelope'

export type PrivateMessage = {
  type: 'private';
}

export type ClosedGroupMessage = {
  type: 'group';
  groupId: string
}

export type MessageAttachment = {
  id: string,
  caption?: string,
  metadata: {
    width?: number,
    height?: number,
    contentType?: string
  },
  /** Size of attached file in bytes */
  size?: number,
  /** Filename including extension */
  name?: string
  /** For internal decryption purposes */
  _key?: Uint8Array
  /** For internal decryption purposes */
  _digest?: Uint8Array
}

export type Message = (PrivateMessage | ClosedGroupMessage) & {
  id: string
  from: string
  text?: string
  attachments: MessageAttachment[]
  getEnvelope: () => EnvelopePlus
  getContent: () => SignalService.Content
  timestamp: number
}

type Content = {
  hash: string
  envelope: EnvelopePlus
  content: SignalService.Content
}

export function mapDataMessage({ hash, envelope, content }: Content): Message {
  const isGroup = envelope.type === SignalService.Envelope.Type.CLOSED_GROUP_MESSAGE
  let groupId: string | undefined
  let from: string
  if (isGroup) {
    groupId = envelope.source
    from = envelope.senderIdentity
  } else {
    from = envelope.source
  }
  let timestamp = content.dataMessage!.timestamp
  if (timestamp === null || timestamp === undefined) {
    timestamp = 0
  } else {
    if(typeof timestamp !== 'number') {
      timestamp = timestamp.toNumber()
    }
  }
  return {
    id: hash,
    ...(isGroup ? {
      type: 'group',
      groupId: groupId as string
    } : {
      type: 'private'
    }),
    from,
    ...(typeof content.dataMessage?.body === 'string' && { text: content.dataMessage.body }),
    attachments: content.dataMessage?.attachments ? parseAttachments(content.dataMessage.attachments) : [],
    getEnvelope: () => envelope,
    getContent: () => content,
    timestamp
  }
}

export function parseAttachments(attachments: SignalService.IAttachmentPointer[]): Message['attachments'] {
  return attachments.map(attachment => ({
    id: attachment.id.toString(),
    ...(attachment.caption && { caption: attachment.caption }),
    metadata: {
      ...(typeof attachment.width === 'number' && { width: attachment.width }),
      ...(typeof attachment.height === 'number' && { height: attachment.height }),
      ...(attachment.contentType && { contentType: attachment.contentType }),
    },
    ...(typeof attachment.size ==='number' && { size: attachment.size }),
    ...(attachment.fileName && { name: attachment.fileName }),
    ...(attachment.key && { _key: attachment.key }),
    ...(attachment.digest && { _digest: attachment.digest })
  }))
}

export type MessageDeleted = {
  /** Timestamp of deleted message sent in that message constructor. Lookup message by timestamp in saved messages */
  timestamp: number,
  /** Sender of message that deleted it */
  from: string
}
export function mapUnsendMessage({ content }: Content): MessageDeleted {
  let timestamp = content.unsendMessage!.timestamp
  if(typeof timestamp !== 'number') {
    timestamp = timestamp.toNumber()
  }
  return {
    timestamp,
    from: content.unsendMessage!.author
  }
}

export type MessageReadEvent = {
  /** Timestamp of read message sent in this message constructor. Lookup message by timestamp among locally saved messages */
  timestamp: number,
  /** Timestamp when recipient of message read it */
  // readAt: number, TODO: ReadReceiptMessage has timestamp property, but it does not exist in Signal bindings
}
export function mapReceiptMessage({ content }: Content): MessageReadEvent[] {
  const timestamps = content.receiptMessage!.timestamp
  if (timestamps === null || timestamps === undefined) {
    return []
  }
  const timestampsNumbers = timestamps.map(t => {
    if(typeof t !== 'number') {
      return t.toNumber()
    }
    return t
  })
  return timestampsNumbers.map(t => ({ timestamp: t }))
}

export type MessageTypingIndicator = {
  /** If true, you should countdown from 20 and then treat it like recipient stopped typing */
  isTyping: boolean
  conversation: string
}
export function mapTypingMessage({ content, envelope }: Content): MessageTypingIndicator {
  const isTyping = content.typingMessage!.action === SignalService.TypingMessage.Action.STARTED
  return {
    isTyping,
    conversation: envelope.source,
  }
}