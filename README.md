-00--0-0# Session.js

Session.js is a JavaScript library to use [Session messenger by OXEN](https://getsession.org) programmatically. Can be used entirely on server or in browser with server proxy. Includes TypeScript definitions. Tests with bun:test.

Written with blazingly fast [Bun](bun.sh), a modern runtime for JavaScript and alternative to Node.js. **This package cannot be used with Node.js, it uses a better runtime instead of it**

Use cases:
- Session bots (hundreds of bots in single process)
- Custom Session clients (web and native with JS)
- Automation tools for Session

- [Session.js](#sessionjs)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick start](#quick-start)
    - [Sending messages](#sending-messages)
    - [Polling messages](#polling-messages)
    - [Events](#events)
  - [Storage](#storage)
  - [Error handling](#error-handling)
  - [Collection of useful utils](#collection-of-useful-utils)
    - [Mnemonic decoding and encoding](#mnemonic-decoding-and-encoding)
    - [Session client constants](#session-client-constants)
  - [Funding](#funding)

## Features

- On-demand polling — you decide when to get new messages and whether instance should poll them (and poll settings like frequency) or work just for sending
- Per-instance storage and network settings — you can attach sqlite storage to instance or use in-memory storage (default)
- Session.js can be used partially in browser to generate signatures and encrypted data clientside to send it to your proxy server. See this in action with [Session Web client](https://github.com/VityaSchel/session-web)!

<details>
  <summary>Full roadmap</summary>
    
  - [X] Messages
    - [X] Automatic snodes fetching
    - [X] Automatic swarms selection
    - [ ] Manual snode/swarm control
    - [X] Data retrieving from swarms
    - [X] Messages polling
    - [X] Messages types
      - [X] Regular chat message
        - [X] Text
        - [X] Attachments
          - [X] Images
          - [X] Files
          - [ ] Voice messages
          - [ ] Quotes
          - [ ] Web links previews
      - [ ] Service messages
        - [X] Sync message
        - [X] Configuration message
        - [X] Read message (ReadReceipt)
        - [X] Typing message
        - [X] Message request response
        - [X] Screenshot / media saved (DataExtraction)
        - [X] Delete message (Unsend)
        - [ ] Call message
          - Just event to display placeholder warning about unsupported feature
    - [ ] Reactions
    - [ ] Closed chats
    - [ ] Open groups (SOGS)
    - [ ] Expirable messages
  - [ ] Calls
  - [ ] Messages editing (SOGS)
  - [X] Profile editing
    - [X] Display name
    - [X] Avatar
    - [X] Syncing between devices
  - [X] ONS resolving
  - [ ] Get rid of ByteBuffer and other lazy dependencies

</details>

## Installation

By using this software, you are agreeing to abide by [Terms of use](./TERMS.md). Shortly: no abuse and spam, you're solely responsible for your actions with this software.

1. First install bun: https://bun.sh/
2. Create a new Bun project in any directory, using `bun init` or manually
3. Install session.js: `bun install @session.js/client`

## Quick start

### Sending messages

```ts
import { Session, ready } from '@session.js/client'
await ready

const mnemonic = 'love love love love love love love love love love love love love'

const session = new Session()
session.setMnemonic(mnemonic, 'Display name')
const { messageHash, syncMessageHash } = await session.sendMessage({ 
  to: '054830367d369d94605247999a375dbd0a0f65fdec5de1535612bcb6d4de452c69', 
  text: 'Hello world' 
})
console.log('Sent message with id', hash)
```

### Sending images or files

```ts
import { Session, ready } from '@session.js/client'
await ready

const mnemonic = 'love love love love love love love love love love love love love'

const session = new Session()
session.setMnemonic(mnemonic)
const buffer = await fetch('https://picsum.photos/100/100').then(res => res.arrayBuffer())
const file = new File([buffer], 'image.jpg', { type: 'image/jpeg' })
await session.sendMessage({ 
  to: '05123798d4f76752d0055a04a554977760bc0716fd7a256498a4209b657bc72273', 
  text: 'Image downloaded by URL:', 
  attachments: [file] 
})
```
```ts
import path from 'path'
import fs from 'fs/promises'
import { Session, ready } from '@session.js/client'
await ready

const mnemonic = 'love love love love love love love love love love love love love'

const session = new Session()
session.setMnemonic(mnemonic)
const filename = '/Users/kitty/Desktop/image.jpg'
const buffer = await fs.readFile(filename)
const file = new File([buffer], path.basename(filename), { type: 'image/jpeg' })
await session.sendMessage({
  to: '05123b5cbd8f5ef8927480dfb8338a62d478e68754b2df739babd3c9099ae15439', 
  text: 'Image from file:', 
  attachments: [file] 
})
```

### Polling messages

By default, if you don't provide `interval` in options to Poller class constructor, it will poll new messages each 3 seconds.

```ts
import { Session, Poller, ready } from '@session.js/client'
import { SnodeNamespaces, type Message } from '@session.js/types'
await ready

const mnemonic = 'love love love love love love love love love love love love love'

const session = new Session()
session.setMnemonic(mnemonic, 'Display name')

const poller = new Poller() // polls every 3 seconds
session.addPoller(poller)

session.on('message', (msg: Message) => {
  console.log('Received new message!', 
    'From:', msg.from,
    'Is from closed group:', msg.type === 'group',
    'Group id:', msg.type === 'group' ? msg.groupId : 'Not group',
    'Text:', msg.text ?? 'No text',
  )

  // If you want to access more properties and experiment with them, use getEnvelope and getContent
  msg.getContent() // => SignalService.Content <- useful message payload
  msg.getCnvelope() // => EnvelopePlus <- message metadata

  // If you want to download attachments, use:
  msg.attachments.forEach(async attachment => console.log(await session.getFile(attachment)))
})
```

You can even attach multiple pollers to instance, for example, to configure interval of polling different namespaces:

```ts
import { Session, Poller, ready } from '@session.js/client'
await ready

const mnemonic = 'love love love love love love love love love love love love love'

const session = new Session()
session.setMnemonic(mnemonic, 'Display name')

// Poll DMs each 5 seconds
const dmMessagesPoller = new Poller({ interval: 5000, namespaces: new Set([SnodeNamespaces.UserMessages]) })
// Poll closed group messages manually
const closedGroupsMessagesPoller = new Poller({ interval: null, namespaces: new Set([SnodeNamespaces.UserGroups]) })

session.addPoller(dmMessagesPoller)
session.addPoller(closedGroupsMessagesPoller)

// ... Some time later ...

const messages = await closedGroupsMessagesPoller.poll()
console.log('Received closed group messages', messages)
```

You can use methods `startPolling`, `stopPolling` and `setInterval` on Poller instance to control it. Read more in JSDoc hints in your code editor or IDE.

### Events

You can listen to a variety of events to trigger parts of your application that are responsible to react on them.

```ts
// ... //
const session = new Session()
const onMessage = msg => { /* your function */ }
session.on('message', onMessage)
// alias: session.addEventListener('message', onMessage)

session.off('message', onMessage)
// alias: session.removeEventListener('message', onMessage)
```

| Event name | Description                                                                                                                                                                                                                                                                                      | Conditions                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `message`  | New message received in DM or closed group. For advanced users: this is only emitted for DataMessage i.e. VisibleMessage i.e. message that was sent by user to the chat. This does not include service messages and other events sent by Session clients. Look at this like on a message bubble. | Polling is enabled or triggered manually by poll() call via `Poller` constructor |
|            |                                                                                                                                                                                                                                                                                                  |                                                                                  |

Always make sure to await for initialization of libsodium:
```ts
import { ready } from '@session.js/client'
await ready
// ...
```
Otherwise you might get errors like `sodium.crypto_sign_seed_keypair is not a function`

More examples are in [./examples directory](./examples/)

## Storage

You can use any existing storage adapter or write your own (see below)

<table>
<tr>
<td> Storage type </td> <td> Description </td> <td> How to use </td>
</tr>
<tr>
<td>In-memory</td>
<td>Default storage that stores data in memory, that is reset after this process exits or tab is closed. Ideal for short living one-time bots or testing. It is not persistant.</td>
<td>

Simply **do not provide any storage to `storage` option in Session class constructor** and this will be the default. You can optionally provide it as: 
```ts
import { Session } from '@session.js/client'
import { InMemoryStorage } from '@session.js/client/storage'

new Session({ storage: new InMemoryStorage() })
```

</td>
</tr>

<tr>
<td>Persistant file-based key=value storage with `fs`</td>
<td>Simple storage that stores everything in memory and periodically syncs it with locally stored file in key=value format. `filePath` is optional and defaults to `./storage.db` </td>
<td>

```ts
import { Session } from '@session.js/client'
import { FileKeyvalStorage } from '@session.js/file-keyval-storage'

new Session({ 
  storage: new FileKeyvalStorage({ 
    filePath: 'some-file-path.db' 
  })
})
```

</td>
</tr>

</table>

To implement your own storage, write class that implements Storage interface from `@session.js/types/storage`. Take a look at this example with in-memory storage

```ts
import type { Storage } from '@session.js/types'

export class MyInMemoryStorage implements Storage {
  storage: Map<string, string> = new Map()

  get(key: string) {
    return this.storage.get(key) ?? null
  }

  set(key: string, value: string) {
    this.storage.set(key, value)
  }

  delete(key: string) {
    this.storage.delete(key)
  }

  has(key: string) {
    return this.storage.has(key)
  }
}
```

## Network

You can pick existing network connector or write your own (see below)

<table>
<tr>
<td> Network type </td> <td> Supports onion routing </td> <td> Description </td> <td> How to use </td>
</tr>
<tr>
<td>Bun (local)</td>
<td>❌</td>
<td> This network type is default and simpliest. It is intended to be used in the same process that @session.js/client instances run in. It's ideal if you just want to start and doing everything on server in one project without browser or other parts. </td>
<td>

Simply **do not provide any network to `network` option in Session class constructor** and this will be the default. You can optionally provide it as: 
```ts
import { Session } from '@session.js/client'
import { BunNetwork } from '@session.js/bun-network'

new Session({ network: new BunNetwork() })
```

</td>
</tr>

<tr>
<td>Bun (remote) for proxies</td>
<td>❌</td>
<td> This network might be useful if you're building client in environment that does not allow you sending requests to Session nodes with self-signed certificates. This option is ideal for browser clients, because it handles all network connection on backend proxy that forwards client-side encrypted data to snodes. Check out simple [browser example here](https://github.com/sessionjs/examples). </td>
<td>

Start by installing `@session.js/bun-network-remote` both on client-side and server-side. The package itself only does validation and connects client-side and server-side and all network management happens in dependency `@session.js/bun-network` just like in local case.

Client-side (where Session client runs):

```ts
import { Session } from '@session.js/client'
import { BunNetworkRemoteClient } from '@session.js/bun-network-remote'

new Session({ 
  network: new BunNetworkRemoteClient({ 
    proxy: 'https://my-proxy.example.org:12345/' 
    // this endpoint must be accessible in your environment
    // i.e. if you're building Session client in browser, make sure
    // that my-proxy.example.org has a valid SSL certificate, CORS and SSL settings
  })
})
```

Client-side part will send POST requests to this URL with FormData body.

Server-side (proxy server):

```ts
// Runtime must be Bun.sh
// Web server can be anything: Express, Fastify, Elysia, Bun's web server, etc...
// Validation is done internally and throws @session.js/error RuntimeValidation errors

import { Elysia } from 'elysia'
import { BunNetworkRemoteServer } from '@session.js/bun-network-remote'
const network = new BunNetworkRemoteServer()

new Elysia()
  .post('/', ({ body }) => network.onRequest(body))
  .listen(12345)
```

</td>
</tr>

</table>

To implement your own network, write class that implements Network interface from `@session.js/types/network` with onRequest method. It must cover all RequestTypes from `@session.js/types/network/request`. Take a look at this example:

```ts
import type { Network } from '@session.js/types'
import { 
  RequestType, 
  type RequestGetSwarmsBody, 
  type RequestPollBody, 
  type RequestStoreBody, 
  type RequestUploadAttachment 
} from '@session.js/types/network/request'

export class MyNetwork implements Network {
  onRequest(type: RequestType, body: object): Promise<object> {
    switch(type) {
      case RequestType.Store:
        return // typeof ResponseStore

      case RequestType.GetSnodes:
        return // typeof ResponseGetSnodes

      case RequestType.GetSwarms:
        return // typeof ResponseGetSwarms

      case RequestType.Poll:
        return // typeof ResponsePoll

      case RequestType.UploadAttachment:
        return // typeof ResponseUploadAttachment

      default:
        throw new Error('Invalid request type')
    }
  }
}
```

## Error handling

Session.js validates and handles a lot of errors for you, wrapping them in special different classes, so you can easily handle them on your abstract level. 

You must install [@session.js/errors](https://www.npmjs.com/package/@session.js/errors)

Example:

```ts
import { SessionValidationError, SessionValidationErrorCode } from '@session.js/errors'

const session = new Session()

try {
  session.setMnemonic('invalid mnemonic') // <- throws SessionValidationError, which extends from generic Error class
} catch(e) {
  if(e instanceof SessionValidationError) {
    if(e.code === SessionValidationErrorCode.InvalidMnemonic) {
      console.error('You entered invalid mnemonic!') // <- `e` will have code property with one of SessionValidationErrorCode enums
    } else {
      throw e
    }
  } else {
    throw e
  }
}
```

## Examples repository

If you need more examples, go ahead and take a look at [examples repository](https://github.com/sessionjs/examples).

- [Simple example](https://github.com/sessionjs/examples/tree/main/simple)
- [Browser](https://github.com/sessionjs/examples/tree/main/browser-simple)

## Collection of useful utils

### Mnemonic decoding and encoding

Use [@session.js/mnemonic](https://www.npmjs.com/package/@session.js/mnemonic):

```ts
import { encode, decode, MnemonicWordset } from '@session.js/mnemonic'

const seed = decode('love love love love love love love love love love love love')
const mnemonic = encode(seed)
```

### Generate random Session ID

Install [@session.js/mnemonic](https://www.npmjs.com/package/@session.js/mnemonic) and [@session.js/keypair](https://www.npmjs.com/package/@session.js/keypair)

1. Use `generateSeedHex`
2. Use `encode` to encode seed to mnemonic

> Hint: Session IDs are [x25519 aka Curve25519](https://en.wikipedia.org/wiki/Curve25519) public keys prepended with `05`

```ts
import { generateSeedHex, getKeypairFromSeed } from '@session.js/keypair'
import { encode } from '@session.js/mnemonic'

const seedHex = generateSeedHex()
const keypair = getKeypairFromSeed(seedHex)
const mnemonic = encode(seedHex)
const sessionID = keypair.x25519.publicKey

console.log('Generated session ID:', sessionID)
console.log('Mnemonic for it:', mnemonic)
```

### Add your own mnemonic language

To see this and other cool examples, go to [@session.js/mnemonic](https://www.npmjs.com/package/@session.js/mnemonic) readme.

### ONS resolving

Use [@session.js/ons](https://www.npmjs.com/package/@session.js/ons):

```ts
import { resolve } from '@session.js/mnemonic'

await resolve('hloth') // => 057aeb66e45660c3bdfb7c62706f6440226af43ec13f3b6f899c1dd4db1b8fce5b
```

### Session client constants

You can use some Session client constatnts from `@session.js/consts` such as `CONVERSATION.MAX_VOICE_MESSAGE_DURATION` which should help you define limits for your client

## Funding

You can donate here: [hloth.dev/donate](https://hloth.dev/donate)