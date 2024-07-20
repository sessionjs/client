// import { SignalService } from '@session.js/types/signal-bindings'
// import sodium, { crypto_secretbox_NONCEBYTES } from 'libsodium-wrappers-sumo'

// export async function generateData(config, keys, compressionLevel = 0) {
//   // Serialize the configuration
//   const configMessage = SignalService.ConfigurationMessage.create(config)
//   let serializedConfig = SignalService.ConfigurationMessage.encode(configMessage).finish()

//   if (compressionLevel > 0) {
//     serializedConfig = zstdCompress(serializedConfig, compressionLevel)
//   }

//   // Pad the message (example with null bytes padding)
//   const padLength = 16 - (serializedConfig.length % 16)
//   const paddedMessage = new Uint8Array(serializedConfig.length + padLength)
//   paddedMessage.set(serializedConfig)
//   // Padding with null bytes (already zero-initialized by default)

//   // Encrypt the message
//   const key = keys[0]  // Use the first key for encryption
//   const nonce = sodium.randombytes_buf(crypto_secretbox_NONCEBYTES)
//   const encryptedMessage = sodium.crypto_secretbox_easy(paddedMessage, nonce, key)

//   // Wrap the configuration (protobuf wrapping example)
//   const wrappedMessage = wrapConfig(encryptedMessage, nonce, key)
//   const finalMessage = SignalService.ConfigurationMessage.encode(wrappedMessage).finish()

//   return finalMessage
// }

// function zstdCompress(data: Uint8Array, level: number) {
//   // Placeholder: Adjust compression logic if necessary
//   const compressed = pako.deflate(data, { level: level })
//   return compressed
// }

// function wrapConfig(data, nonce, key) {
//   // Placeholder: Adjust wrapping to match exact structure
//   return {
//     payload: data,
//     nonce: nonce,
//     key: key  // Add other necessary fields
//   }
// }