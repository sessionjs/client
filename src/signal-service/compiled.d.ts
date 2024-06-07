import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace signalservice. */
export namespace signalservice {

    /** Properties of an Envelope. */
    interface IEnvelope {

        /** Envelope type */
        type: signalservice.Envelope.Type;

        /** Envelope source */
        source?: (string|null);

        /** Envelope timestamp */
        timestamp: (number|Long);

        /** Envelope content */
        content?: (Uint8Array|null);
    }

    /** Represents an Envelope. */
    class Envelope implements IEnvelope {

        /**
         * Constructs a new Envelope.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IEnvelope);

        /** Envelope type. */
        public type: signalservice.Envelope.Type;

        /** Envelope source. */
        public source: string;

        /** Envelope timestamp. */
        public timestamp: (number|Long);

        /** Envelope content. */
        public content: Uint8Array;

        /**
         * Creates a new Envelope instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Envelope instance
         */
        public static create(properties?: signalservice.IEnvelope): signalservice.Envelope;

        /**
         * Encodes the specified Envelope message. Does not implicitly {@link signalservice.Envelope.verify|verify} messages.
         * @param message Envelope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Envelope message, length delimited. Does not implicitly {@link signalservice.Envelope.verify|verify} messages.
         * @param message Envelope message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IEnvelope, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Envelope message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.Envelope;

        /**
         * Decodes an Envelope message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.Envelope;

        /**
         * Verifies an Envelope message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Envelope
         */
        public static fromObject(object: { [k: string]: any }): signalservice.Envelope;

        /**
         * Creates a plain object from an Envelope message. Also converts values to other types if specified.
         * @param message Envelope
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.Envelope, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Envelope to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Envelope
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Envelope {

        /** Type enum. */
        enum Type {
            SESSION_MESSAGE = 6,
            CLOSED_GROUP_MESSAGE = 7
        }
    }

    /** Properties of a TypingMessage. */
    interface ITypingMessage {

        /** TypingMessage timestamp */
        timestamp: (number|Long);

        /** TypingMessage action */
        action: signalservice.TypingMessage.Action;
    }

    /** Represents a TypingMessage. */
    class TypingMessage implements ITypingMessage {

        /**
         * Constructs a new TypingMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.ITypingMessage);

        /** TypingMessage timestamp. */
        public timestamp: (number|Long);

        /** TypingMessage action. */
        public action: signalservice.TypingMessage.Action;

        /**
         * Creates a new TypingMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TypingMessage instance
         */
        public static create(properties?: signalservice.ITypingMessage): signalservice.TypingMessage;

        /**
         * Encodes the specified TypingMessage message. Does not implicitly {@link signalservice.TypingMessage.verify|verify} messages.
         * @param message TypingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.ITypingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TypingMessage message, length delimited. Does not implicitly {@link signalservice.TypingMessage.verify|verify} messages.
         * @param message TypingMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.ITypingMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TypingMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TypingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.TypingMessage;

        /**
         * Decodes a TypingMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TypingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.TypingMessage;

        /**
         * Verifies a TypingMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TypingMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TypingMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.TypingMessage;

        /**
         * Creates a plain object from a TypingMessage message. Also converts values to other types if specified.
         * @param message TypingMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.TypingMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TypingMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for TypingMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace TypingMessage {

        /** Action enum. */
        enum Action {
            STARTED = 0,
            STOPPED = 1
        }
    }

    /** Properties of an Unsend. */
    interface IUnsend {

        /** Unsend timestamp */
        timestamp: (number|Long);

        /** Unsend author */
        author: string;
    }

    /** Represents an Unsend. */
    class Unsend implements IUnsend {

        /**
         * Constructs a new Unsend.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IUnsend);

        /** Unsend timestamp. */
        public timestamp: (number|Long);

        /** Unsend author. */
        public author: string;

        /**
         * Creates a new Unsend instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Unsend instance
         */
        public static create(properties?: signalservice.IUnsend): signalservice.Unsend;

        /**
         * Encodes the specified Unsend message. Does not implicitly {@link signalservice.Unsend.verify|verify} messages.
         * @param message Unsend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IUnsend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Unsend message, length delimited. Does not implicitly {@link signalservice.Unsend.verify|verify} messages.
         * @param message Unsend message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IUnsend, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Unsend message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Unsend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.Unsend;

        /**
         * Decodes an Unsend message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Unsend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.Unsend;

        /**
         * Verifies an Unsend message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Unsend message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Unsend
         */
        public static fromObject(object: { [k: string]: any }): signalservice.Unsend;

        /**
         * Creates a plain object from an Unsend message. Also converts values to other types if specified.
         * @param message Unsend
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.Unsend, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Unsend to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Unsend
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MessageRequestResponse. */
    interface IMessageRequestResponse {

        /** MessageRequestResponse isApproved */
        isApproved: boolean;

        /** MessageRequestResponse profileKey */
        profileKey?: (Uint8Array|null);

        /** MessageRequestResponse profile */
        profile?: (signalservice.DataMessage.ILokiProfile|null);
    }

    /** Represents a MessageRequestResponse. */
    class MessageRequestResponse implements IMessageRequestResponse {

        /**
         * Constructs a new MessageRequestResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IMessageRequestResponse);

        /** MessageRequestResponse isApproved. */
        public isApproved: boolean;

        /** MessageRequestResponse profileKey. */
        public profileKey: Uint8Array;

        /** MessageRequestResponse profile. */
        public profile?: (signalservice.DataMessage.ILokiProfile|null);

        /**
         * Creates a new MessageRequestResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageRequestResponse instance
         */
        public static create(properties?: signalservice.IMessageRequestResponse): signalservice.MessageRequestResponse;

        /**
         * Encodes the specified MessageRequestResponse message. Does not implicitly {@link signalservice.MessageRequestResponse.verify|verify} messages.
         * @param message MessageRequestResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IMessageRequestResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageRequestResponse message, length delimited. Does not implicitly {@link signalservice.MessageRequestResponse.verify|verify} messages.
         * @param message MessageRequestResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IMessageRequestResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageRequestResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageRequestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.MessageRequestResponse;

        /**
         * Decodes a MessageRequestResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageRequestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.MessageRequestResponse;

        /**
         * Verifies a MessageRequestResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageRequestResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageRequestResponse
         */
        public static fromObject(object: { [k: string]: any }): signalservice.MessageRequestResponse;

        /**
         * Creates a plain object from a MessageRequestResponse message. Also converts values to other types if specified.
         * @param message MessageRequestResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.MessageRequestResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageRequestResponse to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MessageRequestResponse
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a SharedConfigMessage. */
    interface ISharedConfigMessage {

        /** SharedConfigMessage kind */
        kind: signalservice.SharedConfigMessage.Kind;

        /** SharedConfigMessage seqno */
        seqno: (number|Long);

        /** SharedConfigMessage data */
        data: Uint8Array;
    }

    /** Represents a SharedConfigMessage. */
    class SharedConfigMessage implements ISharedConfigMessage {

        /**
         * Constructs a new SharedConfigMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.ISharedConfigMessage);

        /** SharedConfigMessage kind. */
        public kind: signalservice.SharedConfigMessage.Kind;

        /** SharedConfigMessage seqno. */
        public seqno: (number|Long);

        /** SharedConfigMessage data. */
        public data: Uint8Array;

        /**
         * Creates a new SharedConfigMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SharedConfigMessage instance
         */
        public static create(properties?: signalservice.ISharedConfigMessage): signalservice.SharedConfigMessage;

        /**
         * Encodes the specified SharedConfigMessage message. Does not implicitly {@link signalservice.SharedConfigMessage.verify|verify} messages.
         * @param message SharedConfigMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.ISharedConfigMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SharedConfigMessage message, length delimited. Does not implicitly {@link signalservice.SharedConfigMessage.verify|verify} messages.
         * @param message SharedConfigMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.ISharedConfigMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SharedConfigMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SharedConfigMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.SharedConfigMessage;

        /**
         * Decodes a SharedConfigMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SharedConfigMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.SharedConfigMessage;

        /**
         * Verifies a SharedConfigMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SharedConfigMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SharedConfigMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.SharedConfigMessage;

        /**
         * Creates a plain object from a SharedConfigMessage message. Also converts values to other types if specified.
         * @param message SharedConfigMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.SharedConfigMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SharedConfigMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SharedConfigMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace SharedConfigMessage {

        /** Kind enum. */
        enum Kind {
            USER_PROFILE = 1,
            CONTACTS = 2,
            CONVO_INFO_VOLATILE = 3,
            USER_GROUPS = 4
        }
    }

    /** Properties of a Content. */
    interface IContent {

        /** Content dataMessage */
        dataMessage?: (signalservice.IDataMessage|null);

        /** Content callMessage */
        callMessage?: (signalservice.ICallMessage|null);

        /** Content receiptMessage */
        receiptMessage?: (signalservice.IReceiptMessage|null);

        /** Content typingMessage */
        typingMessage?: (signalservice.ITypingMessage|null);

        /** Content configurationMessage */
        configurationMessage?: (signalservice.IConfigurationMessage|null);

        /** Content dataExtractionNotification */
        dataExtractionNotification?: (signalservice.IDataExtractionNotification|null);

        /** Content unsendMessage */
        unsendMessage?: (signalservice.IUnsend|null);

        /** Content messageRequestResponse */
        messageRequestResponse?: (signalservice.IMessageRequestResponse|null);

        /** Content sharedConfigMessage */
        sharedConfigMessage?: (signalservice.ISharedConfigMessage|null);

        /** Content expirationType */
        expirationType?: (signalservice.Content.ExpirationType|null);

        /** Content expirationTimer */
        expirationTimer?: (number|null);
    }

    /** Represents a Content. */
    class Content implements IContent {

        /**
         * Constructs a new Content.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IContent);

        /** Content dataMessage. */
        public dataMessage?: (signalservice.IDataMessage|null);

        /** Content callMessage. */
        public callMessage?: (signalservice.ICallMessage|null);

        /** Content receiptMessage. */
        public receiptMessage?: (signalservice.IReceiptMessage|null);

        /** Content typingMessage. */
        public typingMessage?: (signalservice.ITypingMessage|null);

        /** Content configurationMessage. */
        public configurationMessage?: (signalservice.IConfigurationMessage|null);

        /** Content dataExtractionNotification. */
        public dataExtractionNotification?: (signalservice.IDataExtractionNotification|null);

        /** Content unsendMessage. */
        public unsendMessage?: (signalservice.IUnsend|null);

        /** Content messageRequestResponse. */
        public messageRequestResponse?: (signalservice.IMessageRequestResponse|null);

        /** Content sharedConfigMessage. */
        public sharedConfigMessage?: (signalservice.ISharedConfigMessage|null);

        /** Content expirationType. */
        public expirationType: signalservice.Content.ExpirationType;

        /** Content expirationTimer. */
        public expirationTimer: number;

        /**
         * Creates a new Content instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Content instance
         */
        public static create(properties?: signalservice.IContent): signalservice.Content;

        /**
         * Encodes the specified Content message. Does not implicitly {@link signalservice.Content.verify|verify} messages.
         * @param message Content message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IContent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Content message, length delimited. Does not implicitly {@link signalservice.Content.verify|verify} messages.
         * @param message Content message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IContent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Content message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.Content;

        /**
         * Decodes a Content message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.Content;

        /**
         * Verifies a Content message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Content message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Content
         */
        public static fromObject(object: { [k: string]: any }): signalservice.Content;

        /**
         * Creates a plain object from a Content message. Also converts values to other types if specified.
         * @param message Content
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.Content, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Content to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Content
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace Content {

        /** ExpirationType enum. */
        enum ExpirationType {
            UNKNOWN = 0,
            DELETE_AFTER_READ = 1,
            DELETE_AFTER_SEND = 2
        }
    }

    /** Properties of a KeyPair. */
    interface IKeyPair {

        /** KeyPair publicKey */
        publicKey: Uint8Array;

        /** KeyPair privateKey */
        privateKey: Uint8Array;
    }

    /** Represents a KeyPair. */
    class KeyPair implements IKeyPair {

        /**
         * Constructs a new KeyPair.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IKeyPair);

        /** KeyPair publicKey. */
        public publicKey: Uint8Array;

        /** KeyPair privateKey. */
        public privateKey: Uint8Array;

        /**
         * Creates a new KeyPair instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KeyPair instance
         */
        public static create(properties?: signalservice.IKeyPair): signalservice.KeyPair;

        /**
         * Encodes the specified KeyPair message. Does not implicitly {@link signalservice.KeyPair.verify|verify} messages.
         * @param message KeyPair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IKeyPair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified KeyPair message, length delimited. Does not implicitly {@link signalservice.KeyPair.verify|verify} messages.
         * @param message KeyPair message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IKeyPair, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KeyPair message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns KeyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.KeyPair;

        /**
         * Decodes a KeyPair message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns KeyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.KeyPair;

        /**
         * Verifies a KeyPair message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a KeyPair message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns KeyPair
         */
        public static fromObject(object: { [k: string]: any }): signalservice.KeyPair;

        /**
         * Creates a plain object from a KeyPair message. Also converts values to other types if specified.
         * @param message KeyPair
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.KeyPair, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this KeyPair to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for KeyPair
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a DataExtractionNotification. */
    interface IDataExtractionNotification {

        /** DataExtractionNotification type */
        type: signalservice.DataExtractionNotification.Type;

        /** DataExtractionNotification timestamp */
        timestamp?: (number|Long|null);
    }

    /** Represents a DataExtractionNotification. */
    class DataExtractionNotification implements IDataExtractionNotification {

        /**
         * Constructs a new DataExtractionNotification.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IDataExtractionNotification);

        /** DataExtractionNotification type. */
        public type: signalservice.DataExtractionNotification.Type;

        /** DataExtractionNotification timestamp. */
        public timestamp: (number|Long);

        /**
         * Creates a new DataExtractionNotification instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataExtractionNotification instance
         */
        public static create(properties?: signalservice.IDataExtractionNotification): signalservice.DataExtractionNotification;

        /**
         * Encodes the specified DataExtractionNotification message. Does not implicitly {@link signalservice.DataExtractionNotification.verify|verify} messages.
         * @param message DataExtractionNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IDataExtractionNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataExtractionNotification message, length delimited. Does not implicitly {@link signalservice.DataExtractionNotification.verify|verify} messages.
         * @param message DataExtractionNotification message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IDataExtractionNotification, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataExtractionNotification message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DataExtractionNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataExtractionNotification;

        /**
         * Decodes a DataExtractionNotification message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DataExtractionNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataExtractionNotification;

        /**
         * Verifies a DataExtractionNotification message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataExtractionNotification message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataExtractionNotification
         */
        public static fromObject(object: { [k: string]: any }): signalservice.DataExtractionNotification;

        /**
         * Creates a plain object from a DataExtractionNotification message. Also converts values to other types if specified.
         * @param message DataExtractionNotification
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.DataExtractionNotification, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataExtractionNotification to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DataExtractionNotification
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace DataExtractionNotification {

        /** Type enum. */
        enum Type {
            SCREENSHOT = 1,
            MEDIA_SAVED = 2
        }
    }

    /** Properties of a DataMessage. */
    interface IDataMessage {

        /** DataMessage body */
        body?: (string|null);

        /** DataMessage attachments */
        attachments?: (signalservice.IAttachmentPointer[]|null);

        /** DataMessage group */
        group?: (signalservice.IGroupContext|null);

        /** DataMessage flags */
        flags?: (number|null);

        /** DataMessage expireTimer */
        expireTimer?: (number|null);

        /** DataMessage profileKey */
        profileKey?: (Uint8Array|null);

        /** DataMessage timestamp */
        timestamp?: (number|Long|null);

        /** DataMessage quote */
        quote?: (signalservice.DataMessage.IQuote|null);

        /** DataMessage preview */
        preview?: (signalservice.DataMessage.IPreview[]|null);

        /** DataMessage reaction */
        reaction?: (signalservice.DataMessage.IReaction|null);

        /** DataMessage profile */
        profile?: (signalservice.DataMessage.ILokiProfile|null);

        /** DataMessage openGroupInvitation */
        openGroupInvitation?: (signalservice.DataMessage.IOpenGroupInvitation|null);

        /** DataMessage closedGroupControlMessage */
        closedGroupControlMessage?: (signalservice.DataMessage.IClosedGroupControlMessage|null);

        /** DataMessage syncTarget */
        syncTarget?: (string|null);

        /** DataMessage blocksCommunityMessageRequests */
        blocksCommunityMessageRequests?: (boolean|null);
    }

    /** Represents a DataMessage. */
    class DataMessage implements IDataMessage {

        /**
         * Constructs a new DataMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IDataMessage);

        /** DataMessage body. */
        public body: string;

        /** DataMessage attachments. */
        public attachments: signalservice.IAttachmentPointer[];

        /** DataMessage group. */
        public group?: (signalservice.IGroupContext|null);

        /** DataMessage flags. */
        public flags: number;

        /** DataMessage expireTimer. */
        public expireTimer: number;

        /** DataMessage profileKey. */
        public profileKey: Uint8Array;

        /** DataMessage timestamp. */
        public timestamp: (number|Long);

        /** DataMessage quote. */
        public quote?: (signalservice.DataMessage.IQuote|null);

        /** DataMessage preview. */
        public preview: signalservice.DataMessage.IPreview[];

        /** DataMessage reaction. */
        public reaction?: (signalservice.DataMessage.IReaction|null);

        /** DataMessage profile. */
        public profile?: (signalservice.DataMessage.ILokiProfile|null);

        /** DataMessage openGroupInvitation. */
        public openGroupInvitation?: (signalservice.DataMessage.IOpenGroupInvitation|null);

        /** DataMessage closedGroupControlMessage. */
        public closedGroupControlMessage?: (signalservice.DataMessage.IClosedGroupControlMessage|null);

        /** DataMessage syncTarget. */
        public syncTarget: string;

        /** DataMessage blocksCommunityMessageRequests. */
        public blocksCommunityMessageRequests: boolean;

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DataMessage instance
         */
        public static create(properties?: signalservice.IDataMessage): signalservice.DataMessage;

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link signalservice.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link signalservice.DataMessage.verify|verify} messages.
         * @param message DataMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IDataMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage;

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage;

        /**
         * Verifies a DataMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DataMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.DataMessage;

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @param message DataMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.DataMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DataMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for DataMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace DataMessage {

        /** Flags enum. */
        enum Flags {
            EXPIRATION_TIMER_UPDATE = 2
        }

        /** Properties of a Reaction. */
        interface IReaction {

            /** Reaction id */
            id: (number|Long);

            /** Reaction author */
            author: string;

            /** Reaction emoji */
            emoji?: (string|null);

            /** Reaction action */
            action: signalservice.DataMessage.Reaction.Action;
        }

        /** Represents a Reaction. */
        class Reaction implements IReaction {

            /**
             * Constructs a new Reaction.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.IReaction);

            /** Reaction id. */
            public id: (number|Long);

            /** Reaction author. */
            public author: string;

            /** Reaction emoji. */
            public emoji: string;

            /** Reaction action. */
            public action: signalservice.DataMessage.Reaction.Action;

            /**
             * Creates a new Reaction instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Reaction instance
             */
            public static create(properties?: signalservice.DataMessage.IReaction): signalservice.DataMessage.Reaction;

            /**
             * Encodes the specified Reaction message. Does not implicitly {@link signalservice.DataMessage.Reaction.verify|verify} messages.
             * @param message Reaction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.IReaction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Reaction message, length delimited. Does not implicitly {@link signalservice.DataMessage.Reaction.verify|verify} messages.
             * @param message Reaction message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.IReaction, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Reaction message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Reaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.Reaction;

            /**
             * Decodes a Reaction message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Reaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.Reaction;

            /**
             * Verifies a Reaction message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Reaction message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Reaction
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.Reaction;

            /**
             * Creates a plain object from a Reaction message. Also converts values to other types if specified.
             * @param message Reaction
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.Reaction, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Reaction to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Reaction
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Reaction {

            /** Action enum. */
            enum Action {
                REACT = 0,
                REMOVE = 1
            }
        }

        /** Properties of a Quote. */
        interface IQuote {

            /** Quote id */
            id: (number|Long);

            /** Quote author */
            author: string;

            /** Quote text */
            text?: (string|null);

            /** Quote attachments */
            attachments?: (signalservice.DataMessage.Quote.IQuotedAttachment[]|null);
        }

        /** Represents a Quote. */
        class Quote implements IQuote {

            /**
             * Constructs a new Quote.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.IQuote);

            /** Quote id. */
            public id: (number|Long);

            /** Quote author. */
            public author: string;

            /** Quote text. */
            public text: string;

            /** Quote attachments. */
            public attachments: signalservice.DataMessage.Quote.IQuotedAttachment[];

            /**
             * Creates a new Quote instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Quote instance
             */
            public static create(properties?: signalservice.DataMessage.IQuote): signalservice.DataMessage.Quote;

            /**
             * Encodes the specified Quote message. Does not implicitly {@link signalservice.DataMessage.Quote.verify|verify} messages.
             * @param message Quote message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.IQuote, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Quote message, length delimited. Does not implicitly {@link signalservice.DataMessage.Quote.verify|verify} messages.
             * @param message Quote message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.IQuote, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Quote message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Quote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.Quote;

            /**
             * Decodes a Quote message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Quote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.Quote;

            /**
             * Verifies a Quote message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Quote message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Quote
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.Quote;

            /**
             * Creates a plain object from a Quote message. Also converts values to other types if specified.
             * @param message Quote
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.Quote, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Quote to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Quote
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace Quote {

            /** Properties of a QuotedAttachment. */
            interface IQuotedAttachment {

                /** QuotedAttachment contentType */
                contentType?: (string|null);

                /** QuotedAttachment fileName */
                fileName?: (string|null);

                /** QuotedAttachment thumbnail */
                thumbnail?: (signalservice.IAttachmentPointer|null);
            }

            /** Represents a QuotedAttachment. */
            class QuotedAttachment implements IQuotedAttachment {

                /**
                 * Constructs a new QuotedAttachment.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: signalservice.DataMessage.Quote.IQuotedAttachment);

                /** QuotedAttachment contentType. */
                public contentType: string;

                /** QuotedAttachment fileName. */
                public fileName: string;

                /** QuotedAttachment thumbnail. */
                public thumbnail?: (signalservice.IAttachmentPointer|null);

                /**
                 * Creates a new QuotedAttachment instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns QuotedAttachment instance
                 */
                public static create(properties?: signalservice.DataMessage.Quote.IQuotedAttachment): signalservice.DataMessage.Quote.QuotedAttachment;

                /**
                 * Encodes the specified QuotedAttachment message. Does not implicitly {@link signalservice.DataMessage.Quote.QuotedAttachment.verify|verify} messages.
                 * @param message QuotedAttachment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: signalservice.DataMessage.Quote.IQuotedAttachment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified QuotedAttachment message, length delimited. Does not implicitly {@link signalservice.DataMessage.Quote.QuotedAttachment.verify|verify} messages.
                 * @param message QuotedAttachment message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: signalservice.DataMessage.Quote.IQuotedAttachment, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a QuotedAttachment message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns QuotedAttachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.Quote.QuotedAttachment;

                /**
                 * Decodes a QuotedAttachment message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns QuotedAttachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.Quote.QuotedAttachment;

                /**
                 * Verifies a QuotedAttachment message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a QuotedAttachment message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns QuotedAttachment
                 */
                public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.Quote.QuotedAttachment;

                /**
                 * Creates a plain object from a QuotedAttachment message. Also converts values to other types if specified.
                 * @param message QuotedAttachment
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: signalservice.DataMessage.Quote.QuotedAttachment, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this QuotedAttachment to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for QuotedAttachment
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }

        /** Properties of a Preview. */
        interface IPreview {

            /** Preview url */
            url: string;

            /** Preview title */
            title?: (string|null);

            /** Preview image */
            image?: (signalservice.IAttachmentPointer|null);
        }

        /** Represents a Preview. */
        class Preview implements IPreview {

            /**
             * Constructs a new Preview.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.IPreview);

            /** Preview url. */
            public url: string;

            /** Preview title. */
            public title: string;

            /** Preview image. */
            public image?: (signalservice.IAttachmentPointer|null);

            /**
             * Creates a new Preview instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Preview instance
             */
            public static create(properties?: signalservice.DataMessage.IPreview): signalservice.DataMessage.Preview;

            /**
             * Encodes the specified Preview message. Does not implicitly {@link signalservice.DataMessage.Preview.verify|verify} messages.
             * @param message Preview message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.IPreview, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Preview message, length delimited. Does not implicitly {@link signalservice.DataMessage.Preview.verify|verify} messages.
             * @param message Preview message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.IPreview, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Preview message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Preview
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.Preview;

            /**
             * Decodes a Preview message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Preview
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.Preview;

            /**
             * Verifies a Preview message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Preview message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Preview
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.Preview;

            /**
             * Creates a plain object from a Preview message. Also converts values to other types if specified.
             * @param message Preview
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.Preview, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Preview to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Preview
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a LokiProfile. */
        interface ILokiProfile {

            /** LokiProfile displayName */
            displayName?: (string|null);

            /** LokiProfile profilePicture */
            profilePicture?: (string|null);
        }

        /** Represents a LokiProfile. */
        class LokiProfile implements ILokiProfile {

            /**
             * Constructs a new LokiProfile.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.ILokiProfile);

            /** LokiProfile displayName. */
            public displayName: string;

            /** LokiProfile profilePicture. */
            public profilePicture: string;

            /**
             * Creates a new LokiProfile instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LokiProfile instance
             */
            public static create(properties?: signalservice.DataMessage.ILokiProfile): signalservice.DataMessage.LokiProfile;

            /**
             * Encodes the specified LokiProfile message. Does not implicitly {@link signalservice.DataMessage.LokiProfile.verify|verify} messages.
             * @param message LokiProfile message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.ILokiProfile, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LokiProfile message, length delimited. Does not implicitly {@link signalservice.DataMessage.LokiProfile.verify|verify} messages.
             * @param message LokiProfile message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.ILokiProfile, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LokiProfile message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LokiProfile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.LokiProfile;

            /**
             * Decodes a LokiProfile message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LokiProfile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.LokiProfile;

            /**
             * Verifies a LokiProfile message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LokiProfile message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LokiProfile
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.LokiProfile;

            /**
             * Creates a plain object from a LokiProfile message. Also converts values to other types if specified.
             * @param message LokiProfile
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.LokiProfile, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LokiProfile to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LokiProfile
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an OpenGroupInvitation. */
        interface IOpenGroupInvitation {

            /** OpenGroupInvitation url */
            url: string;

            /** OpenGroupInvitation name */
            name: string;
        }

        /** Represents an OpenGroupInvitation. */
        class OpenGroupInvitation implements IOpenGroupInvitation {

            /**
             * Constructs a new OpenGroupInvitation.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.IOpenGroupInvitation);

            /** OpenGroupInvitation url. */
            public url: string;

            /** OpenGroupInvitation name. */
            public name: string;

            /**
             * Creates a new OpenGroupInvitation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns OpenGroupInvitation instance
             */
            public static create(properties?: signalservice.DataMessage.IOpenGroupInvitation): signalservice.DataMessage.OpenGroupInvitation;

            /**
             * Encodes the specified OpenGroupInvitation message. Does not implicitly {@link signalservice.DataMessage.OpenGroupInvitation.verify|verify} messages.
             * @param message OpenGroupInvitation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.IOpenGroupInvitation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified OpenGroupInvitation message, length delimited. Does not implicitly {@link signalservice.DataMessage.OpenGroupInvitation.verify|verify} messages.
             * @param message OpenGroupInvitation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.IOpenGroupInvitation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an OpenGroupInvitation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns OpenGroupInvitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.OpenGroupInvitation;

            /**
             * Decodes an OpenGroupInvitation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns OpenGroupInvitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.OpenGroupInvitation;

            /**
             * Verifies an OpenGroupInvitation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an OpenGroupInvitation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns OpenGroupInvitation
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.OpenGroupInvitation;

            /**
             * Creates a plain object from an OpenGroupInvitation message. Also converts values to other types if specified.
             * @param message OpenGroupInvitation
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.OpenGroupInvitation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this OpenGroupInvitation to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for OpenGroupInvitation
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a ClosedGroupControlMessage. */
        interface IClosedGroupControlMessage {

            /** ClosedGroupControlMessage type */
            type: signalservice.DataMessage.ClosedGroupControlMessage.Type;

            /** ClosedGroupControlMessage publicKey */
            publicKey?: (Uint8Array|null);

            /** ClosedGroupControlMessage name */
            name?: (string|null);

            /** ClosedGroupControlMessage encryptionKeyPair */
            encryptionKeyPair?: (signalservice.IKeyPair|null);

            /** ClosedGroupControlMessage members */
            members?: (Uint8Array[]|null);

            /** ClosedGroupControlMessage admins */
            admins?: (Uint8Array[]|null);

            /** ClosedGroupControlMessage wrappers */
            wrappers?: (signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper[]|null);

            /** ClosedGroupControlMessage expirationTimer */
            expirationTimer?: (number|null);
        }

        /** Represents a ClosedGroupControlMessage. */
        class ClosedGroupControlMessage implements IClosedGroupControlMessage {

            /**
             * Constructs a new ClosedGroupControlMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.DataMessage.IClosedGroupControlMessage);

            /** ClosedGroupControlMessage type. */
            public type: signalservice.DataMessage.ClosedGroupControlMessage.Type;

            /** ClosedGroupControlMessage publicKey. */
            public publicKey: Uint8Array;

            /** ClosedGroupControlMessage name. */
            public name: string;

            /** ClosedGroupControlMessage encryptionKeyPair. */
            public encryptionKeyPair?: (signalservice.IKeyPair|null);

            /** ClosedGroupControlMessage members. */
            public members: Uint8Array[];

            /** ClosedGroupControlMessage admins. */
            public admins: Uint8Array[];

            /** ClosedGroupControlMessage wrappers. */
            public wrappers: signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper[];

            /** ClosedGroupControlMessage expirationTimer. */
            public expirationTimer: number;

            /**
             * Creates a new ClosedGroupControlMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClosedGroupControlMessage instance
             */
            public static create(properties?: signalservice.DataMessage.IClosedGroupControlMessage): signalservice.DataMessage.ClosedGroupControlMessage;

            /**
             * Encodes the specified ClosedGroupControlMessage message. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.verify|verify} messages.
             * @param message ClosedGroupControlMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.DataMessage.IClosedGroupControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClosedGroupControlMessage message, length delimited. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.verify|verify} messages.
             * @param message ClosedGroupControlMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.DataMessage.IClosedGroupControlMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClosedGroupControlMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClosedGroupControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.ClosedGroupControlMessage;

            /**
             * Decodes a ClosedGroupControlMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClosedGroupControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.ClosedGroupControlMessage;

            /**
             * Verifies a ClosedGroupControlMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClosedGroupControlMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClosedGroupControlMessage
             */
            public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.ClosedGroupControlMessage;

            /**
             * Creates a plain object from a ClosedGroupControlMessage message. Also converts values to other types if specified.
             * @param message ClosedGroupControlMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.DataMessage.ClosedGroupControlMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClosedGroupControlMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ClosedGroupControlMessage
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        namespace ClosedGroupControlMessage {

            /** Type enum. */
            enum Type {
                NEW = 1,
                ENCRYPTION_KEY_PAIR = 3,
                NAME_CHANGE = 4,
                MEMBERS_ADDED = 5,
                MEMBERS_REMOVED = 6,
                MEMBER_LEFT = 7,
                ENCRYPTION_KEY_PAIR_REQUEST = 8
            }

            /** Properties of a KeyPairWrapper. */
            interface IKeyPairWrapper {

                /** KeyPairWrapper publicKey */
                publicKey: Uint8Array;

                /** KeyPairWrapper encryptedKeyPair */
                encryptedKeyPair: Uint8Array;
            }

            /** Represents a KeyPairWrapper. */
            class KeyPairWrapper implements IKeyPairWrapper {

                /**
                 * Constructs a new KeyPairWrapper.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper);

                /** KeyPairWrapper publicKey. */
                public publicKey: Uint8Array;

                /** KeyPairWrapper encryptedKeyPair. */
                public encryptedKeyPair: Uint8Array;

                /**
                 * Creates a new KeyPairWrapper instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns KeyPairWrapper instance
                 */
                public static create(properties?: signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper): signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper;

                /**
                 * Encodes the specified KeyPairWrapper message. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.verify|verify} messages.
                 * @param message KeyPairWrapper message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified KeyPairWrapper message, length delimited. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.verify|verify} messages.
                 * @param message KeyPairWrapper message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a KeyPairWrapper message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns KeyPairWrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper;

                /**
                 * Decodes a KeyPairWrapper message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns KeyPairWrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper;

                /**
                 * Verifies a KeyPairWrapper message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a KeyPairWrapper message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns KeyPairWrapper
                 */
                public static fromObject(object: { [k: string]: any }): signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper;

                /**
                 * Creates a plain object from a KeyPairWrapper message. Also converts values to other types if specified.
                 * @param message KeyPairWrapper
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this KeyPairWrapper to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for KeyPairWrapper
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }

    /** Properties of a CallMessage. */
    interface ICallMessage {

        /** CallMessage type */
        type: signalservice.CallMessage.Type;

        /** CallMessage sdps */
        sdps?: (string[]|null);

        /** CallMessage sdpMLineIndexes */
        sdpMLineIndexes?: (number[]|null);

        /** CallMessage sdpMids */
        sdpMids?: (string[]|null);

        /** CallMessage uuid */
        uuid: string;
    }

    /** Represents a CallMessage. */
    class CallMessage implements ICallMessage {

        /**
         * Constructs a new CallMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.ICallMessage);

        /** CallMessage type. */
        public type: signalservice.CallMessage.Type;

        /** CallMessage sdps. */
        public sdps: string[];

        /** CallMessage sdpMLineIndexes. */
        public sdpMLineIndexes: number[];

        /** CallMessage sdpMids. */
        public sdpMids: string[];

        /** CallMessage uuid. */
        public uuid: string;

        /**
         * Creates a new CallMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CallMessage instance
         */
        public static create(properties?: signalservice.ICallMessage): signalservice.CallMessage;

        /**
         * Encodes the specified CallMessage message. Does not implicitly {@link signalservice.CallMessage.verify|verify} messages.
         * @param message CallMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.ICallMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CallMessage message, length delimited. Does not implicitly {@link signalservice.CallMessage.verify|verify} messages.
         * @param message CallMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.ICallMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CallMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CallMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.CallMessage;

        /**
         * Decodes a CallMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CallMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.CallMessage;

        /**
         * Verifies a CallMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CallMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CallMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.CallMessage;

        /**
         * Creates a plain object from a CallMessage message. Also converts values to other types if specified.
         * @param message CallMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.CallMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CallMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for CallMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace CallMessage {

        /** Type enum. */
        enum Type {
            PRE_OFFER = 6,
            OFFER = 1,
            ANSWER = 2,
            PROVISIONAL_ANSWER = 3,
            ICE_CANDIDATES = 4,
            END_CALL = 5
        }
    }

    /** Properties of a ConfigurationMessage. */
    interface IConfigurationMessage {

        /** ConfigurationMessage closedGroups */
        closedGroups?: (signalservice.ConfigurationMessage.IClosedGroup[]|null);

        /** ConfigurationMessage openGroups */
        openGroups?: (string[]|null);

        /** ConfigurationMessage displayName */
        displayName?: (string|null);

        /** ConfigurationMessage profilePicture */
        profilePicture?: (string|null);

        /** ConfigurationMessage profileKey */
        profileKey?: (Uint8Array|null);

        /** ConfigurationMessage contacts */
        contacts?: (signalservice.ConfigurationMessage.IContact[]|null);
    }

    /** Represents a ConfigurationMessage. */
    class ConfigurationMessage implements IConfigurationMessage {

        /**
         * Constructs a new ConfigurationMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IConfigurationMessage);

        /** ConfigurationMessage closedGroups. */
        public closedGroups: signalservice.ConfigurationMessage.IClosedGroup[];

        /** ConfigurationMessage openGroups. */
        public openGroups: string[];

        /** ConfigurationMessage displayName. */
        public displayName: string;

        /** ConfigurationMessage profilePicture. */
        public profilePicture: string;

        /** ConfigurationMessage profileKey. */
        public profileKey: Uint8Array;

        /** ConfigurationMessage contacts. */
        public contacts: signalservice.ConfigurationMessage.IContact[];

        /**
         * Creates a new ConfigurationMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConfigurationMessage instance
         */
        public static create(properties?: signalservice.IConfigurationMessage): signalservice.ConfigurationMessage;

        /**
         * Encodes the specified ConfigurationMessage message. Does not implicitly {@link signalservice.ConfigurationMessage.verify|verify} messages.
         * @param message ConfigurationMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IConfigurationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ConfigurationMessage message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.verify|verify} messages.
         * @param message ConfigurationMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IConfigurationMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ConfigurationMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ConfigurationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.ConfigurationMessage;

        /**
         * Decodes a ConfigurationMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ConfigurationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.ConfigurationMessage;

        /**
         * Verifies a ConfigurationMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ConfigurationMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ConfigurationMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.ConfigurationMessage;

        /**
         * Creates a plain object from a ConfigurationMessage message. Also converts values to other types if specified.
         * @param message ConfigurationMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.ConfigurationMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ConfigurationMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ConfigurationMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ConfigurationMessage {

        /** Properties of a ClosedGroup. */
        interface IClosedGroup {

            /** ClosedGroup publicKey */
            publicKey?: (Uint8Array|null);

            /** ClosedGroup name */
            name?: (string|null);

            /** ClosedGroup encryptionKeyPair */
            encryptionKeyPair?: (signalservice.IKeyPair|null);

            /** ClosedGroup members */
            members?: (Uint8Array[]|null);

            /** ClosedGroup admins */
            admins?: (Uint8Array[]|null);
        }

        /** Represents a ClosedGroup. */
        class ClosedGroup implements IClosedGroup {

            /**
             * Constructs a new ClosedGroup.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.ConfigurationMessage.IClosedGroup);

            /** ClosedGroup publicKey. */
            public publicKey: Uint8Array;

            /** ClosedGroup name. */
            public name: string;

            /** ClosedGroup encryptionKeyPair. */
            public encryptionKeyPair?: (signalservice.IKeyPair|null);

            /** ClosedGroup members. */
            public members: Uint8Array[];

            /** ClosedGroup admins. */
            public admins: Uint8Array[];

            /**
             * Creates a new ClosedGroup instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ClosedGroup instance
             */
            public static create(properties?: signalservice.ConfigurationMessage.IClosedGroup): signalservice.ConfigurationMessage.ClosedGroup;

            /**
             * Encodes the specified ClosedGroup message. Does not implicitly {@link signalservice.ConfigurationMessage.ClosedGroup.verify|verify} messages.
             * @param message ClosedGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.ConfigurationMessage.IClosedGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ClosedGroup message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.ClosedGroup.verify|verify} messages.
             * @param message ClosedGroup message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.ConfigurationMessage.IClosedGroup, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ClosedGroup message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ClosedGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.ConfigurationMessage.ClosedGroup;

            /**
             * Decodes a ClosedGroup message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ClosedGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.ConfigurationMessage.ClosedGroup;

            /**
             * Verifies a ClosedGroup message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ClosedGroup message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ClosedGroup
             */
            public static fromObject(object: { [k: string]: any }): signalservice.ConfigurationMessage.ClosedGroup;

            /**
             * Creates a plain object from a ClosedGroup message. Also converts values to other types if specified.
             * @param message ClosedGroup
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.ConfigurationMessage.ClosedGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ClosedGroup to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ClosedGroup
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Contact. */
        interface IContact {

            /** Contact publicKey */
            publicKey: Uint8Array;

            /** Contact name */
            name: string;

            /** Contact profilePicture */
            profilePicture?: (string|null);

            /** Contact profileKey */
            profileKey?: (Uint8Array|null);

            /** Contact isApproved */
            isApproved?: (boolean|null);

            /** Contact isBlocked */
            isBlocked?: (boolean|null);

            /** Contact didApproveMe */
            didApproveMe?: (boolean|null);
        }

        /** Represents a Contact. */
        class Contact implements IContact {

            /**
             * Constructs a new Contact.
             * @param [properties] Properties to set
             */
            constructor(properties?: signalservice.ConfigurationMessage.IContact);

            /** Contact publicKey. */
            public publicKey: Uint8Array;

            /** Contact name. */
            public name: string;

            /** Contact profilePicture. */
            public profilePicture: string;

            /** Contact profileKey. */
            public profileKey: Uint8Array;

            /** Contact isApproved. */
            public isApproved: boolean;

            /** Contact isBlocked. */
            public isBlocked: boolean;

            /** Contact didApproveMe. */
            public didApproveMe: boolean;

            /**
             * Creates a new Contact instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Contact instance
             */
            public static create(properties?: signalservice.ConfigurationMessage.IContact): signalservice.ConfigurationMessage.Contact;

            /**
             * Encodes the specified Contact message. Does not implicitly {@link signalservice.ConfigurationMessage.Contact.verify|verify} messages.
             * @param message Contact message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: signalservice.ConfigurationMessage.IContact, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Contact message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.Contact.verify|verify} messages.
             * @param message Contact message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: signalservice.ConfigurationMessage.IContact, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Contact message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.ConfigurationMessage.Contact;

            /**
             * Decodes a Contact message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.ConfigurationMessage.Contact;

            /**
             * Verifies a Contact message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Contact message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Contact
             */
            public static fromObject(object: { [k: string]: any }): signalservice.ConfigurationMessage.Contact;

            /**
             * Creates a plain object from a Contact message. Also converts values to other types if specified.
             * @param message Contact
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: signalservice.ConfigurationMessage.Contact, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Contact to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Contact
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Properties of a ReceiptMessage. */
    interface IReceiptMessage {

        /** ReceiptMessage type */
        type: signalservice.ReceiptMessage.Type;

        /** ReceiptMessage timestamp */
        timestamp?: ((number|Long)[]|null);
    }

    /** Represents a ReceiptMessage. */
    class ReceiptMessage implements IReceiptMessage {

        /**
         * Constructs a new ReceiptMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IReceiptMessage);

        /** ReceiptMessage type. */
        public type: signalservice.ReceiptMessage.Type;

        /** ReceiptMessage timestamp. */
        public timestamp: (number|Long)[];

        /**
         * Creates a new ReceiptMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReceiptMessage instance
         */
        public static create(properties?: signalservice.IReceiptMessage): signalservice.ReceiptMessage;

        /**
         * Encodes the specified ReceiptMessage message. Does not implicitly {@link signalservice.ReceiptMessage.verify|verify} messages.
         * @param message ReceiptMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IReceiptMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReceiptMessage message, length delimited. Does not implicitly {@link signalservice.ReceiptMessage.verify|verify} messages.
         * @param message ReceiptMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IReceiptMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReceiptMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReceiptMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.ReceiptMessage;

        /**
         * Decodes a ReceiptMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReceiptMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.ReceiptMessage;

        /**
         * Verifies a ReceiptMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReceiptMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReceiptMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.ReceiptMessage;

        /**
         * Creates a plain object from a ReceiptMessage message. Also converts values to other types if specified.
         * @param message ReceiptMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.ReceiptMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReceiptMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ReceiptMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ReceiptMessage {

        /** Type enum. */
        enum Type {
            READ = 1
        }
    }

    /** Properties of an AttachmentPointer. */
    interface IAttachmentPointer {

        /** AttachmentPointer id */
        id: (number|Long);

        /** AttachmentPointer contentType */
        contentType?: (string|null);

        /** AttachmentPointer key */
        key?: (Uint8Array|null);

        /** AttachmentPointer size */
        size?: (number|null);

        /** AttachmentPointer digest */
        digest?: (Uint8Array|null);

        /** AttachmentPointer fileName */
        fileName?: (string|null);

        /** AttachmentPointer flags */
        flags?: (number|null);

        /** AttachmentPointer width */
        width?: (number|null);

        /** AttachmentPointer height */
        height?: (number|null);

        /** AttachmentPointer caption */
        caption?: (string|null);

        /** AttachmentPointer url */
        url?: (string|null);
    }

    /** Represents an AttachmentPointer. */
    class AttachmentPointer implements IAttachmentPointer {

        /**
         * Constructs a new AttachmentPointer.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IAttachmentPointer);

        /** AttachmentPointer id. */
        public id: (number|Long);

        /** AttachmentPointer contentType. */
        public contentType: string;

        /** AttachmentPointer key. */
        public key: Uint8Array;

        /** AttachmentPointer size. */
        public size: number;

        /** AttachmentPointer digest. */
        public digest: Uint8Array;

        /** AttachmentPointer fileName. */
        public fileName: string;

        /** AttachmentPointer flags. */
        public flags: number;

        /** AttachmentPointer width. */
        public width: number;

        /** AttachmentPointer height. */
        public height: number;

        /** AttachmentPointer caption. */
        public caption: string;

        /** AttachmentPointer url. */
        public url: string;

        /**
         * Creates a new AttachmentPointer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AttachmentPointer instance
         */
        public static create(properties?: signalservice.IAttachmentPointer): signalservice.AttachmentPointer;

        /**
         * Encodes the specified AttachmentPointer message. Does not implicitly {@link signalservice.AttachmentPointer.verify|verify} messages.
         * @param message AttachmentPointer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IAttachmentPointer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AttachmentPointer message, length delimited. Does not implicitly {@link signalservice.AttachmentPointer.verify|verify} messages.
         * @param message AttachmentPointer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IAttachmentPointer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AttachmentPointer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AttachmentPointer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.AttachmentPointer;

        /**
         * Decodes an AttachmentPointer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AttachmentPointer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.AttachmentPointer;

        /**
         * Verifies an AttachmentPointer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AttachmentPointer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AttachmentPointer
         */
        public static fromObject(object: { [k: string]: any }): signalservice.AttachmentPointer;

        /**
         * Creates a plain object from an AttachmentPointer message. Also converts values to other types if specified.
         * @param message AttachmentPointer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.AttachmentPointer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AttachmentPointer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for AttachmentPointer
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace AttachmentPointer {

        /** Flags enum. */
        enum Flags {
            VOICE_MESSAGE = 1
        }
    }

    /** Properties of a GroupContext. */
    interface IGroupContext {

        /** GroupContext id */
        id?: (Uint8Array|null);

        /** GroupContext type */
        type?: (signalservice.GroupContext.Type|null);

        /** GroupContext name */
        name?: (string|null);

        /** GroupContext members */
        members?: (string[]|null);

        /** GroupContext avatar */
        avatar?: (signalservice.IAttachmentPointer|null);

        /** GroupContext admins */
        admins?: (string[]|null);
    }

    /** Represents a GroupContext. */
    class GroupContext implements IGroupContext {

        /**
         * Constructs a new GroupContext.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IGroupContext);

        /** GroupContext id. */
        public id: Uint8Array;

        /** GroupContext type. */
        public type: signalservice.GroupContext.Type;

        /** GroupContext name. */
        public name: string;

        /** GroupContext members. */
        public members: string[];

        /** GroupContext avatar. */
        public avatar?: (signalservice.IAttachmentPointer|null);

        /** GroupContext admins. */
        public admins: string[];

        /**
         * Creates a new GroupContext instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GroupContext instance
         */
        public static create(properties?: signalservice.IGroupContext): signalservice.GroupContext;

        /**
         * Encodes the specified GroupContext message. Does not implicitly {@link signalservice.GroupContext.verify|verify} messages.
         * @param message GroupContext message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IGroupContext, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GroupContext message, length delimited. Does not implicitly {@link signalservice.GroupContext.verify|verify} messages.
         * @param message GroupContext message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IGroupContext, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GroupContext message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GroupContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.GroupContext;

        /**
         * Decodes a GroupContext message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GroupContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.GroupContext;

        /**
         * Verifies a GroupContext message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GroupContext message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GroupContext
         */
        public static fromObject(object: { [k: string]: any }): signalservice.GroupContext;

        /**
         * Creates a plain object from a GroupContext message. Also converts values to other types if specified.
         * @param message GroupContext
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.GroupContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GroupContext to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GroupContext
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace GroupContext {

        /** Type enum. */
        enum Type {
            UNKNOWN = 0,
            UPDATE = 1,
            DELIVER = 2,
            QUIT = 3,
            REQUEST_INFO = 4
        }
    }

    /** Properties of a WebSocketRequestMessage. */
    interface IWebSocketRequestMessage {

        /** WebSocketRequestMessage verb */
        verb?: (string|null);

        /** WebSocketRequestMessage path */
        path?: (string|null);

        /** WebSocketRequestMessage body */
        body?: (Uint8Array|null);

        /** WebSocketRequestMessage headers */
        headers?: (string[]|null);

        /** WebSocketRequestMessage id */
        id?: (number|Long|null);
    }

    /** Represents a WebSocketRequestMessage. */
    class WebSocketRequestMessage implements IWebSocketRequestMessage {

        /**
         * Constructs a new WebSocketRequestMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IWebSocketRequestMessage);

        /** WebSocketRequestMessage verb. */
        public verb: string;

        /** WebSocketRequestMessage path. */
        public path: string;

        /** WebSocketRequestMessage body. */
        public body: Uint8Array;

        /** WebSocketRequestMessage headers. */
        public headers: string[];

        /** WebSocketRequestMessage id. */
        public id: (number|Long);

        /**
         * Creates a new WebSocketRequestMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebSocketRequestMessage instance
         */
        public static create(properties?: signalservice.IWebSocketRequestMessage): signalservice.WebSocketRequestMessage;

        /**
         * Encodes the specified WebSocketRequestMessage message. Does not implicitly {@link signalservice.WebSocketRequestMessage.verify|verify} messages.
         * @param message WebSocketRequestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IWebSocketRequestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebSocketRequestMessage message, length delimited. Does not implicitly {@link signalservice.WebSocketRequestMessage.verify|verify} messages.
         * @param message WebSocketRequestMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IWebSocketRequestMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebSocketRequestMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebSocketRequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.WebSocketRequestMessage;

        /**
         * Decodes a WebSocketRequestMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebSocketRequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.WebSocketRequestMessage;

        /**
         * Verifies a WebSocketRequestMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebSocketRequestMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebSocketRequestMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.WebSocketRequestMessage;

        /**
         * Creates a plain object from a WebSocketRequestMessage message. Also converts values to other types if specified.
         * @param message WebSocketRequestMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.WebSocketRequestMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebSocketRequestMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WebSocketRequestMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a WebSocketMessage. */
    interface IWebSocketMessage {

        /** WebSocketMessage type */
        type?: (signalservice.WebSocketMessage.Type|null);

        /** WebSocketMessage request */
        request?: (signalservice.IWebSocketRequestMessage|null);
    }

    /** Represents a WebSocketMessage. */
    class WebSocketMessage implements IWebSocketMessage {

        /**
         * Constructs a new WebSocketMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: signalservice.IWebSocketMessage);

        /** WebSocketMessage type. */
        public type: signalservice.WebSocketMessage.Type;

        /** WebSocketMessage request. */
        public request?: (signalservice.IWebSocketRequestMessage|null);

        /**
         * Creates a new WebSocketMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns WebSocketMessage instance
         */
        public static create(properties?: signalservice.IWebSocketMessage): signalservice.WebSocketMessage;

        /**
         * Encodes the specified WebSocketMessage message. Does not implicitly {@link signalservice.WebSocketMessage.verify|verify} messages.
         * @param message WebSocketMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: signalservice.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link signalservice.WebSocketMessage.verify|verify} messages.
         * @param message WebSocketMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: signalservice.IWebSocketMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): signalservice.WebSocketMessage;

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): signalservice.WebSocketMessage;

        /**
         * Verifies a WebSocketMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns WebSocketMessage
         */
        public static fromObject(object: { [k: string]: any }): signalservice.WebSocketMessage;

        /**
         * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
         * @param message WebSocketMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: signalservice.WebSocketMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this WebSocketMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for WebSocketMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace WebSocketMessage {

        /** Type enum. */
        enum Type {
            UNKNOWN = 0,
            REQUEST = 1,
            RESPONSE = 2
        }
    }
}
