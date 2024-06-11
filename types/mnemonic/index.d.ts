export declare enum MnemonicWordset {
    english = "english"
}
/** Turns 13-words mnemonic phrase to seed's hex */
export declare function encode(str: string, wordsetName?: MnemonicWordset): string;
/** Turns seed's hex to 13-words mnemonic phrase */
export declare function decode(str: string, wordsetName?: MnemonicWordset): string;
export declare const addMnemonicLanguage: ({ prefixLen, words }: {
    prefixLen: number;
    words: string[];
}) => {
    prefixLen: number;
    words: string[];
    truncWords: string[];
};
export declare const mnemonicLanguages: {
    [key in MnemonicWordset]: {
        prefixLen: number;
        words: string[];
        truncWords: string[];
    };
};
