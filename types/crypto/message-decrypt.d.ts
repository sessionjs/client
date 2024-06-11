import type { Keypair } from '@session-oxen/keypair';
import type { EnvelopePlus } from '@session-oxen/types/envelope';
/** 1. Use **extractContent** with message string in base64 received from swarm
 * 2. Use **decodeMessage** with the Uint8Array from extractWebSocketContent to decode the message to EnvelopePlus
 * 3. Use **decryptMessage** with the EnvelopePlus to decrypt the message content
*/
export declare function extractContent(message: string): null | Uint8Array;
/**
 * @param overrideSource — override envelope's source (use for groups)
*/
export declare function decodeMessage(body: Uint8Array, options?: {
    overrideSource: string;
    ourPubKey: string;
}): EnvelopePlus | null;
export declare function decryptMessage(keypairs: Keypair[], envelope: EnvelopePlus): Uint8Array;
/**
 * This function is used to decrypt any messages send to our own pubkey.
 * Either messages deposited into our swarm by other people, or messages we sent to ourselves, or config messages stored on the user namespaces.
 * @param envelope the envelope contaning an encrypted .content field to decrypt
 * @returns the decrypted content
 */
export declare function decryptEnvelopeWithOurKey(keypair: Keypair, envelope: EnvelopePlus): Uint8Array;
/**
 * This function can be called to decrypt a keypair wrapper for a closed group update
 * or a message sent to a closed group.
 *
 * We do not unpad the result here, as in the case of the keypair wrapper, there is not padding.
 * Instead, it is the caller who needs to removeMessagePadding() the content.
 */
export declare function decryptWithSessionProtocol(keypair: Keypair, envelope: EnvelopePlus, isClosedGroup?: boolean): Uint8Array;
