import { SignalService } from '../signal-service'
import { addMessagePadding } from './message-padding'
import { concatUInt8Array, hexToUint8Array, removePrefixIfNeeded } from '../utils'
import sodium from 'libsodium-wrappers-sumo'
import type { Keypair } from '../keypair'
import { isNil, toNumber } from 'lodash'
import { SnodeNamespaces } from '@/types/namespaces'
import ByteBuffer from 'bytebuffer'

export type EncryptResult = {
  envelopeType: SignalService.Envelope.Type
  cipherText: Uint8Array
}

export async function encrypt(
  senderKeypair: Keypair,
  recipient: string,
  plainTextBuffer: Uint8Array,
  encryptionType: SignalService.Envelope.Type
): Promise<EncryptResult> {
  const { CLOSED_GROUP_MESSAGE, SESSION_MESSAGE } = SignalService.Envelope.Type

  if (encryptionType !== CLOSED_GROUP_MESSAGE && encryptionType !== SESSION_MESSAGE) {
    throw new Error(`Invalid encryption type:${encryptionType}`)
  }

  const encryptForClosedGroup = encryptionType === CLOSED_GROUP_MESSAGE
  const plainText = addMessagePadding(plainTextBuffer)

  if (encryptForClosedGroup) {
    // const hexEncryptionKeyPair = await Data.getLatestClosedGroupEncryptionKeyPair(device.key)
    // if (!hexEncryptionKeyPair) {
    //   throw new Error('Couldn\'t get key pair for closed group')
    // }

    // const hexPubFromECKeyPair = PubKey.cast(hexEncryptionKeyPair.publicHex)

    // const cipherTextClosedGroup = await encryptUsingSessionProtocol(
    //   hexPubFromECKeyPair,
    //   plainText
    // )

    // return {
    //   envelopeType: CLOSED_GROUP_MESSAGE,
    //   cipherText: cipherTextClosedGroup,
    // }
  }
  const cipherText = await encryptUsingSessionProtocol(senderKeypair, recipient, plainText)

  return { envelopeType: SESSION_MESSAGE, cipherText }
}

async function encryptUsingSessionProtocol(
  senderKeypair: Keypair,
  recipient: string,
  plaintext: Uint8Array
): Promise<Uint8Array> {
  const userED25519KeyPairHex = senderKeypair.ed25519
  if (
    !userED25519KeyPairHex ||
    !userED25519KeyPairHex.publicKey?.length ||
    !userED25519KeyPairHex.privateKey?.length
  ) {
    throw new Error('Couldn\'t find user ED25519 key pair.')
  }

  const recipientX25519PublicKey = hexToUint8Array(removePrefixIfNeeded(recipient))

  const verificationData = concatUInt8Array(
    plaintext,
    userED25519KeyPairHex.publicKey,
    recipientX25519PublicKey
  )

  const signature = sodium.crypto_sign_detached(verificationData, userED25519KeyPairHex.privateKey)
  if (!signature || signature.length === 0) {
    throw new Error('Couldn\'t sign message')
  }

  const plaintextWithMetadata = concatUInt8Array(plaintext, userED25519KeyPairHex.publicKey, signature)

  const ciphertext = sodium.crypto_box_seal(plaintextWithMetadata, recipientX25519PublicKey)
  if (!ciphertext) {
    throw new Error('Couldn\'t encrypt message.')
  }
  return ciphertext
}

type SharedEncryptAndWrap = {
  ttl: number;
  identifier: string;
  isSyncMessage: boolean;
};

type EncryptAndWrapMessage = {
  isGroup: boolean
  plainTextBuffer: Uint8Array;
  destination: string;
  namespace: number | null;
} & SharedEncryptAndWrap;

type EncryptAndWrapMessageResults = {
  data64: string;
  networkTimestamp: number;
  data: Uint8Array;
  namespace: number;
} & SharedEncryptAndWrap;

export async function wrap(
  senderKeypair: Keypair,
  messages: EncryptAndWrapMessage[],
  { networkTimestamp }: { networkTimestamp: number }
): Promise<EncryptAndWrapMessageResults[]> {
  return Promise.all(messages.map(async ({
    destination,
    identifier,
    isSyncMessage: syncMessage,
    namespace,
    plainTextBuffer,
    ttl,
    isGroup
  }) => {
    const { overRiddenTimestampBuffer } = await overwriteOutgoingTimestampWithNetworkTimestamp(
      { plainTextBuffer }, 
      networkTimestamp
    )

    const encryptionBasedOnConversation = isGroup
      ? SignalService.Envelope.Type.CLOSED_GROUP_MESSAGE
      : SignalService.Envelope.Type.SESSION_MESSAGE

    const { envelopeType, cipherText } = await encrypt(
      senderKeypair,
      destination,
      overRiddenTimestampBuffer,
      encryptionBasedOnConversation
    )

    const envelope = await buildEnvelope(envelopeType, destination, networkTimestamp, cipherText)

    const data = wrapEnvelope(envelope)
    const data64 = ByteBuffer.wrap(data).toString('base64')

    // override the namespaces if those are unset in the incoming messages
    // right when we upgrade from not having namespaces stored in the outgoing cached messages our messages won't have a namespace associated.
    // So we need to keep doing the lookup of where they should go if the namespace is not set.

    const overridenNamespace = !isNil(namespace)
      ? namespace
      : isGroup
        ? SnodeNamespaces.ClosedGroupMessage
        : SnodeNamespaces.UserMessages

    return {
      data64,
      networkTimestamp,
      data,
      namespace: overridenNamespace,
      ttl,
      identifier,
      isSyncMessage: syncMessage,
    }
  }))
}

async function overwriteOutgoingTimestampWithNetworkTimestamp(message: { plainTextBuffer: Uint8Array }, networkTimestamp: number) {
  const { plainTextBuffer } = message
  const contentDecoded = SignalService.Content.decode(plainTextBuffer)

  const { dataMessage, dataExtractionNotification, typingMessage } = contentDecoded
  if (dataMessage && dataMessage.timestamp && toNumber(dataMessage.timestamp) > 0) {
    // this is a sync message, do not overwrite the message timestamp
    if (dataMessage.syncTarget) {
      return {
        overRiddenTimestampBuffer: plainTextBuffer,
        networkTimestamp: toNumber(dataMessage.timestamp),
      }
    }
    dataMessage.timestamp = networkTimestamp
  }
  if (
    dataExtractionNotification &&
    dataExtractionNotification.timestamp &&
    toNumber(dataExtractionNotification.timestamp) > 0
  ) {
    dataExtractionNotification.timestamp = networkTimestamp
  }
  if (typingMessage && typingMessage.timestamp && toNumber(typingMessage.timestamp) > 0) {
    typingMessage.timestamp = networkTimestamp
  }
  const overRiddenTimestampBuffer = SignalService.Content.encode(contentDecoded).finish()
  return { overRiddenTimestampBuffer }
}

async function buildEnvelope(
  type: SignalService.Envelope.Type,
  sskSource: string | undefined,
  timestamp: number,
  content: Uint8Array
): Promise<SignalService.Envelope> {
  let source: string | undefined

  if (type === SignalService.Envelope.Type.CLOSED_GROUP_MESSAGE) {
    source = sskSource
  }

  return SignalService.Envelope.create({
    type,
    source,
    timestamp,
    content,
  })
}

/**
 * This is an outdated practice and we should probably just send the envelope data directly.
 * Something to think about in the future.
 */
function wrapEnvelope(envelope: SignalService.Envelope): Uint8Array {
  const request = SignalService.WebSocketRequestMessage.create({
    id: 0,
    body: SignalService.Envelope.encode(envelope).finish(),
    verb: 'PUT',
    path: '/api/v1/message',
  })

  const websocket = SignalService.WebSocketMessage.create({
    type: SignalService.WebSocketMessage.Type.REQUEST,
    request,
  })
  return SignalService.WebSocketMessage.encode(websocket).finish()
}