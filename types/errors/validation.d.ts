export declare enum SessionValidationErrorCode {
    InvalidMnemonic = "invalid_mnemonic",
    InvalidDisplayName = "invalid_display_name",
    InvalidSessionID = "invalid_session_id",
    InvalidPoller = "invalid_poller",
    InvalidNamespaces = "invalid_namespaces",
    NotOurPubkeyNotLegacyClosedGroup = "not_our_pubkey_not_legacy_closed_group",
    NotZeroNamespaceNotLegacyClosedGroup = "not_zero_namespace_not_legacy_closed_group",
    UnsupportedFeature = "unsupported_feature",
    InvalidMessage = "invalid_message"
}
/** Validation error, indicating that the developer provided invalid input */
export declare class SessionValidationError extends Error {
    code: SessionValidationErrorCode;
    constructor({ code, message }: {
        code: SessionValidationErrorCode;
        message: string;
    });
}
