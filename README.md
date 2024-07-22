# Session.js

Session.js is JavaScript library for programmatic usage of [Session messenger by OXEN](https://getsession.org). Supports server and browser environment with built-in proxy network module. Shipped with TypeScript definitions. Tested with bun:test. Written with blazingly fast [Bun](bun.sh), a modern runtime for JavaScript and alternative to Node.js. **This package cannot be used with Node.js, it uses a better runtime instead of it**. It can also be used with most bundlers that support modern syntax.

Session.js allows you to create:
- Highly optimized Session bots (hundreds of bots in a single app)
- Custom Session clients (web-based and native with JS backend)
- Automation tools for Session

## Features

- On-demand polling — you decide when to get new messages and whether instance should poll them (and poll settings like frequency) or work just for sending
- Per-instance storage and network settings — you can attach persistant storage to instance or use in-memory storage for throwaway one-time instances
- Session.js can be used in browser, keeping private keys on client-side and doing network requests on server-side. See this in action with [my full-featured Session Web client](https://github.com/VityaSchel/session-web)!

[Project roadmap](https://sessionjs.github.io/docs/#roadmap).

# Getting started

Visit documentation website for guide: [https://sessionjs.github.io/docs/](https://sessionjs.github.io/docs/)

## Funding

You can donate here: [hloth.dev/donate](https://hloth.dev/donate)