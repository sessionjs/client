import { ready as sodiumLoaded } from 'libsodium-wrappers-sumo'
import { Deferred } from '@/utils'

export let bunNetworkModule: typeof import('@session.js/bun-network')
const bunNetworkLoaded = new Deferred()
if (typeof Bun !== 'undefined') {
  bunNetworkModule = await import('@session.js/bun-network')
  bunNetworkLoaded.resolve()
} else {
  bunNetworkLoaded.resolve()
}

export const ready = Promise.all([
  sodiumLoaded,
  bunNetworkLoaded.promise
])