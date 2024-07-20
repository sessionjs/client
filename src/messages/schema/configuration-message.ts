
/**
 * 
 * THIS LEGACY PIECE OF SHIT IS DEPRECATED
 * DO NOT USE IT, USE SharedConfigMessage!!!
 * 
 */

import { SignalService } from '@session.js/types/signal-bindings'
import { ContentMessage, type MessageParams } from '../signal-message'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import { hexToUint8Array } from '@/utils'

interface ConfigurationMessageParams extends MessageParams {
  activeClosedGroups: Array<ConfigurationMessageClosedGroup>;
  activeOpenGroups: Array<string>;
  displayName: string;
  profilePicture?: string;
  profileKey?: Uint8Array;
  contacts: Array<ConfigurationMessageContact>;
}

export class ConfigurationMessage extends ContentMessage {
  public readonly activeClosedGroups: Array<ConfigurationMessageClosedGroup>
  public readonly activeOpenGroups: Array<string>
  public readonly displayName: string
  public readonly profilePicture?: string
  public readonly profileKey?: Uint8Array
  public readonly contacts: Array<ConfigurationMessageContact>

  constructor(params: ConfigurationMessageParams) {
    super({ timestamp: params.timestamp, identifier: params.identifier })
    this.activeClosedGroups = params.activeClosedGroups
    this.activeOpenGroups = params.activeOpenGroups
    this.displayName = params.displayName
    this.profilePicture = params.profilePicture
    this.profileKey = params.profileKey
    this.contacts = params.contacts

    if (!this.activeClosedGroups) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'closed group must be set' })
    }

    if (!this.activeOpenGroups) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'open group must be set' })
    }

    if (!this.displayName || !this.displayName?.length) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'displayName must be set' })
    }

    if (this.profilePicture && typeof this.profilePicture !== 'string') {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'profilePicture set but not an Uin8Array' })
    }

    if (this.profileKey && !(this.profileKey instanceof Uint8Array)) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'profileKey set but not an Uin8Array' })
    }

    if (!this.contacts) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'contacts must be set' })
    }
  }

  public contentProto(): SignalService.Content {
    return new SignalService.Content({
      configurationMessage: this.configurationProto(),
    })
  }

  protected configurationProto(): SignalService.ConfigurationMessage {
    return new SignalService.ConfigurationMessage({
      closedGroups: this.mapClosedGroupsObjectToProto(this.activeClosedGroups),
      openGroups: this.activeOpenGroups,
      displayName: this.displayName,
      profilePicture: this.profilePicture,
      profileKey: this.profileKey,
      contacts: this.mapContactsObjectToProto(this.contacts),
    })
  }

  private mapClosedGroupsObjectToProto(
    closedGroups: Array<ConfigurationMessageClosedGroup>
  ): Array<SignalService.ConfigurationMessage.ClosedGroup> {
    return (closedGroups || []).map(m => m.toProto())
  }

  private mapContactsObjectToProto(
    contacts: Array<ConfigurationMessageContact>
  ): Array<SignalService.ConfigurationMessage.Contact> {
    return (contacts || []).map(m => m.toProto())
  }
}

export class ConfigurationMessageContact {
  public publicKey: Uint8Array
  public displayName: string
  public profilePictureURL?: string
  public profileKey?: Uint8Array
  public isApproved?: boolean
  public isBlocked?: boolean
  public didApproveMe?: boolean

  public constructor({
    publicKey,
    displayName,
    profilePictureURL,
    profileKey,
    isApproved,
    isBlocked,
    didApproveMe,
  }: {
    publicKey: Uint8Array;
    displayName: string;
    profilePictureURL?: string;
    profileKey?: Uint8Array;
    isApproved?: boolean;
    isBlocked?: boolean;
    didApproveMe?: boolean;
  }) {
    this.publicKey = publicKey
    this.displayName = displayName
    this.profilePictureURL = profilePictureURL
    this.profileKey = profileKey
    this.isApproved = isApproved
    this.isBlocked = isBlocked
    this.didApproveMe = didApproveMe

    if (this.displayName?.length === 0) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'displayName must be set or undefined' })
    }

    if (this.profilePictureURL !== undefined && this.profilePictureURL?.length === 0) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'profilePictureURL must either undefined or not empty' })
    }
    if (this.profileKey !== undefined && this.profileKey?.length === 0) {
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidOptions, message: 'profileKey must either undefined or not empty' })
    }
  }

  public toProto(): SignalService.ConfigurationMessage.Contact {
    return new SignalService.ConfigurationMessage.Contact({
      publicKey: this.publicKey,
      name: this.displayName,
      profilePicture: this.profilePictureURL,
      profileKey: this.profileKey,
      isApproved: this.isApproved,
      isBlocked: this.isBlocked,
      didApproveMe: this.didApproveMe,
    })
  }
}

export class ConfigurationMessageClosedGroup {
  public publicKey: Uint8Array
  public name: string
  public encryptionKeyPair: { privateKeyData: Uint8Array; publicKeyData: Uint8Array }
  public members: Array<string>
  public admins: Array<string>

  public constructor({
    publicKey,
    name,
    encryptionKeyPair,
    members,
    admins,
  }: {
    publicKey: Uint8Array;
    name: string;
    encryptionKeyPair: { privateKeyData: Uint8Array; publicKeyData: Uint8Array };
    members: Array<string>;
    admins: Array<string>;
  }) {
    this.publicKey = publicKey
    this.name = name
    this.encryptionKeyPair = encryptionKeyPair
    this.members = members
    this.admins = admins

    if (
      !encryptionKeyPair?.privateKeyData?.byteLength ||
      !encryptionKeyPair?.publicKeyData?.byteLength
    ) {
      throw new Error('Encryption key pair looks invalid')
    }

    if (!this.name?.length) {
      throw new Error('name must be set')
    }

    if (!this.members?.length) {
      throw new Error('members must be set')
    }
    if (!this.admins?.length) {
      throw new Error('admins must be set')
    }

    if (this.admins.some(a => !this.members.includes(a))) {
      throw new Error('some admins are not members')
    }
  }

  public toProto(): SignalService.ConfigurationMessage.ClosedGroup {
    return new SignalService.ConfigurationMessage.ClosedGroup({
      publicKey: this.publicKey,
      name: this.name,
      encryptionKeyPair: {
        publicKey: this.encryptionKeyPair.publicKeyData,
        privateKey: this.encryptionKeyPair.privateKeyData,
      },
      members: this.members.map(hexToUint8Array),
      admins: this.admins.map(hexToUint8Array),
    })
  }
}
