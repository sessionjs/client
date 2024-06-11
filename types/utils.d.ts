export declare function Uint8ArrayToHex(bytes: Uint8Array): string;
export declare function hexToUint8Array(hexString: string): Uint8Array;
export declare const concatUInt8Array: (...args: Array<Uint8Array>) => Uint8Array;
export declare function removePrefixIfNeeded(prependedPublicKey: Uint8Array): Uint8Array;
export declare function removePrefixIfNeeded(sessionID: string): string;
export declare const isHex: (str: string) => boolean;
export declare function Uint8ArrayToBase64(uint8array: Uint8Array): string;
export declare function base64ToUint8Array(string: string): Uint8Array;
