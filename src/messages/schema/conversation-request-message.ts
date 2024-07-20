import { SignalService } from '@session.js/types/signal-bindings'
import { ContentMessage, type MessageParams } from '../signal-message'
import { serializeProfile, type Profile } from '@/profile'

export interface MessageRequestResponseParams extends MessageParams {
  profile?: Profile
}

// Request is always Approved
export class MessageRequestResponse extends ContentMessage {
  private readonly profileKey?: Uint8Array
  private readonly profile?: SignalService.DataMessage.ILokiProfile

  constructor(params: MessageRequestResponseParams) {
    super({
      timestamp: params.timestamp,
    } as MessageRequestResponseParams)

    if (params.profile) {
      const profile = serializeProfile(params.profile)
      this.profile = profile.lokiProfile
      this.profileKey = profile.profileKey
    }
  }

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      messageRequestResponse: this.messageRequestResponseProto(),
    })
  }

  public messageRequestResponseProto(): SignalService.MessageRequestResponse {
    return new SignalService.MessageRequestResponse({
      isApproved: true,
      profileKey: this.profileKey?.length ? this.profileKey : undefined,
      profile: this.profile,
    })
  }
}
