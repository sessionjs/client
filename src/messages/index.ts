import { SignalService } from '@session.js/types/signal-bindings'
import type { EnvelopePlus } from '@session.js/types/envelope'

export function signalMessageToMessage({ hash, envelope, content }: {
  hash: string, 
  envelope: EnvelopePlus, 
  content: SignalService.Content
}): Message {
  const isGroup = envelope.type === SignalService.Envelope.Type.CLOSED_GROUP_MESSAGE
  let groupId: string | undefined
  let from: string
  if (isGroup) {
    groupId = envelope.source
    from = envelope.senderIdentity
  } else {
    from = envelope.source
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
    _envelope: envelope,
    _content: content
  }
}

export type PrivateMessage = {
  type: 'private';
}

export type ClosedGroupMessage = {
  type: 'group';
  groupId: string
}

export type Message = (PrivateMessage | ClosedGroupMessage) & {
  id: string;
  from: string;
  text?: string;
  _envelope: EnvelopePlus;
  _content: SignalService.Content;
}