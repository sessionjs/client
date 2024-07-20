import { SignalService } from '@session.js/types/signal-bindings'
import { ContentMessage, type MessageParams } from '../signal-message'

interface UnsendMessageParams extends MessageParams {
  timestamp: number;
  author: string;
}

export class UnsendMessage extends ContentMessage {
  private readonly author: string

  constructor(params: UnsendMessageParams) {
    super({ timestamp: params.timestamp, author: params.author } as MessageParams)
    this.author = params.author
  }

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      unsendMessage: this.unsendProto(),
    })
  }

  public unsendProto(): SignalService.Unsend {
    return new SignalService.Unsend({
      timestamp: this.timestamp,
      author: this.author,
    })
  }
}
