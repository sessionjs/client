import { removeMessagePadding } from '@/crypto/message-padding'
import { SessionCryptoError, SessionCryptoErrorCode } from '@session.js/errors'
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'
import type { Keypair } from '@session.js/keypair'
import { SignalService } from '@session.js/types/signal-bindings'
import type { EnvelopePlus } from '@session.js/types/envelope'
import { KeyPrefixType } from '@session.js/types/pubkey'
import { Uint8ArrayToHex, base64ToUint8Array, concatUInt8Array, removePrefixIfNeeded } from '@/utils'
import sodium from 'libsodium-wrappers-sumo'
import { v4 as uuid } from 'uuid'

/** 1. Use **extractContent** with message string in base64 received from swarm 
 * 2. Use **decodeMessage** with the Uint8Array from extractWebSocketContent to decode the message to EnvelopePlus
 * 3. Use **decryptMessage** with the EnvelopePlus to decrypt the message content
*/
export function extractContent(
  message: string
): null | Uint8Array {
  try {
    const dataPlaintext = base64ToUint8Array(message)
    const messageBuf = SignalService.WebSocketMessage.decode(dataPlaintext)
    if (
      messageBuf.type === SignalService.WebSocketMessage.Type.REQUEST &&
      messageBuf.request?.body?.length
    ) {
      return messageBuf.request.body
    }
    return null
  } catch (e) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageEncryptionFailed, message: 'ExtractWebSocketContent from message failed with' + (e instanceof Error ? ': ' + e.message : ' unknown error') })
  }
}

/** 
 * @param overrideSource — override envelope's source (use for groups)
*/
export function decodeMessage(body: Uint8Array, options?: { overrideSource: string, ourPubKey: string }) {
  const envelope = SignalService.Envelope.decode(body)
  let senderIdentity: typeof envelope.source | undefined
  let source = envelope.source

  if (options?.overrideSource) {
    senderIdentity = envelope.source
    if (senderIdentity === options.ourPubKey) {
      return null
    }
    source = options.overrideSource
  }

  const envelopePlus: EnvelopePlus = {
    id: uuid(),
    source,
    content: envelope.content,
    receivedAt: Date.now(),
    senderIdentity: senderIdentity || source,
    timestamp: envelope.timestamp,
    type: envelope.type,
  }

  return envelopePlus
}

export function decryptMessage(keypairs: Keypair[], envelope: EnvelopePlus) {
  if (envelope.content.byteLength === 0) {
    throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMessage, message: 'Received an empty envelope.' })
  }

  switch (envelope.type) {
    case SignalService.Envelope.Type.SESSION_MESSAGE:
      return decryptEnvelopeWithOurKey(keypairs[0], envelope)
    case SignalService.Envelope.Type.CLOSED_GROUP_MESSAGE:
      return decryptForClosedGroup(keypairs, envelope)
    default:
      throw new SessionValidationError({ code: SessionValidationErrorCode.InvalidMessage, message: 'Unknown message type: ' + envelope.type })
  }
}

/**
 * This function is used to decrypt any messages send to our own pubkey.
 * Either messages deposited into our swarm by other people, or messages we sent to ourselves, or config messages stored on the user namespaces.
 * @param envelope the envelope contaning an encrypted .content field to decrypt
 * @returns the decrypted content
 */
export function decryptEnvelopeWithOurKey(
  keypair: Keypair,
  envelope: EnvelopePlus
): Uint8Array {
  try {
    const retSessionProtocol = decryptWithSessionProtocol(
      keypair,
      envelope,
    )

    return removeMessagePadding(new Uint8Array(retSessionProtocol))
  } catch (e) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Message decryption failed with ' + (e instanceof Error ? ': ' + e.message : ' unknown error') })
  }
}

function decryptForClosedGroup(encryptionKeyPairs: Keypair[], envelope: EnvelopePlus) {
  try {
    // Loop through all known group key pairs in reverse order (i.e. try the latest key pair first (which'll more than
    // likely be the one we want) but try older ones in case that didn't work)
    let decryptedContent: Uint8Array | undefined

    // If an error happens in here, we catch it in the inner try-catch
    // When the loop is done, we check if the decryption is a success;
    // If not, we trigger a new Error which will trigger in the outer try-catch
    do {
      try {
        const keypair = encryptionKeyPairs.pop()!

        const decryptedContent = decryptWithSessionProtocol(
          keypair,
          envelope,
          true
        )
        if (decryptedContent?.byteLength) {
          break
        }
      } catch (e) {0}
    } while (encryptionKeyPairs.length > 0)

    if (!decryptedContent?.byteLength) {
      throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Could not decrypt message for closed group with any of the keypairs.' })
    }

    return removeMessagePadding(decryptedContent)
  } catch (e) {
    // TODO: Session-Desktop says something about retrying to decrypt this message as soon as we receive new keypair...
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Could not decrypt message for closed group with any of the keypairs.' })
  }
}

/**
 * This function can be called to decrypt a keypair wrapper for a closed group update
 * or a message sent to a closed group.
 *
 * We do not unpad the result here, as in the case of the keypair wrapper, there is not padding.
 * Instead, it is the caller who needs to removeMessagePadding() the content.
 */
export function decryptWithSessionProtocol(
  keypair: Keypair,
  envelope: EnvelopePlus,
  isClosedGroup?: boolean
): Uint8Array {
  const recipientX25519PublicKey = removePrefixIfNeeded(new Uint8Array(keypair.x25519.publicKey))

  const signatureSize = sodium.crypto_sign_BYTES
  const ed25519PublicKeySize = sodium.crypto_sign_PUBLICKEYBYTES

  // 1. ) Decrypt the message
  const plaintextWithMetadata = sodium.crypto_box_seal_open(
    envelope.content,
    recipientX25519PublicKey,
    new Uint8Array(keypair.x25519.privateKey)
  )
  if (plaintextWithMetadata.byteLength <= signatureSize + ed25519PublicKeySize) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Decryption failed.' })
  }

  // 2. ) Get the message parts
  const signatureStart = plaintextWithMetadata.byteLength - signatureSize
  const signature = plaintextWithMetadata.subarray(signatureStart)
  const pubkeyStart = plaintextWithMetadata.byteLength - (signatureSize + ed25519PublicKeySize)
  const pubkeyEnd = plaintextWithMetadata.byteLength - signatureSize
  const senderED25519PublicKey = plaintextWithMetadata.subarray(pubkeyStart, pubkeyEnd)
  const plainTextEnd = plaintextWithMetadata.byteLength - (signatureSize + ed25519PublicKeySize)
  const plaintext = plaintextWithMetadata.subarray(0, plainTextEnd)

  // 3. ) Verify the signature
  const isValid = sodium.crypto_sign_verify_detached(
    signature,
    concatUInt8Array(plaintext, senderED25519PublicKey, recipientX25519PublicKey),
    senderED25519PublicKey
  )
  if (!isValid) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageVerificationFailed, message: 'Invalid message signature' })
  }

  // 4. ) Get the sender's X25519 public key
  const senderX25519PublicKey = sodium.crypto_sign_ed25519_pk_to_curve25519(senderED25519PublicKey)
  if (!senderX25519PublicKey) {
    throw new SessionCryptoError({ code: SessionCryptoErrorCode.MessageDecryptionFailed, message: 'Failed to get sender\'s public key' })
  }

  // set the sender identity on the envelope itself.
  if (isClosedGroup) {
    envelope.senderIdentity = `${KeyPrefixType.standard}${Uint8ArrayToHex(senderX25519PublicKey)}`
  } else {
    envelope.source = `${KeyPrefixType.standard}${Uint8ArrayToHex(senderX25519PublicKey)}`
  }

  return plaintext
}