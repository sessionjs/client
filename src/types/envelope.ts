import type { SignalService } from '@/signal-service'

export interface EnvelopePlus extends Omit<SignalService.Envelope, 'toJSON'> {
  senderIdentity: string;
  receivedAt: number;
  id: string;
}
