import { SignalService } from '@session.js/types/signal-bindings'
import type { EnvelopePlus } from '@session.js/types/envelope'
import { deserializeProfile, type Profile } from '@/profile'
import { getPlaceholderDisplayName } from '@/utils'

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
  author: Profile
  text?: string
  attachments: MessageAttachment[]
  replyToMessage?: {
    timestamp: number
    author: string
    text?: string
    attachments?: QuotedAttachment[]
  }
  timestamp: number
  getEnvelope: () => EnvelopePlus
  getContent: () => SignalService.Content
  getReplyToMessage: () => Message['replyToMessage']
}

export type SyncMessage = Omit<Message, 'from'> & { to: string }

export type QuotedAttachment = {
  contentType?: string
  fileName?: string
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
  let timestamp = envelope.timestamp
  if(typeof timestamp !== 'number') {
    timestamp = timestamp.toNumber()
  }
  const attachments = content.dataMessage?.attachments ? parseAttachments(content.dataMessage.attachments) : []  
  const author = deserializeProfile({
    lokiProfile: content.dataMessage!.profile ?? undefined,
    profileKey: content.dataMessage!.profileKey ?? undefined
  })
  author.displayName ||= getPlaceholderDisplayName(envelope.source)
  return {
    id: hash,
    ...(isGroup ? {
      type: 'group',
      groupId: groupId as string
    } : {
      type: 'private'
    }),
    from,
    author,
    ...(content.dataMessage!.syncTarget && {
      to: content.dataMessage!.syncTarget
    }),
    ...(typeof content.dataMessage?.body === 'string' && { text: content.dataMessage.body }),
    attachments,
    ...(content.dataMessage?.quote && { replyToMessage: parseQuote(content.dataMessage.quote) }),
    timestamp,
    getEnvelope: () => envelope,
    getContent: () => content,
    getReplyToMessage: () => ({
      author: from,
      timestamp: timestamp,
      attachments: attachments.map(a => ({
        ...(a.metadata.contentType && { contentType: a.metadata.contentType }),
        ...(a.name && { fileName: a.name })
      })),
      ...(typeof content.dataMessage?.body === 'string' && { text: content.dataMessage?.body })
    })
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

export function parseQuote(quote: SignalService.DataMessage.IQuote): Message['replyToMessage'] {
  let id = quote.id
  if(typeof id !== 'number') {
    id = id.toNumber()
  }
  return {
    timestamp: id,
    author: quote.author,
    ...(quote.text && { text: quote.text }),
    ...(quote.attachments && { attachments: quote.attachments.map(a => ({
      ...(a.contentType && { contentType: a.contentType }),
      ...(a.fileName && { fileName: a.fileName })
    })) }),
  }
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
  /** Session ID of conversation where message was read */
  conversation: string
}
export function mapReceiptMessage({ content, envelope }: Content): MessageReadEvent[] {
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
  return timestampsNumbers.map(t => ({ timestamp: t, conversation: envelope.source }))
}

export type MessageTypingIndicator = {
  /** If true, you should countdown from 20 and then treat it like recipient stopped typing */
  isTyping: boolean
  /** Session ID of conversation where typing indicator appeared or disappeared */
  conversation: string
}
export function mapTypingMessage({ content, envelope }: Content): MessageTypingIndicator {
  const isTyping = content.typingMessage!.action === SignalService.TypingMessage.Action.STARTED
  return {
    isTyping,
    conversation: envelope.source,
  }
}

export type ScreenshotTakenNotification = {
  /** Timestamp when screenshot was taken */
  timestamp: number
  /** Session ID of conversation where notification appeared */
  conversation: string
}
export function mapScreenshotTakenMessage({ content, envelope }: Content): ScreenshotTakenNotification {
  let timestamp = content.dataExtractionNotification!.timestamp
  if(timestamp === null || timestamp === undefined) {
    timestamp = 0
  } else {
    if(typeof timestamp !== 'number') {
      timestamp = timestamp.toNumber()
    }
  }
  return {
    timestamp,
    conversation: envelope.source
  }
}

export type MediaSavedNotification = {
  /** Message's timestamp which has attachment that was downloaded */
  timestamp: number,
  /** Session ID of conversation where notification appeared */
  conversation: string
}
export function mapMediaSavedMessage({ content, envelope }: Content): MediaSavedNotification {
  let timestamp = content.dataExtractionNotification!.timestamp
  if(timestamp === null || timestamp === undefined) {
    timestamp = 0
  } else {
    if(typeof timestamp !== 'number') {
      timestamp = timestamp.toNumber()
    }
  }
  return {
    timestamp,
    conversation: envelope.source
  }
}

export type MessageRequestResponse = {
  profile: Profile
  conversation: string
}
export function mapMessageRequestResponseMessage({ content, envelope }: Content): MessageRequestResponse {
  const profile = deserializeProfile({
    lokiProfile: content.messageRequestResponse!.profile ?? undefined,
    profileKey: content.messageRequestResponse!.profileKey ?? undefined
  })
  profile.displayName ||= getPlaceholderDisplayName(envelope.source)
  return {
    profile,
    conversation: envelope.source
  }
}

export type CallMessage = {
  uuid: string
  type: SignalService.CallMessage.Type
  from: string
}
export function mapCallMessage({ content, envelope }: Content): CallMessage {
  return {
    uuid: content.callMessage!.uuid,
    type: content.callMessage!.type,
    from: envelope.source
  }
}

export type ReactionMessage = {
  messageTimestamp: number
  messageAuthor: string
  reactionFrom: string
  /** Emoji as string. Any unicode character(s) may be in this field, length is practically unlimited, validation is not performed by the @session.js/client library. You should probably only display the reaction, if it's a single valid emoji */
  emoji: string
}
export function mapReactionMessage({ content, envelope }: Content): ReactionMessage | null {
  let messageTimestamp = content.dataMessage?.reaction!.id
  if (messageTimestamp === null || messageTimestamp === undefined) return null
  const emoji = content.dataMessage?.reaction?.emoji
  if (!emoji) return null
  const author = content.dataMessage?.reaction?.author
  if (!author) return null
  if(typeof messageTimestamp !== 'number') {
    messageTimestamp = messageTimestamp.toNumber()
  }
  return {
    messageTimestamp,
    messageAuthor: author,
    emoji,
    reactionFrom: envelope.source
  }
}