import type { PickEnum } from './enums';
export declare enum SnodeNamespaces {
    /**
     * This is the namespace anyone can deposit a message for us
     */
    UserMessages = 0,
    /**
     * This is the namespace used to sync our profile
     */
    UserProfile = 2,
    /**
     * This is the namespace used to sync our contacts
     */
    UserContacts = 3,
    /**
     * This is the namespace used to sync our volatile info (currently read status only)
     */
    ConvoInfoVolatile = 4,
    /**
     *  This is the namespace used to sync our user groups and communities
     */
    UserGroups = 5,
    /** **THIS IS LEGACY AND SHOULD BE USED unless you know how to deal with legacy closed groups**. Use UserGroups instead.
     * The messages sent to a closed group are sent and polled from this namespace
     */
    ClosedGroupMessage = -10
}
/**
 * Returns true if that namespace is associated with the config of a user (not his messages, only configs)
 */
declare function isUserConfigNamespace(namespace: SnodeNamespaces): boolean;
export type SnodeNamespacesGroup = PickEnum<SnodeNamespaces, SnodeNamespaces.ClosedGroupMessage>;
export type SnodeNamespacesUser = PickEnum<SnodeNamespaces, SnodeNamespaces.UserContacts | SnodeNamespaces.UserProfile | SnodeNamespaces.UserMessages>;
declare function maxSizeMap(namespaces: Array<SnodeNamespaces>): {
    namespace: SnodeNamespaces;
    maxSize: number;
}[];
export declare const SnodeNamespace: {
    isUserConfigNamespace: typeof isUserConfigNamespace;
    maxSizeMap: typeof maxSizeMap;
};
export {};
