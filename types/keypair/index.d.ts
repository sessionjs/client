import sodium from 'libsodium-wrappers-sumo';
export type Keypair = {
    x25519: sodium.KeyPair;
    ed25519: sodium.KeyPair;
};
export declare function getKeypairFromSeed(seedHex: string): Keypair;
export declare function generateSeedHex(): string;
