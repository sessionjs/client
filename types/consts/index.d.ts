/** in milliseconds */
export declare const DURATION: {
    /** 1000ms */
    SECONDS: number;
    /** 60 * 1000 = 60,000 ms */
    MINUTES: number;
    /** 60 * 60 * 1000 = 3,600,000 ms */
    HOURS: number;
    /** 24 * 60 * 60 * 1000 = 86,400,000 ms */
    DAYS: number;
    /** 7 * 24 * 60 * 60 * 1000 = 604,800,000 ms */
    WEEKS: number;
};
export declare const TTL_DEFAULT: {
    /** 20 seconds */
    TYPING_MESSAGE: number;
    /** 5 minutes */
    CALL_MESSAGE: number;
    /** 14 days */
    CONTENT_MESSAGE: number;
    /** 30 days */
    CONFIG_MESSAGE: number;
};
export declare const SWARM_POLLING_TIMEOUT: {
    /** 5 seconds */
    ACTIVE: number;
    /** 1 minute */
    MEDIUM_ACTIVE: number;
    /** 2 minutes */
    INACTIVE: number;
};
export declare const PROTOCOLS: {
    HTTP: string;
    HTTPS: string;
};
export declare const CONVERSATION: {
    readonly DEFAULT_MEDIA_FETCH_COUNT: 50;
    readonly DEFAULT_DOCUMENTS_FETCH_COUNT: 100;
    readonly DEFAULT_MESSAGE_FETCH_COUNT: 30;
    readonly MAX_MESSAGE_FETCH_COUNT: 1000;
    /** in seconds */
    readonly MAX_VOICE_MESSAGE_DURATION: 300;
    readonly MAX_CONVO_UNREAD_COUNT: 999;
    readonly MAX_GLOBAL_UNREAD_COUNT: 99;
};
/**
 * The file server and onion request max upload size is 10MB precisely.
 * 10MB is still ok, but one byte more is not.
 */
export declare const MAX_ATTACHMENT_FILESIZE_BYTES: number;
export declare const VALIDATION: {
    MAX_GROUP_NAME_LENGTH: number;
    CLOSED_GROUP_SIZE_LIMIT: number;
};
export declare const DEFAULT_RECENT_REACTS: string[];
export declare const REACT_LIMIT = 6;
export declare const MAX_USERNAME_BYTES = 64;
export declare const FEATURE_RELEASE_TIMESTAMPS: {
    DISAPPEARING_MESSAGES_V2: number;
    USER_CONFIG: number;
};
