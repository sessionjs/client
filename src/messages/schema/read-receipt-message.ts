import { SignalService } from '@session.js/types/signal-bindings'
import { ContentMessage, type MessageParams } from '../signal-message'

interface ReceiptMessageParams extends MessageParams {
  timestamps: Array<number>;
}
export abstract class ReceiptMessage extends ContentMessage {
  public readonly timestamps: Array<number>

  constructor({ timestamp, identifier, timestamps }: ReceiptMessageParams) {
    super({ timestamp, identifier })
    this.timestamps = timestamps
  }

  public abstract getReceiptType(): SignalService.ReceiptMessage.Type;

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      receiptMessage: this.receiptProto(),
    })
  }

  protected receiptProto(): SignalService.ReceiptMessage {
    return new SignalService.ReceiptMessage({
      type: this.getReceiptType(),
      timestamp: this.timestamps,
    })
  }
}

export class ReadReceiptMessage extends ReceiptMessage {
  public getReceiptType(): SignalService.ReceiptMessage.Type {
    return SignalService.ReceiptMessage.Type.READ
  }
}
