export declare enum SessionFetchErrorCode {
    RetryWithOtherNode421Error = "retry_with_other_node_421_error",
    NoSnodesAvailable = "no_snodes_available",
    NoSwarmsAvailable = "no_swarms_available",
    FetchFailed = "fetch_failed",
    InvalidResponse = "invalid_response"
}
/** Generic error for cases where developer does something incorrectly */
export declare class SessionFetchError extends Error {
    code: SessionFetchErrorCode;
    constructor({ code, message }: {
        code: SessionFetchErrorCode;
        message: string;
    });
}
