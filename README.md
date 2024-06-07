# Session.js

Session.js (`session-oxen`) is a JavaScript library to use [Session messenger by OXEN](https://getsession.org) programmatically. Can be used entirely on server or in browser with server proxy. Includes TypeScript definitions. Tests with bun:test.

Written with blazingly fast [Bun](bun.sh), a modern runtime for JavaScript and alternative to Node.js. **This package cannot be used with Node.js, it uses a better runtime instead of it**

Use cases:
- Session bots (hundreds of bots in single process)
- Custom Session clients (web and native with JS)
- Automation tools for Session

## Features

- On-demand polling — you decide when to get new messages and whether instance should poll them (and poll settings like frequency) or work just for sending
- Per-instance storage settings — you can attach sqlite storage to instance or use in-memory storage (default)
- Session.js can be used partially in browser to generate signatures and encrypted data clientside to send it to your proxy server. See this in action with [Session Web client](https://github.com/VityaSchel/session-web)!

<details>
  <summary>Full roadmap</summary>
    
  - [ ] Messages receiving
    - [ ] Automatic snodes fetching
    - [ ] Automatic swarms selection
    - [ ] Manual snode/swarm control
    - [ ] Data retrieving from swarms
    - [ ] Messages polling
    - [ ] Messages types
      - [ ] Regular chat message
        - [ ] Text
        - [ ] Attachments
          - [ ] Images
          - [ ] Files
          - [ ] Voice messages
          - [ ] Quotes
          - [ ] Web links previews
      - [ ] Configuration message
      - [ ] Sync message
      - [ ] Read message
      - [ ] Media downloaded by recipient
    - [ ] Closed chats
    - [ ] Open groups (SOGS)
  - [ ] Messages sending
    - [ ] Data storing to swarms
    - [ ] Messages types
      - [ ] Regular chat message
        - [ ] Text
        - [ ] Attachments
          - [ ] Images
          - [ ] Files
          - [ ] Voice messages
          - [ ] Quotes
          - [ ] Web links previews
      - [ ] Sync message
      - [ ] Read message
      - [ ] Media downloaded by us
  - [ ] Messages deleting
  - [ ] Messages editing (SOGS)
  - [ ] Profile editing
    - [ ] Display name
    - [ ] Avatar
  - [ ] ONS resolving

</details>

## Installation

By using this software, you are agreeing to abide by [Terms of use](./TERMS.md). Shortly: no abuse and spam, you're solely responsible for your actions with this software.

1. First install bun: https://bun.sh/
2. Create a new Bun project in any directory, using `bun init` or manually
3. Install session.js: `bun install session-oxen`

## How to use

Make sure to await for initialization of libsodium:
```ts
import { ready } from 'session-oxen/sodium'
await ready
// ...
```
Otherwise you might get errors like `sodium.crypto_sign_seed_keypair is not a function`

TBD

## Storage

You can use any of existing storage adapters or write your own

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
import { Session } from 'session-oxen'
import { InMemoryStorage } from 'session-oxen'

new Session({ storage: InMemoryStorage })
```

</td>
</tr>
</table>

To implement your own storage, write class that implements Storage interface from `session-oxen/storage`. Take a look at this example with in-memory storage

```ts
import type { Storage } from 'session-oxen/storage'

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

## Error handling

Session.js validates and handles a lot of errors for you, wrapping them in special different classes, so you can easily handle them on your abstract level. For example:

```ts
import { SessionValidationError, SessionValidationErrorCode } from 'session-oxen/errors'

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

## Collection of useful utils

### Mnemonic decoding and encoding

Use `session-oxen/mnemonic`:

```ts
import { encode, decode, MnemonicWordset } from 'session-oxen/mnemonic'

const seed = decode('love love love love love love love love love love love love')
const mnemonic = encode(seed)
```

You can even add your own mnemonic languages:

```ts
import { decode, mnemonicLanguages, addMnemonicLanguage } from 'session-oxen/mnemonic'

mnemonicLanguages.russian = addMnemonicLanguage({
  prefixLen: 3,
  words: [/* ... */]
})
decode('love love love love love love love love love love love love', 'russian')
```

In order to generate random mnemonic:

1. Use `generateSeedHex`
2. Use `encode` to encode seed to mnemonic

```ts
import { encode } from 'session-oxen/mnemonic'
import { generateSeedHex } from 'session-oxen/keypair'

const mnemonic = encode(generateSeedHex())
```

### Session client constants

You can use some Session client constatnts from `session-oxen/consts` such as `CONVERSATION.MAX_VOICE_MESSAGE_DURATION` which should help you define limits for your client