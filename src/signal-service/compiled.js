/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const signalservice = $root.signalservice = (() => {

    /**
     * Namespace signalservice.
     * @exports signalservice
     * @namespace
     */
    const signalservice = {};

    signalservice.Envelope = (function() {

        /**
         * Properties of an Envelope.
         * @memberof signalservice
         * @interface IEnvelope
         * @property {signalservice.Envelope.Type} type Envelope type
         * @property {string|null} [source] Envelope source
         * @property {number|Long} timestamp Envelope timestamp
         * @property {Uint8Array|null} [content] Envelope content
         */

        /**
         * Constructs a new Envelope.
         * @memberof signalservice
         * @classdesc Represents an Envelope.
         * @implements IEnvelope
         * @constructor
         * @param {signalservice.IEnvelope=} [properties] Properties to set
         */
        function Envelope(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Envelope type.
         * @member {signalservice.Envelope.Type} type
         * @memberof signalservice.Envelope
         * @instance
         */
        Envelope.prototype.type = 6;

        /**
         * Envelope source.
         * @member {string} source
         * @memberof signalservice.Envelope
         * @instance
         */
        Envelope.prototype.source = "";

        /**
         * Envelope timestamp.
         * @member {number|Long} timestamp
         * @memberof signalservice.Envelope
         * @instance
         */
        Envelope.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Envelope content.
         * @member {Uint8Array} content
         * @memberof signalservice.Envelope
         * @instance
         */
        Envelope.prototype.content = $util.newBuffer([]);

        /**
         * Creates a new Envelope instance using the specified properties.
         * @function create
         * @memberof signalservice.Envelope
         * @static
         * @param {signalservice.IEnvelope=} [properties] Properties to set
         * @returns {signalservice.Envelope} Envelope instance
         */
        Envelope.create = function create(properties) {
            return new Envelope(properties);
        };

        /**
         * Encodes the specified Envelope message. Does not implicitly {@link signalservice.Envelope.verify|verify} messages.
         * @function encode
         * @memberof signalservice.Envelope
         * @static
         * @param {signalservice.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.source != null && Object.hasOwnProperty.call(message, "source"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.source);
            writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.timestamp);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.content);
            return writer;
        };

        /**
         * Encodes the specified Envelope message, length delimited. Does not implicitly {@link signalservice.Envelope.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.Envelope
         * @static
         * @param {signalservice.IEnvelope} message Envelope message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Envelope.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.Envelope();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.source = reader.string();
                        break;
                    }
                case 5: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                case 8: {
                        message.content = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("timestamp"))
                throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
            return message;
        };

        /**
         * Decodes an Envelope message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.Envelope
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.Envelope} Envelope
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Envelope.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Envelope message.
         * @function verify
         * @memberof signalservice.Envelope
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Envelope.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 6:
            case 7:
                break;
            }
            if (message.source != null && message.hasOwnProperty("source"))
                if (!$util.isString(message.source))
                    return "source: string expected";
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!(message.content && typeof message.content.length === "number" || $util.isString(message.content)))
                    return "content: buffer expected";
            return null;
        };

        /**
         * Creates an Envelope message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.Envelope
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.Envelope} Envelope
         */
        Envelope.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.Envelope)
                return object;
            let message = new $root.signalservice.Envelope();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "SESSION_MESSAGE":
            case 6:
                message.type = 6;
                break;
            case "CLOSED_GROUP_MESSAGE":
            case 7:
                message.type = 7;
                break;
            }
            if (object.source != null)
                message.source = String(object.source);
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            if (object.content != null)
                if (typeof object.content === "string")
                    $util.base64.decode(object.content, message.content = $util.newBuffer($util.base64.length(object.content)), 0);
                else if (object.content.length >= 0)
                    message.content = object.content;
            return message;
        };

        /**
         * Creates a plain object from an Envelope message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.Envelope
         * @static
         * @param {signalservice.Envelope} message Envelope
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Envelope.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "SESSION_MESSAGE" : 6;
                object.source = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.content = "";
                else {
                    object.content = [];
                    if (options.bytes !== Array)
                        object.content = $util.newBuffer(object.content);
                }
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.Envelope.Type[message.type] === undefined ? message.type : $root.signalservice.Envelope.Type[message.type] : message.type;
            if (message.source != null && message.hasOwnProperty("source"))
                object.source = message.source;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = options.bytes === String ? $util.base64.encode(message.content, 0, message.content.length) : options.bytes === Array ? Array.prototype.slice.call(message.content) : message.content;
            return object;
        };

        /**
         * Converts this Envelope to JSON.
         * @function toJSON
         * @memberof signalservice.Envelope
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Envelope.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Envelope
         * @function getTypeUrl
         * @memberof signalservice.Envelope
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Envelope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.Envelope";
        };

        /**
         * Type enum.
         * @name signalservice.Envelope.Type
         * @enum {number}
         * @property {number} SESSION_MESSAGE=6 SESSION_MESSAGE value
         * @property {number} CLOSED_GROUP_MESSAGE=7 CLOSED_GROUP_MESSAGE value
         */
        Envelope.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[6] = "SESSION_MESSAGE"] = 6;
            values[valuesById[7] = "CLOSED_GROUP_MESSAGE"] = 7;
            return values;
        })();

        return Envelope;
    })();

    signalservice.TypingMessage = (function() {

        /**
         * Properties of a TypingMessage.
         * @memberof signalservice
         * @interface ITypingMessage
         * @property {number|Long} timestamp TypingMessage timestamp
         * @property {signalservice.TypingMessage.Action} action TypingMessage action
         */

        /**
         * Constructs a new TypingMessage.
         * @memberof signalservice
         * @classdesc Represents a TypingMessage.
         * @implements ITypingMessage
         * @constructor
         * @param {signalservice.ITypingMessage=} [properties] Properties to set
         */
        function TypingMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TypingMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof signalservice.TypingMessage
         * @instance
         */
        TypingMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * TypingMessage action.
         * @member {signalservice.TypingMessage.Action} action
         * @memberof signalservice.TypingMessage
         * @instance
         */
        TypingMessage.prototype.action = 0;

        /**
         * Creates a new TypingMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.TypingMessage
         * @static
         * @param {signalservice.ITypingMessage=} [properties] Properties to set
         * @returns {signalservice.TypingMessage} TypingMessage instance
         */
        TypingMessage.create = function create(properties) {
            return new TypingMessage(properties);
        };

        /**
         * Encodes the specified TypingMessage message. Does not implicitly {@link signalservice.TypingMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.TypingMessage
         * @static
         * @param {signalservice.ITypingMessage} message TypingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TypingMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.action);
            return writer;
        };

        /**
         * Encodes the specified TypingMessage message, length delimited. Does not implicitly {@link signalservice.TypingMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.TypingMessage
         * @static
         * @param {signalservice.ITypingMessage} message TypingMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TypingMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TypingMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.TypingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.TypingMessage} TypingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TypingMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.TypingMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                case 2: {
                        message.action = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("timestamp"))
                throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
            if (!message.hasOwnProperty("action"))
                throw $util.ProtocolError("missing required 'action'", { instance: message });
            return message;
        };

        /**
         * Decodes a TypingMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.TypingMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.TypingMessage} TypingMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TypingMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TypingMessage message.
         * @function verify
         * @memberof signalservice.TypingMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TypingMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
            switch (message.action) {
            default:
                return "action: enum value expected";
            case 0:
            case 1:
                break;
            }
            return null;
        };

        /**
         * Creates a TypingMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.TypingMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.TypingMessage} TypingMessage
         */
        TypingMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.TypingMessage)
                return object;
            let message = new $root.signalservice.TypingMessage();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            switch (object.action) {
            default:
                if (typeof object.action === "number") {
                    message.action = object.action;
                    break;
                }
                break;
            case "STARTED":
            case 0:
                message.action = 0;
                break;
            case "STOPPED":
            case 1:
                message.action = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a TypingMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.TypingMessage
         * @static
         * @param {signalservice.TypingMessage} message TypingMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TypingMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.action = options.enums === String ? "STARTED" : 0;
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = options.enums === String ? $root.signalservice.TypingMessage.Action[message.action] === undefined ? message.action : $root.signalservice.TypingMessage.Action[message.action] : message.action;
            return object;
        };

        /**
         * Converts this TypingMessage to JSON.
         * @function toJSON
         * @memberof signalservice.TypingMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TypingMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for TypingMessage
         * @function getTypeUrl
         * @memberof signalservice.TypingMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        TypingMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.TypingMessage";
        };

        /**
         * Action enum.
         * @name signalservice.TypingMessage.Action
         * @enum {number}
         * @property {number} STARTED=0 STARTED value
         * @property {number} STOPPED=1 STOPPED value
         */
        TypingMessage.Action = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "STARTED"] = 0;
            values[valuesById[1] = "STOPPED"] = 1;
            return values;
        })();

        return TypingMessage;
    })();

    signalservice.Unsend = (function() {

        /**
         * Properties of an Unsend.
         * @memberof signalservice
         * @interface IUnsend
         * @property {number|Long} timestamp Unsend timestamp
         * @property {string} author Unsend author
         */

        /**
         * Constructs a new Unsend.
         * @memberof signalservice
         * @classdesc Represents an Unsend.
         * @implements IUnsend
         * @constructor
         * @param {signalservice.IUnsend=} [properties] Properties to set
         */
        function Unsend(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Unsend timestamp.
         * @member {number|Long} timestamp
         * @memberof signalservice.Unsend
         * @instance
         */
        Unsend.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Unsend author.
         * @member {string} author
         * @memberof signalservice.Unsend
         * @instance
         */
        Unsend.prototype.author = "";

        /**
         * Creates a new Unsend instance using the specified properties.
         * @function create
         * @memberof signalservice.Unsend
         * @static
         * @param {signalservice.IUnsend=} [properties] Properties to set
         * @returns {signalservice.Unsend} Unsend instance
         */
        Unsend.create = function create(properties) {
            return new Unsend(properties);
        };

        /**
         * Encodes the specified Unsend message. Does not implicitly {@link signalservice.Unsend.verify|verify} messages.
         * @function encode
         * @memberof signalservice.Unsend
         * @static
         * @param {signalservice.IUnsend} message Unsend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unsend.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.author);
            return writer;
        };

        /**
         * Encodes the specified Unsend message, length delimited. Does not implicitly {@link signalservice.Unsend.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.Unsend
         * @static
         * @param {signalservice.IUnsend} message Unsend message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Unsend.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Unsend message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.Unsend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.Unsend} Unsend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unsend.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.Unsend();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                case 2: {
                        message.author = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("timestamp"))
                throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
            if (!message.hasOwnProperty("author"))
                throw $util.ProtocolError("missing required 'author'", { instance: message });
            return message;
        };

        /**
         * Decodes an Unsend message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.Unsend
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.Unsend} Unsend
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Unsend.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Unsend message.
         * @function verify
         * @memberof signalservice.Unsend
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Unsend.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                return "timestamp: integer|Long expected";
            if (!$util.isString(message.author))
                return "author: string expected";
            return null;
        };

        /**
         * Creates an Unsend message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.Unsend
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.Unsend} Unsend
         */
        Unsend.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.Unsend)
                return object;
            let message = new $root.signalservice.Unsend();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            if (object.author != null)
                message.author = String(object.author);
            return message;
        };

        /**
         * Creates a plain object from an Unsend message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.Unsend
         * @static
         * @param {signalservice.Unsend} message Unsend
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Unsend.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.author = "";
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.author != null && message.hasOwnProperty("author"))
                object.author = message.author;
            return object;
        };

        /**
         * Converts this Unsend to JSON.
         * @function toJSON
         * @memberof signalservice.Unsend
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Unsend.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Unsend
         * @function getTypeUrl
         * @memberof signalservice.Unsend
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Unsend.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.Unsend";
        };

        return Unsend;
    })();

    signalservice.MessageRequestResponse = (function() {

        /**
         * Properties of a MessageRequestResponse.
         * @memberof signalservice
         * @interface IMessageRequestResponse
         * @property {boolean} isApproved MessageRequestResponse isApproved
         * @property {Uint8Array|null} [profileKey] MessageRequestResponse profileKey
         * @property {signalservice.DataMessage.ILokiProfile|null} [profile] MessageRequestResponse profile
         */

        /**
         * Constructs a new MessageRequestResponse.
         * @memberof signalservice
         * @classdesc Represents a MessageRequestResponse.
         * @implements IMessageRequestResponse
         * @constructor
         * @param {signalservice.IMessageRequestResponse=} [properties] Properties to set
         */
        function MessageRequestResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageRequestResponse isApproved.
         * @member {boolean} isApproved
         * @memberof signalservice.MessageRequestResponse
         * @instance
         */
        MessageRequestResponse.prototype.isApproved = false;

        /**
         * MessageRequestResponse profileKey.
         * @member {Uint8Array} profileKey
         * @memberof signalservice.MessageRequestResponse
         * @instance
         */
        MessageRequestResponse.prototype.profileKey = $util.newBuffer([]);

        /**
         * MessageRequestResponse profile.
         * @member {signalservice.DataMessage.ILokiProfile|null|undefined} profile
         * @memberof signalservice.MessageRequestResponse
         * @instance
         */
        MessageRequestResponse.prototype.profile = null;

        /**
         * Creates a new MessageRequestResponse instance using the specified properties.
         * @function create
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {signalservice.IMessageRequestResponse=} [properties] Properties to set
         * @returns {signalservice.MessageRequestResponse} MessageRequestResponse instance
         */
        MessageRequestResponse.create = function create(properties) {
            return new MessageRequestResponse(properties);
        };

        /**
         * Encodes the specified MessageRequestResponse message. Does not implicitly {@link signalservice.MessageRequestResponse.verify|verify} messages.
         * @function encode
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {signalservice.IMessageRequestResponse} message MessageRequestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageRequestResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isApproved);
            if (message.profileKey != null && Object.hasOwnProperty.call(message, "profileKey"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.profileKey);
            if (message.profile != null && Object.hasOwnProperty.call(message, "profile"))
                $root.signalservice.DataMessage.LokiProfile.encode(message.profile, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MessageRequestResponse message, length delimited. Does not implicitly {@link signalservice.MessageRequestResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {signalservice.IMessageRequestResponse} message MessageRequestResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageRequestResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageRequestResponse message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.MessageRequestResponse} MessageRequestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageRequestResponse.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.MessageRequestResponse();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.isApproved = reader.bool();
                        break;
                    }
                case 2: {
                        message.profileKey = reader.bytes();
                        break;
                    }
                case 3: {
                        message.profile = $root.signalservice.DataMessage.LokiProfile.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("isApproved"))
                throw $util.ProtocolError("missing required 'isApproved'", { instance: message });
            return message;
        };

        /**
         * Decodes a MessageRequestResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.MessageRequestResponse} MessageRequestResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageRequestResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageRequestResponse message.
         * @function verify
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageRequestResponse.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (typeof message.isApproved !== "boolean")
                return "isApproved: boolean expected";
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                if (!(message.profileKey && typeof message.profileKey.length === "number" || $util.isString(message.profileKey)))
                    return "profileKey: buffer expected";
            if (message.profile != null && message.hasOwnProperty("profile")) {
                let error = $root.signalservice.DataMessage.LokiProfile.verify(message.profile);
                if (error)
                    return "profile." + error;
            }
            return null;
        };

        /**
         * Creates a MessageRequestResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.MessageRequestResponse} MessageRequestResponse
         */
        MessageRequestResponse.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.MessageRequestResponse)
                return object;
            let message = new $root.signalservice.MessageRequestResponse();
            if (object.isApproved != null)
                message.isApproved = Boolean(object.isApproved);
            if (object.profileKey != null)
                if (typeof object.profileKey === "string")
                    $util.base64.decode(object.profileKey, message.profileKey = $util.newBuffer($util.base64.length(object.profileKey)), 0);
                else if (object.profileKey.length >= 0)
                    message.profileKey = object.profileKey;
            if (object.profile != null) {
                if (typeof object.profile !== "object")
                    throw TypeError(".signalservice.MessageRequestResponse.profile: object expected");
                message.profile = $root.signalservice.DataMessage.LokiProfile.fromObject(object.profile);
            }
            return message;
        };

        /**
         * Creates a plain object from a MessageRequestResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {signalservice.MessageRequestResponse} message MessageRequestResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageRequestResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.isApproved = false;
                if (options.bytes === String)
                    object.profileKey = "";
                else {
                    object.profileKey = [];
                    if (options.bytes !== Array)
                        object.profileKey = $util.newBuffer(object.profileKey);
                }
                object.profile = null;
            }
            if (message.isApproved != null && message.hasOwnProperty("isApproved"))
                object.isApproved = message.isApproved;
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                object.profileKey = options.bytes === String ? $util.base64.encode(message.profileKey, 0, message.profileKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.profileKey) : message.profileKey;
            if (message.profile != null && message.hasOwnProperty("profile"))
                object.profile = $root.signalservice.DataMessage.LokiProfile.toObject(message.profile, options);
            return object;
        };

        /**
         * Converts this MessageRequestResponse to JSON.
         * @function toJSON
         * @memberof signalservice.MessageRequestResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageRequestResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageRequestResponse
         * @function getTypeUrl
         * @memberof signalservice.MessageRequestResponse
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageRequestResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.MessageRequestResponse";
        };

        return MessageRequestResponse;
    })();

    signalservice.SharedConfigMessage = (function() {

        /**
         * Properties of a SharedConfigMessage.
         * @memberof signalservice
         * @interface ISharedConfigMessage
         * @property {signalservice.SharedConfigMessage.Kind} kind SharedConfigMessage kind
         * @property {number|Long} seqno SharedConfigMessage seqno
         * @property {Uint8Array} data SharedConfigMessage data
         */

        /**
         * Constructs a new SharedConfigMessage.
         * @memberof signalservice
         * @classdesc Represents a SharedConfigMessage.
         * @implements ISharedConfigMessage
         * @constructor
         * @param {signalservice.ISharedConfigMessage=} [properties] Properties to set
         */
        function SharedConfigMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SharedConfigMessage kind.
         * @member {signalservice.SharedConfigMessage.Kind} kind
         * @memberof signalservice.SharedConfigMessage
         * @instance
         */
        SharedConfigMessage.prototype.kind = 1;

        /**
         * SharedConfigMessage seqno.
         * @member {number|Long} seqno
         * @memberof signalservice.SharedConfigMessage
         * @instance
         */
        SharedConfigMessage.prototype.seqno = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SharedConfigMessage data.
         * @member {Uint8Array} data
         * @memberof signalservice.SharedConfigMessage
         * @instance
         */
        SharedConfigMessage.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new SharedConfigMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {signalservice.ISharedConfigMessage=} [properties] Properties to set
         * @returns {signalservice.SharedConfigMessage} SharedConfigMessage instance
         */
        SharedConfigMessage.create = function create(properties) {
            return new SharedConfigMessage(properties);
        };

        /**
         * Encodes the specified SharedConfigMessage message. Does not implicitly {@link signalservice.SharedConfigMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {signalservice.ISharedConfigMessage} message SharedConfigMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedConfigMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.kind);
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.seqno);
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified SharedConfigMessage message, length delimited. Does not implicitly {@link signalservice.SharedConfigMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {signalservice.ISharedConfigMessage} message SharedConfigMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SharedConfigMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SharedConfigMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.SharedConfigMessage} SharedConfigMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedConfigMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.SharedConfigMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.kind = reader.int32();
                        break;
                    }
                case 2: {
                        message.seqno = reader.int64();
                        break;
                    }
                case 3: {
                        message.data = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("kind"))
                throw $util.ProtocolError("missing required 'kind'", { instance: message });
            if (!message.hasOwnProperty("seqno"))
                throw $util.ProtocolError("missing required 'seqno'", { instance: message });
            if (!message.hasOwnProperty("data"))
                throw $util.ProtocolError("missing required 'data'", { instance: message });
            return message;
        };

        /**
         * Decodes a SharedConfigMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.SharedConfigMessage} SharedConfigMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SharedConfigMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SharedConfigMessage message.
         * @function verify
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SharedConfigMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.kind) {
            default:
                return "kind: enum value expected";
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            }
            if (!$util.isInteger(message.seqno) && !(message.seqno && $util.isInteger(message.seqno.low) && $util.isInteger(message.seqno.high)))
                return "seqno: integer|Long expected";
            if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
            return null;
        };

        /**
         * Creates a SharedConfigMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.SharedConfigMessage} SharedConfigMessage
         */
        SharedConfigMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.SharedConfigMessage)
                return object;
            let message = new $root.signalservice.SharedConfigMessage();
            switch (object.kind) {
            default:
                if (typeof object.kind === "number") {
                    message.kind = object.kind;
                    break;
                }
                break;
            case "USER_PROFILE":
            case 1:
                message.kind = 1;
                break;
            case "CONTACTS":
            case 2:
                message.kind = 2;
                break;
            case "CONVO_INFO_VOLATILE":
            case 3:
                message.kind = 3;
                break;
            case "USER_GROUPS":
            case 4:
                message.kind = 4;
                break;
            }
            if (object.seqno != null)
                if ($util.Long)
                    (message.seqno = $util.Long.fromValue(object.seqno)).unsigned = false;
                else if (typeof object.seqno === "string")
                    message.seqno = parseInt(object.seqno, 10);
                else if (typeof object.seqno === "number")
                    message.seqno = object.seqno;
                else if (typeof object.seqno === "object")
                    message.seqno = new $util.LongBits(object.seqno.low >>> 0, object.seqno.high >>> 0).toNumber();
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length >= 0)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a SharedConfigMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {signalservice.SharedConfigMessage} message SharedConfigMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SharedConfigMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.kind = options.enums === String ? "USER_PROFILE" : 1;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.seqno = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.seqno = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.kind != null && message.hasOwnProperty("kind"))
                object.kind = options.enums === String ? $root.signalservice.SharedConfigMessage.Kind[message.kind] === undefined ? message.kind : $root.signalservice.SharedConfigMessage.Kind[message.kind] : message.kind;
            if (message.seqno != null && message.hasOwnProperty("seqno"))
                if (typeof message.seqno === "number")
                    object.seqno = options.longs === String ? String(message.seqno) : message.seqno;
                else
                    object.seqno = options.longs === String ? $util.Long.prototype.toString.call(message.seqno) : options.longs === Number ? new $util.LongBits(message.seqno.low >>> 0, message.seqno.high >>> 0).toNumber() : message.seqno;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this SharedConfigMessage to JSON.
         * @function toJSON
         * @memberof signalservice.SharedConfigMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SharedConfigMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for SharedConfigMessage
         * @function getTypeUrl
         * @memberof signalservice.SharedConfigMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        SharedConfigMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.SharedConfigMessage";
        };

        /**
         * Kind enum.
         * @name signalservice.SharedConfigMessage.Kind
         * @enum {number}
         * @property {number} USER_PROFILE=1 USER_PROFILE value
         * @property {number} CONTACTS=2 CONTACTS value
         * @property {number} CONVO_INFO_VOLATILE=3 CONVO_INFO_VOLATILE value
         * @property {number} USER_GROUPS=4 USER_GROUPS value
         */
        SharedConfigMessage.Kind = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "USER_PROFILE"] = 1;
            values[valuesById[2] = "CONTACTS"] = 2;
            values[valuesById[3] = "CONVO_INFO_VOLATILE"] = 3;
            values[valuesById[4] = "USER_GROUPS"] = 4;
            return values;
        })();

        return SharedConfigMessage;
    })();

    signalservice.Content = (function() {

        /**
         * Properties of a Content.
         * @memberof signalservice
         * @interface IContent
         * @property {signalservice.IDataMessage|null} [dataMessage] Content dataMessage
         * @property {signalservice.ICallMessage|null} [callMessage] Content callMessage
         * @property {signalservice.IReceiptMessage|null} [receiptMessage] Content receiptMessage
         * @property {signalservice.ITypingMessage|null} [typingMessage] Content typingMessage
         * @property {signalservice.IConfigurationMessage|null} [configurationMessage] Content configurationMessage
         * @property {signalservice.IDataExtractionNotification|null} [dataExtractionNotification] Content dataExtractionNotification
         * @property {signalservice.IUnsend|null} [unsendMessage] Content unsendMessage
         * @property {signalservice.IMessageRequestResponse|null} [messageRequestResponse] Content messageRequestResponse
         * @property {signalservice.ISharedConfigMessage|null} [sharedConfigMessage] Content sharedConfigMessage
         * @property {signalservice.Content.ExpirationType|null} [expirationType] Content expirationType
         * @property {number|null} [expirationTimer] Content expirationTimer
         */

        /**
         * Constructs a new Content.
         * @memberof signalservice
         * @classdesc Represents a Content.
         * @implements IContent
         * @constructor
         * @param {signalservice.IContent=} [properties] Properties to set
         */
        function Content(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Content dataMessage.
         * @member {signalservice.IDataMessage|null|undefined} dataMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.dataMessage = null;

        /**
         * Content callMessage.
         * @member {signalservice.ICallMessage|null|undefined} callMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.callMessage = null;

        /**
         * Content receiptMessage.
         * @member {signalservice.IReceiptMessage|null|undefined} receiptMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.receiptMessage = null;

        /**
         * Content typingMessage.
         * @member {signalservice.ITypingMessage|null|undefined} typingMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.typingMessage = null;

        /**
         * Content configurationMessage.
         * @member {signalservice.IConfigurationMessage|null|undefined} configurationMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.configurationMessage = null;

        /**
         * Content dataExtractionNotification.
         * @member {signalservice.IDataExtractionNotification|null|undefined} dataExtractionNotification
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.dataExtractionNotification = null;

        /**
         * Content unsendMessage.
         * @member {signalservice.IUnsend|null|undefined} unsendMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.unsendMessage = null;

        /**
         * Content messageRequestResponse.
         * @member {signalservice.IMessageRequestResponse|null|undefined} messageRequestResponse
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.messageRequestResponse = null;

        /**
         * Content sharedConfigMessage.
         * @member {signalservice.ISharedConfigMessage|null|undefined} sharedConfigMessage
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.sharedConfigMessage = null;

        /**
         * Content expirationType.
         * @member {signalservice.Content.ExpirationType} expirationType
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.expirationType = 0;

        /**
         * Content expirationTimer.
         * @member {number} expirationTimer
         * @memberof signalservice.Content
         * @instance
         */
        Content.prototype.expirationTimer = 0;

        /**
         * Creates a new Content instance using the specified properties.
         * @function create
         * @memberof signalservice.Content
         * @static
         * @param {signalservice.IContent=} [properties] Properties to set
         * @returns {signalservice.Content} Content instance
         */
        Content.create = function create(properties) {
            return new Content(properties);
        };

        /**
         * Encodes the specified Content message. Does not implicitly {@link signalservice.Content.verify|verify} messages.
         * @function encode
         * @memberof signalservice.Content
         * @static
         * @param {signalservice.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.dataMessage != null && Object.hasOwnProperty.call(message, "dataMessage"))
                $root.signalservice.DataMessage.encode(message.dataMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.callMessage != null && Object.hasOwnProperty.call(message, "callMessage"))
                $root.signalservice.CallMessage.encode(message.callMessage, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.receiptMessage != null && Object.hasOwnProperty.call(message, "receiptMessage"))
                $root.signalservice.ReceiptMessage.encode(message.receiptMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.typingMessage != null && Object.hasOwnProperty.call(message, "typingMessage"))
                $root.signalservice.TypingMessage.encode(message.typingMessage, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.configurationMessage != null && Object.hasOwnProperty.call(message, "configurationMessage"))
                $root.signalservice.ConfigurationMessage.encode(message.configurationMessage, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.dataExtractionNotification != null && Object.hasOwnProperty.call(message, "dataExtractionNotification"))
                $root.signalservice.DataExtractionNotification.encode(message.dataExtractionNotification, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.unsendMessage != null && Object.hasOwnProperty.call(message, "unsendMessage"))
                $root.signalservice.Unsend.encode(message.unsendMessage, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.messageRequestResponse != null && Object.hasOwnProperty.call(message, "messageRequestResponse"))
                $root.signalservice.MessageRequestResponse.encode(message.messageRequestResponse, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.sharedConfigMessage != null && Object.hasOwnProperty.call(message, "sharedConfigMessage"))
                $root.signalservice.SharedConfigMessage.encode(message.sharedConfigMessage, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.expirationType != null && Object.hasOwnProperty.call(message, "expirationType"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.expirationType);
            if (message.expirationTimer != null && Object.hasOwnProperty.call(message, "expirationTimer"))
                writer.uint32(/* id 13, wireType 0 =*/104).uint32(message.expirationTimer);
            return writer;
        };

        /**
         * Encodes the specified Content message, length delimited. Does not implicitly {@link signalservice.Content.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.Content
         * @static
         * @param {signalservice.IContent} message Content message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Content.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Content message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.Content();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.dataMessage = $root.signalservice.DataMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.callMessage = $root.signalservice.CallMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.receiptMessage = $root.signalservice.ReceiptMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        message.typingMessage = $root.signalservice.TypingMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.configurationMessage = $root.signalservice.ConfigurationMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 8: {
                        message.dataExtractionNotification = $root.signalservice.DataExtractionNotification.decode(reader, reader.uint32());
                        break;
                    }
                case 9: {
                        message.unsendMessage = $root.signalservice.Unsend.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        message.messageRequestResponse = $root.signalservice.MessageRequestResponse.decode(reader, reader.uint32());
                        break;
                    }
                case 11: {
                        message.sharedConfigMessage = $root.signalservice.SharedConfigMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 12: {
                        message.expirationType = reader.int32();
                        break;
                    }
                case 13: {
                        message.expirationTimer = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Content message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.Content
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.Content} Content
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Content.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Content message.
         * @function verify
         * @memberof signalservice.Content
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Content.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.dataMessage != null && message.hasOwnProperty("dataMessage")) {
                let error = $root.signalservice.DataMessage.verify(message.dataMessage);
                if (error)
                    return "dataMessage." + error;
            }
            if (message.callMessage != null && message.hasOwnProperty("callMessage")) {
                let error = $root.signalservice.CallMessage.verify(message.callMessage);
                if (error)
                    return "callMessage." + error;
            }
            if (message.receiptMessage != null && message.hasOwnProperty("receiptMessage")) {
                let error = $root.signalservice.ReceiptMessage.verify(message.receiptMessage);
                if (error)
                    return "receiptMessage." + error;
            }
            if (message.typingMessage != null && message.hasOwnProperty("typingMessage")) {
                let error = $root.signalservice.TypingMessage.verify(message.typingMessage);
                if (error)
                    return "typingMessage." + error;
            }
            if (message.configurationMessage != null && message.hasOwnProperty("configurationMessage")) {
                let error = $root.signalservice.ConfigurationMessage.verify(message.configurationMessage);
                if (error)
                    return "configurationMessage." + error;
            }
            if (message.dataExtractionNotification != null && message.hasOwnProperty("dataExtractionNotification")) {
                let error = $root.signalservice.DataExtractionNotification.verify(message.dataExtractionNotification);
                if (error)
                    return "dataExtractionNotification." + error;
            }
            if (message.unsendMessage != null && message.hasOwnProperty("unsendMessage")) {
                let error = $root.signalservice.Unsend.verify(message.unsendMessage);
                if (error)
                    return "unsendMessage." + error;
            }
            if (message.messageRequestResponse != null && message.hasOwnProperty("messageRequestResponse")) {
                let error = $root.signalservice.MessageRequestResponse.verify(message.messageRequestResponse);
                if (error)
                    return "messageRequestResponse." + error;
            }
            if (message.sharedConfigMessage != null && message.hasOwnProperty("sharedConfigMessage")) {
                let error = $root.signalservice.SharedConfigMessage.verify(message.sharedConfigMessage);
                if (error)
                    return "sharedConfigMessage." + error;
            }
            if (message.expirationType != null && message.hasOwnProperty("expirationType"))
                switch (message.expirationType) {
                default:
                    return "expirationType: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.expirationTimer != null && message.hasOwnProperty("expirationTimer"))
                if (!$util.isInteger(message.expirationTimer))
                    return "expirationTimer: integer expected";
            return null;
        };

        /**
         * Creates a Content message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.Content
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.Content} Content
         */
        Content.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.Content)
                return object;
            let message = new $root.signalservice.Content();
            if (object.dataMessage != null) {
                if (typeof object.dataMessage !== "object")
                    throw TypeError(".signalservice.Content.dataMessage: object expected");
                message.dataMessage = $root.signalservice.DataMessage.fromObject(object.dataMessage);
            }
            if (object.callMessage != null) {
                if (typeof object.callMessage !== "object")
                    throw TypeError(".signalservice.Content.callMessage: object expected");
                message.callMessage = $root.signalservice.CallMessage.fromObject(object.callMessage);
            }
            if (object.receiptMessage != null) {
                if (typeof object.receiptMessage !== "object")
                    throw TypeError(".signalservice.Content.receiptMessage: object expected");
                message.receiptMessage = $root.signalservice.ReceiptMessage.fromObject(object.receiptMessage);
            }
            if (object.typingMessage != null) {
                if (typeof object.typingMessage !== "object")
                    throw TypeError(".signalservice.Content.typingMessage: object expected");
                message.typingMessage = $root.signalservice.TypingMessage.fromObject(object.typingMessage);
            }
            if (object.configurationMessage != null) {
                if (typeof object.configurationMessage !== "object")
                    throw TypeError(".signalservice.Content.configurationMessage: object expected");
                message.configurationMessage = $root.signalservice.ConfigurationMessage.fromObject(object.configurationMessage);
            }
            if (object.dataExtractionNotification != null) {
                if (typeof object.dataExtractionNotification !== "object")
                    throw TypeError(".signalservice.Content.dataExtractionNotification: object expected");
                message.dataExtractionNotification = $root.signalservice.DataExtractionNotification.fromObject(object.dataExtractionNotification);
            }
            if (object.unsendMessage != null) {
                if (typeof object.unsendMessage !== "object")
                    throw TypeError(".signalservice.Content.unsendMessage: object expected");
                message.unsendMessage = $root.signalservice.Unsend.fromObject(object.unsendMessage);
            }
            if (object.messageRequestResponse != null) {
                if (typeof object.messageRequestResponse !== "object")
                    throw TypeError(".signalservice.Content.messageRequestResponse: object expected");
                message.messageRequestResponse = $root.signalservice.MessageRequestResponse.fromObject(object.messageRequestResponse);
            }
            if (object.sharedConfigMessage != null) {
                if (typeof object.sharedConfigMessage !== "object")
                    throw TypeError(".signalservice.Content.sharedConfigMessage: object expected");
                message.sharedConfigMessage = $root.signalservice.SharedConfigMessage.fromObject(object.sharedConfigMessage);
            }
            switch (object.expirationType) {
            default:
                if (typeof object.expirationType === "number") {
                    message.expirationType = object.expirationType;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.expirationType = 0;
                break;
            case "DELETE_AFTER_READ":
            case 1:
                message.expirationType = 1;
                break;
            case "DELETE_AFTER_SEND":
            case 2:
                message.expirationType = 2;
                break;
            }
            if (object.expirationTimer != null)
                message.expirationTimer = object.expirationTimer >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a Content message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.Content
         * @static
         * @param {signalservice.Content} message Content
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Content.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.dataMessage = null;
                object.callMessage = null;
                object.receiptMessage = null;
                object.typingMessage = null;
                object.configurationMessage = null;
                object.dataExtractionNotification = null;
                object.unsendMessage = null;
                object.messageRequestResponse = null;
                object.sharedConfigMessage = null;
                object.expirationType = options.enums === String ? "UNKNOWN" : 0;
                object.expirationTimer = 0;
            }
            if (message.dataMessage != null && message.hasOwnProperty("dataMessage"))
                object.dataMessage = $root.signalservice.DataMessage.toObject(message.dataMessage, options);
            if (message.callMessage != null && message.hasOwnProperty("callMessage"))
                object.callMessage = $root.signalservice.CallMessage.toObject(message.callMessage, options);
            if (message.receiptMessage != null && message.hasOwnProperty("receiptMessage"))
                object.receiptMessage = $root.signalservice.ReceiptMessage.toObject(message.receiptMessage, options);
            if (message.typingMessage != null && message.hasOwnProperty("typingMessage"))
                object.typingMessage = $root.signalservice.TypingMessage.toObject(message.typingMessage, options);
            if (message.configurationMessage != null && message.hasOwnProperty("configurationMessage"))
                object.configurationMessage = $root.signalservice.ConfigurationMessage.toObject(message.configurationMessage, options);
            if (message.dataExtractionNotification != null && message.hasOwnProperty("dataExtractionNotification"))
                object.dataExtractionNotification = $root.signalservice.DataExtractionNotification.toObject(message.dataExtractionNotification, options);
            if (message.unsendMessage != null && message.hasOwnProperty("unsendMessage"))
                object.unsendMessage = $root.signalservice.Unsend.toObject(message.unsendMessage, options);
            if (message.messageRequestResponse != null && message.hasOwnProperty("messageRequestResponse"))
                object.messageRequestResponse = $root.signalservice.MessageRequestResponse.toObject(message.messageRequestResponse, options);
            if (message.sharedConfigMessage != null && message.hasOwnProperty("sharedConfigMessage"))
                object.sharedConfigMessage = $root.signalservice.SharedConfigMessage.toObject(message.sharedConfigMessage, options);
            if (message.expirationType != null && message.hasOwnProperty("expirationType"))
                object.expirationType = options.enums === String ? $root.signalservice.Content.ExpirationType[message.expirationType] === undefined ? message.expirationType : $root.signalservice.Content.ExpirationType[message.expirationType] : message.expirationType;
            if (message.expirationTimer != null && message.hasOwnProperty("expirationTimer"))
                object.expirationTimer = message.expirationTimer;
            return object;
        };

        /**
         * Converts this Content to JSON.
         * @function toJSON
         * @memberof signalservice.Content
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Content.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Content
         * @function getTypeUrl
         * @memberof signalservice.Content
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Content.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.Content";
        };

        /**
         * ExpirationType enum.
         * @name signalservice.Content.ExpirationType
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} DELETE_AFTER_READ=1 DELETE_AFTER_READ value
         * @property {number} DELETE_AFTER_SEND=2 DELETE_AFTER_SEND value
         */
        Content.ExpirationType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "DELETE_AFTER_READ"] = 1;
            values[valuesById[2] = "DELETE_AFTER_SEND"] = 2;
            return values;
        })();

        return Content;
    })();

    signalservice.KeyPair = (function() {

        /**
         * Properties of a KeyPair.
         * @memberof signalservice
         * @interface IKeyPair
         * @property {Uint8Array} publicKey KeyPair publicKey
         * @property {Uint8Array} privateKey KeyPair privateKey
         */

        /**
         * Constructs a new KeyPair.
         * @memberof signalservice
         * @classdesc Represents a KeyPair.
         * @implements IKeyPair
         * @constructor
         * @param {signalservice.IKeyPair=} [properties] Properties to set
         */
        function KeyPair(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * KeyPair publicKey.
         * @member {Uint8Array} publicKey
         * @memberof signalservice.KeyPair
         * @instance
         */
        KeyPair.prototype.publicKey = $util.newBuffer([]);

        /**
         * KeyPair privateKey.
         * @member {Uint8Array} privateKey
         * @memberof signalservice.KeyPair
         * @instance
         */
        KeyPair.prototype.privateKey = $util.newBuffer([]);

        /**
         * Creates a new KeyPair instance using the specified properties.
         * @function create
         * @memberof signalservice.KeyPair
         * @static
         * @param {signalservice.IKeyPair=} [properties] Properties to set
         * @returns {signalservice.KeyPair} KeyPair instance
         */
        KeyPair.create = function create(properties) {
            return new KeyPair(properties);
        };

        /**
         * Encodes the specified KeyPair message. Does not implicitly {@link signalservice.KeyPair.verify|verify} messages.
         * @function encode
         * @memberof signalservice.KeyPair
         * @static
         * @param {signalservice.IKeyPair} message KeyPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyPair.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.privateKey);
            return writer;
        };

        /**
         * Encodes the specified KeyPair message, length delimited. Does not implicitly {@link signalservice.KeyPair.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.KeyPair
         * @static
         * @param {signalservice.IKeyPair} message KeyPair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        KeyPair.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a KeyPair message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.KeyPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.KeyPair} KeyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyPair.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.KeyPair();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.publicKey = reader.bytes();
                        break;
                    }
                case 2: {
                        message.privateKey = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("publicKey"))
                throw $util.ProtocolError("missing required 'publicKey'", { instance: message });
            if (!message.hasOwnProperty("privateKey"))
                throw $util.ProtocolError("missing required 'privateKey'", { instance: message });
            return message;
        };

        /**
         * Decodes a KeyPair message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.KeyPair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.KeyPair} KeyPair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        KeyPair.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a KeyPair message.
         * @function verify
         * @memberof signalservice.KeyPair
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        KeyPair.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                return "publicKey: buffer expected";
            if (!(message.privateKey && typeof message.privateKey.length === "number" || $util.isString(message.privateKey)))
                return "privateKey: buffer expected";
            return null;
        };

        /**
         * Creates a KeyPair message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.KeyPair
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.KeyPair} KeyPair
         */
        KeyPair.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.KeyPair)
                return object;
            let message = new $root.signalservice.KeyPair();
            if (object.publicKey != null)
                if (typeof object.publicKey === "string")
                    $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                else if (object.publicKey.length >= 0)
                    message.publicKey = object.publicKey;
            if (object.privateKey != null)
                if (typeof object.privateKey === "string")
                    $util.base64.decode(object.privateKey, message.privateKey = $util.newBuffer($util.base64.length(object.privateKey)), 0);
                else if (object.privateKey.length >= 0)
                    message.privateKey = object.privateKey;
            return message;
        };

        /**
         * Creates a plain object from a KeyPair message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.KeyPair
         * @static
         * @param {signalservice.KeyPair} message KeyPair
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        KeyPair.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if (options.bytes === String)
                    object.publicKey = "";
                else {
                    object.publicKey = [];
                    if (options.bytes !== Array)
                        object.publicKey = $util.newBuffer(object.publicKey);
                }
                if (options.bytes === String)
                    object.privateKey = "";
                else {
                    object.privateKey = [];
                    if (options.bytes !== Array)
                        object.privateKey = $util.newBuffer(object.privateKey);
                }
            }
            if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
            if (message.privateKey != null && message.hasOwnProperty("privateKey"))
                object.privateKey = options.bytes === String ? $util.base64.encode(message.privateKey, 0, message.privateKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.privateKey) : message.privateKey;
            return object;
        };

        /**
         * Converts this KeyPair to JSON.
         * @function toJSON
         * @memberof signalservice.KeyPair
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        KeyPair.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for KeyPair
         * @function getTypeUrl
         * @memberof signalservice.KeyPair
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        KeyPair.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.KeyPair";
        };

        return KeyPair;
    })();

    signalservice.DataExtractionNotification = (function() {

        /**
         * Properties of a DataExtractionNotification.
         * @memberof signalservice
         * @interface IDataExtractionNotification
         * @property {signalservice.DataExtractionNotification.Type} type DataExtractionNotification type
         * @property {number|Long|null} [timestamp] DataExtractionNotification timestamp
         */

        /**
         * Constructs a new DataExtractionNotification.
         * @memberof signalservice
         * @classdesc Represents a DataExtractionNotification.
         * @implements IDataExtractionNotification
         * @constructor
         * @param {signalservice.IDataExtractionNotification=} [properties] Properties to set
         */
        function DataExtractionNotification(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DataExtractionNotification type.
         * @member {signalservice.DataExtractionNotification.Type} type
         * @memberof signalservice.DataExtractionNotification
         * @instance
         */
        DataExtractionNotification.prototype.type = 1;

        /**
         * DataExtractionNotification timestamp.
         * @member {number|Long} timestamp
         * @memberof signalservice.DataExtractionNotification
         * @instance
         */
        DataExtractionNotification.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new DataExtractionNotification instance using the specified properties.
         * @function create
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {signalservice.IDataExtractionNotification=} [properties] Properties to set
         * @returns {signalservice.DataExtractionNotification} DataExtractionNotification instance
         */
        DataExtractionNotification.create = function create(properties) {
            return new DataExtractionNotification(properties);
        };

        /**
         * Encodes the specified DataExtractionNotification message. Does not implicitly {@link signalservice.DataExtractionNotification.verify|verify} messages.
         * @function encode
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {signalservice.IDataExtractionNotification} message DataExtractionNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataExtractionNotification.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified DataExtractionNotification message, length delimited. Does not implicitly {@link signalservice.DataExtractionNotification.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {signalservice.IDataExtractionNotification} message DataExtractionNotification message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataExtractionNotification.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DataExtractionNotification message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.DataExtractionNotification} DataExtractionNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataExtractionNotification.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataExtractionNotification();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a DataExtractionNotification message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.DataExtractionNotification} DataExtractionNotification
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataExtractionNotification.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DataExtractionNotification message.
         * @function verify
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DataExtractionNotification.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
            case 2:
                break;
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a DataExtractionNotification message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.DataExtractionNotification} DataExtractionNotification
         */
        DataExtractionNotification.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.DataExtractionNotification)
                return object;
            let message = new $root.signalservice.DataExtractionNotification();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "SCREENSHOT":
            case 1:
                message.type = 1;
                break;
            case "MEDIA_SAVED":
            case 2:
                message.type = 2;
                break;
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a DataExtractionNotification message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {signalservice.DataExtractionNotification} message DataExtractionNotification
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DataExtractionNotification.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "SCREENSHOT" : 1;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.DataExtractionNotification.Type[message.type] === undefined ? message.type : $root.signalservice.DataExtractionNotification.Type[message.type] : message.type;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            return object;
        };

        /**
         * Converts this DataExtractionNotification to JSON.
         * @function toJSON
         * @memberof signalservice.DataExtractionNotification
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DataExtractionNotification.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DataExtractionNotification
         * @function getTypeUrl
         * @memberof signalservice.DataExtractionNotification
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DataExtractionNotification.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.DataExtractionNotification";
        };

        /**
         * Type enum.
         * @name signalservice.DataExtractionNotification.Type
         * @enum {number}
         * @property {number} SCREENSHOT=1 SCREENSHOT value
         * @property {number} MEDIA_SAVED=2 MEDIA_SAVED value
         */
        DataExtractionNotification.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "SCREENSHOT"] = 1;
            values[valuesById[2] = "MEDIA_SAVED"] = 2;
            return values;
        })();

        return DataExtractionNotification;
    })();

    signalservice.DataMessage = (function() {

        /**
         * Properties of a DataMessage.
         * @memberof signalservice
         * @interface IDataMessage
         * @property {string|null} [body] DataMessage body
         * @property {Array.<signalservice.IAttachmentPointer>|null} [attachments] DataMessage attachments
         * @property {signalservice.IGroupContext|null} [group] DataMessage group
         * @property {number|null} [flags] DataMessage flags
         * @property {number|null} [expireTimer] DataMessage expireTimer
         * @property {Uint8Array|null} [profileKey] DataMessage profileKey
         * @property {number|Long|null} [timestamp] DataMessage timestamp
         * @property {signalservice.DataMessage.IQuote|null} [quote] DataMessage quote
         * @property {Array.<signalservice.DataMessage.IPreview>|null} [preview] DataMessage preview
         * @property {signalservice.DataMessage.IReaction|null} [reaction] DataMessage reaction
         * @property {signalservice.DataMessage.ILokiProfile|null} [profile] DataMessage profile
         * @property {signalservice.DataMessage.IOpenGroupInvitation|null} [openGroupInvitation] DataMessage openGroupInvitation
         * @property {signalservice.DataMessage.IClosedGroupControlMessage|null} [closedGroupControlMessage] DataMessage closedGroupControlMessage
         * @property {string|null} [syncTarget] DataMessage syncTarget
         * @property {boolean|null} [blocksCommunityMessageRequests] DataMessage blocksCommunityMessageRequests
         */

        /**
         * Constructs a new DataMessage.
         * @memberof signalservice
         * @classdesc Represents a DataMessage.
         * @implements IDataMessage
         * @constructor
         * @param {signalservice.IDataMessage=} [properties] Properties to set
         */
        function DataMessage(properties) {
            this.attachments = [];
            this.preview = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DataMessage body.
         * @member {string} body
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.body = "";

        /**
         * DataMessage attachments.
         * @member {Array.<signalservice.IAttachmentPointer>} attachments
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.attachments = $util.emptyArray;

        /**
         * DataMessage group.
         * @member {signalservice.IGroupContext|null|undefined} group
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.group = null;

        /**
         * DataMessage flags.
         * @member {number} flags
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.flags = 0;

        /**
         * DataMessage expireTimer.
         * @member {number} expireTimer
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.expireTimer = 0;

        /**
         * DataMessage profileKey.
         * @member {Uint8Array} profileKey
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.profileKey = $util.newBuffer([]);

        /**
         * DataMessage timestamp.
         * @member {number|Long} timestamp
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * DataMessage quote.
         * @member {signalservice.DataMessage.IQuote|null|undefined} quote
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.quote = null;

        /**
         * DataMessage preview.
         * @member {Array.<signalservice.DataMessage.IPreview>} preview
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.preview = $util.emptyArray;

        /**
         * DataMessage reaction.
         * @member {signalservice.DataMessage.IReaction|null|undefined} reaction
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.reaction = null;

        /**
         * DataMessage profile.
         * @member {signalservice.DataMessage.ILokiProfile|null|undefined} profile
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.profile = null;

        /**
         * DataMessage openGroupInvitation.
         * @member {signalservice.DataMessage.IOpenGroupInvitation|null|undefined} openGroupInvitation
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.openGroupInvitation = null;

        /**
         * DataMessage closedGroupControlMessage.
         * @member {signalservice.DataMessage.IClosedGroupControlMessage|null|undefined} closedGroupControlMessage
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.closedGroupControlMessage = null;

        /**
         * DataMessage syncTarget.
         * @member {string} syncTarget
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.syncTarget = "";

        /**
         * DataMessage blocksCommunityMessageRequests.
         * @member {boolean} blocksCommunityMessageRequests
         * @memberof signalservice.DataMessage
         * @instance
         */
        DataMessage.prototype.blocksCommunityMessageRequests = false;

        /**
         * Creates a new DataMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.DataMessage
         * @static
         * @param {signalservice.IDataMessage=} [properties] Properties to set
         * @returns {signalservice.DataMessage} DataMessage instance
         */
        DataMessage.create = function create(properties) {
            return new DataMessage(properties);
        };

        /**
         * Encodes the specified DataMessage message. Does not implicitly {@link signalservice.DataMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.DataMessage
         * @static
         * @param {signalservice.IDataMessage} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.body);
            if (message.attachments != null && message.attachments.length)
                for (let i = 0; i < message.attachments.length; ++i)
                    $root.signalservice.AttachmentPointer.encode(message.attachments[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.group != null && Object.hasOwnProperty.call(message, "group"))
                $root.signalservice.GroupContext.encode(message.group, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.flags);
            if (message.expireTimer != null && Object.hasOwnProperty.call(message, "expireTimer"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.expireTimer);
            if (message.profileKey != null && Object.hasOwnProperty.call(message, "profileKey"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.profileKey);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.timestamp);
            if (message.quote != null && Object.hasOwnProperty.call(message, "quote"))
                $root.signalservice.DataMessage.Quote.encode(message.quote, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.preview != null && message.preview.length)
                for (let i = 0; i < message.preview.length; ++i)
                    $root.signalservice.DataMessage.Preview.encode(message.preview[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.reaction != null && Object.hasOwnProperty.call(message, "reaction"))
                $root.signalservice.DataMessage.Reaction.encode(message.reaction, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.profile != null && Object.hasOwnProperty.call(message, "profile"))
                $root.signalservice.DataMessage.LokiProfile.encode(message.profile, writer.uint32(/* id 101, wireType 2 =*/810).fork()).ldelim();
            if (message.openGroupInvitation != null && Object.hasOwnProperty.call(message, "openGroupInvitation"))
                $root.signalservice.DataMessage.OpenGroupInvitation.encode(message.openGroupInvitation, writer.uint32(/* id 102, wireType 2 =*/818).fork()).ldelim();
            if (message.closedGroupControlMessage != null && Object.hasOwnProperty.call(message, "closedGroupControlMessage"))
                $root.signalservice.DataMessage.ClosedGroupControlMessage.encode(message.closedGroupControlMessage, writer.uint32(/* id 104, wireType 2 =*/834).fork()).ldelim();
            if (message.syncTarget != null && Object.hasOwnProperty.call(message, "syncTarget"))
                writer.uint32(/* id 105, wireType 2 =*/842).string(message.syncTarget);
            if (message.blocksCommunityMessageRequests != null && Object.hasOwnProperty.call(message, "blocksCommunityMessageRequests"))
                writer.uint32(/* id 106, wireType 0 =*/848).bool(message.blocksCommunityMessageRequests);
            return writer;
        };

        /**
         * Encodes the specified DataMessage message, length delimited. Does not implicitly {@link signalservice.DataMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.DataMessage
         * @static
         * @param {signalservice.IDataMessage} message DataMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DataMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.DataMessage} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.body = reader.string();
                        break;
                    }
                case 2: {
                        if (!(message.attachments && message.attachments.length))
                            message.attachments = [];
                        message.attachments.push($root.signalservice.AttachmentPointer.decode(reader, reader.uint32()));
                        break;
                    }
                case 3: {
                        message.group = $root.signalservice.GroupContext.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.flags = reader.uint32();
                        break;
                    }
                case 5: {
                        message.expireTimer = reader.uint32();
                        break;
                    }
                case 6: {
                        message.profileKey = reader.bytes();
                        break;
                    }
                case 7: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                case 8: {
                        message.quote = $root.signalservice.DataMessage.Quote.decode(reader, reader.uint32());
                        break;
                    }
                case 10: {
                        if (!(message.preview && message.preview.length))
                            message.preview = [];
                        message.preview.push($root.signalservice.DataMessage.Preview.decode(reader, reader.uint32()));
                        break;
                    }
                case 11: {
                        message.reaction = $root.signalservice.DataMessage.Reaction.decode(reader, reader.uint32());
                        break;
                    }
                case 101: {
                        message.profile = $root.signalservice.DataMessage.LokiProfile.decode(reader, reader.uint32());
                        break;
                    }
                case 102: {
                        message.openGroupInvitation = $root.signalservice.DataMessage.OpenGroupInvitation.decode(reader, reader.uint32());
                        break;
                    }
                case 104: {
                        message.closedGroupControlMessage = $root.signalservice.DataMessage.ClosedGroupControlMessage.decode(reader, reader.uint32());
                        break;
                    }
                case 105: {
                        message.syncTarget = reader.string();
                        break;
                    }
                case 106: {
                        message.blocksCommunityMessageRequests = reader.bool();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DataMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.DataMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.DataMessage} DataMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DataMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DataMessage message.
         * @function verify
         * @memberof signalservice.DataMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DataMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.body != null && message.hasOwnProperty("body"))
                if (!$util.isString(message.body))
                    return "body: string expected";
            if (message.attachments != null && message.hasOwnProperty("attachments")) {
                if (!Array.isArray(message.attachments))
                    return "attachments: array expected";
                for (let i = 0; i < message.attachments.length; ++i) {
                    let error = $root.signalservice.AttachmentPointer.verify(message.attachments[i]);
                    if (error)
                        return "attachments." + error;
                }
            }
            if (message.group != null && message.hasOwnProperty("group")) {
                let error = $root.signalservice.GroupContext.verify(message.group);
                if (error)
                    return "group." + error;
            }
            if (message.flags != null && message.hasOwnProperty("flags"))
                if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
            if (message.expireTimer != null && message.hasOwnProperty("expireTimer"))
                if (!$util.isInteger(message.expireTimer))
                    return "expireTimer: integer expected";
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                if (!(message.profileKey && typeof message.profileKey.length === "number" || $util.isString(message.profileKey)))
                    return "profileKey: buffer expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.quote != null && message.hasOwnProperty("quote")) {
                let error = $root.signalservice.DataMessage.Quote.verify(message.quote);
                if (error)
                    return "quote." + error;
            }
            if (message.preview != null && message.hasOwnProperty("preview")) {
                if (!Array.isArray(message.preview))
                    return "preview: array expected";
                for (let i = 0; i < message.preview.length; ++i) {
                    let error = $root.signalservice.DataMessage.Preview.verify(message.preview[i]);
                    if (error)
                        return "preview." + error;
                }
            }
            if (message.reaction != null && message.hasOwnProperty("reaction")) {
                let error = $root.signalservice.DataMessage.Reaction.verify(message.reaction);
                if (error)
                    return "reaction." + error;
            }
            if (message.profile != null && message.hasOwnProperty("profile")) {
                let error = $root.signalservice.DataMessage.LokiProfile.verify(message.profile);
                if (error)
                    return "profile." + error;
            }
            if (message.openGroupInvitation != null && message.hasOwnProperty("openGroupInvitation")) {
                let error = $root.signalservice.DataMessage.OpenGroupInvitation.verify(message.openGroupInvitation);
                if (error)
                    return "openGroupInvitation." + error;
            }
            if (message.closedGroupControlMessage != null && message.hasOwnProperty("closedGroupControlMessage")) {
                let error = $root.signalservice.DataMessage.ClosedGroupControlMessage.verify(message.closedGroupControlMessage);
                if (error)
                    return "closedGroupControlMessage." + error;
            }
            if (message.syncTarget != null && message.hasOwnProperty("syncTarget"))
                if (!$util.isString(message.syncTarget))
                    return "syncTarget: string expected";
            if (message.blocksCommunityMessageRequests != null && message.hasOwnProperty("blocksCommunityMessageRequests"))
                if (typeof message.blocksCommunityMessageRequests !== "boolean")
                    return "blocksCommunityMessageRequests: boolean expected";
            return null;
        };

        /**
         * Creates a DataMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.DataMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.DataMessage} DataMessage
         */
        DataMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.DataMessage)
                return object;
            let message = new $root.signalservice.DataMessage();
            if (object.body != null)
                message.body = String(object.body);
            if (object.attachments) {
                if (!Array.isArray(object.attachments))
                    throw TypeError(".signalservice.DataMessage.attachments: array expected");
                message.attachments = [];
                for (let i = 0; i < object.attachments.length; ++i) {
                    if (typeof object.attachments[i] !== "object")
                        throw TypeError(".signalservice.DataMessage.attachments: object expected");
                    message.attachments[i] = $root.signalservice.AttachmentPointer.fromObject(object.attachments[i]);
                }
            }
            if (object.group != null) {
                if (typeof object.group !== "object")
                    throw TypeError(".signalservice.DataMessage.group: object expected");
                message.group = $root.signalservice.GroupContext.fromObject(object.group);
            }
            if (object.flags != null)
                message.flags = object.flags >>> 0;
            if (object.expireTimer != null)
                message.expireTimer = object.expireTimer >>> 0;
            if (object.profileKey != null)
                if (typeof object.profileKey === "string")
                    $util.base64.decode(object.profileKey, message.profileKey = $util.newBuffer($util.base64.length(object.profileKey)), 0);
                else if (object.profileKey.length >= 0)
                    message.profileKey = object.profileKey;
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            if (object.quote != null) {
                if (typeof object.quote !== "object")
                    throw TypeError(".signalservice.DataMessage.quote: object expected");
                message.quote = $root.signalservice.DataMessage.Quote.fromObject(object.quote);
            }
            if (object.preview) {
                if (!Array.isArray(object.preview))
                    throw TypeError(".signalservice.DataMessage.preview: array expected");
                message.preview = [];
                for (let i = 0; i < object.preview.length; ++i) {
                    if (typeof object.preview[i] !== "object")
                        throw TypeError(".signalservice.DataMessage.preview: object expected");
                    message.preview[i] = $root.signalservice.DataMessage.Preview.fromObject(object.preview[i]);
                }
            }
            if (object.reaction != null) {
                if (typeof object.reaction !== "object")
                    throw TypeError(".signalservice.DataMessage.reaction: object expected");
                message.reaction = $root.signalservice.DataMessage.Reaction.fromObject(object.reaction);
            }
            if (object.profile != null) {
                if (typeof object.profile !== "object")
                    throw TypeError(".signalservice.DataMessage.profile: object expected");
                message.profile = $root.signalservice.DataMessage.LokiProfile.fromObject(object.profile);
            }
            if (object.openGroupInvitation != null) {
                if (typeof object.openGroupInvitation !== "object")
                    throw TypeError(".signalservice.DataMessage.openGroupInvitation: object expected");
                message.openGroupInvitation = $root.signalservice.DataMessage.OpenGroupInvitation.fromObject(object.openGroupInvitation);
            }
            if (object.closedGroupControlMessage != null) {
                if (typeof object.closedGroupControlMessage !== "object")
                    throw TypeError(".signalservice.DataMessage.closedGroupControlMessage: object expected");
                message.closedGroupControlMessage = $root.signalservice.DataMessage.ClosedGroupControlMessage.fromObject(object.closedGroupControlMessage);
            }
            if (object.syncTarget != null)
                message.syncTarget = String(object.syncTarget);
            if (object.blocksCommunityMessageRequests != null)
                message.blocksCommunityMessageRequests = Boolean(object.blocksCommunityMessageRequests);
            return message;
        };

        /**
         * Creates a plain object from a DataMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.DataMessage
         * @static
         * @param {signalservice.DataMessage} message DataMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DataMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.attachments = [];
                object.preview = [];
            }
            if (options.defaults) {
                object.body = "";
                object.group = null;
                object.flags = 0;
                object.expireTimer = 0;
                if (options.bytes === String)
                    object.profileKey = "";
                else {
                    object.profileKey = [];
                    if (options.bytes !== Array)
                        object.profileKey = $util.newBuffer(object.profileKey);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.quote = null;
                object.reaction = null;
                object.profile = null;
                object.openGroupInvitation = null;
                object.closedGroupControlMessage = null;
                object.syncTarget = "";
                object.blocksCommunityMessageRequests = false;
            }
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = message.body;
            if (message.attachments && message.attachments.length) {
                object.attachments = [];
                for (let j = 0; j < message.attachments.length; ++j)
                    object.attachments[j] = $root.signalservice.AttachmentPointer.toObject(message.attachments[j], options);
            }
            if (message.group != null && message.hasOwnProperty("group"))
                object.group = $root.signalservice.GroupContext.toObject(message.group, options);
            if (message.flags != null && message.hasOwnProperty("flags"))
                object.flags = message.flags;
            if (message.expireTimer != null && message.hasOwnProperty("expireTimer"))
                object.expireTimer = message.expireTimer;
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                object.profileKey = options.bytes === String ? $util.base64.encode(message.profileKey, 0, message.profileKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.profileKey) : message.profileKey;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            if (message.quote != null && message.hasOwnProperty("quote"))
                object.quote = $root.signalservice.DataMessage.Quote.toObject(message.quote, options);
            if (message.preview && message.preview.length) {
                object.preview = [];
                for (let j = 0; j < message.preview.length; ++j)
                    object.preview[j] = $root.signalservice.DataMessage.Preview.toObject(message.preview[j], options);
            }
            if (message.reaction != null && message.hasOwnProperty("reaction"))
                object.reaction = $root.signalservice.DataMessage.Reaction.toObject(message.reaction, options);
            if (message.profile != null && message.hasOwnProperty("profile"))
                object.profile = $root.signalservice.DataMessage.LokiProfile.toObject(message.profile, options);
            if (message.openGroupInvitation != null && message.hasOwnProperty("openGroupInvitation"))
                object.openGroupInvitation = $root.signalservice.DataMessage.OpenGroupInvitation.toObject(message.openGroupInvitation, options);
            if (message.closedGroupControlMessage != null && message.hasOwnProperty("closedGroupControlMessage"))
                object.closedGroupControlMessage = $root.signalservice.DataMessage.ClosedGroupControlMessage.toObject(message.closedGroupControlMessage, options);
            if (message.syncTarget != null && message.hasOwnProperty("syncTarget"))
                object.syncTarget = message.syncTarget;
            if (message.blocksCommunityMessageRequests != null && message.hasOwnProperty("blocksCommunityMessageRequests"))
                object.blocksCommunityMessageRequests = message.blocksCommunityMessageRequests;
            return object;
        };

        /**
         * Converts this DataMessage to JSON.
         * @function toJSON
         * @memberof signalservice.DataMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DataMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DataMessage
         * @function getTypeUrl
         * @memberof signalservice.DataMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DataMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.DataMessage";
        };

        /**
         * Flags enum.
         * @name signalservice.DataMessage.Flags
         * @enum {number}
         * @property {number} EXPIRATION_TIMER_UPDATE=2 EXPIRATION_TIMER_UPDATE value
         */
        DataMessage.Flags = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[2] = "EXPIRATION_TIMER_UPDATE"] = 2;
            return values;
        })();

        DataMessage.Reaction = (function() {

            /**
             * Properties of a Reaction.
             * @memberof signalservice.DataMessage
             * @interface IReaction
             * @property {number|Long} id Reaction id
             * @property {string} author Reaction author
             * @property {string|null} [emoji] Reaction emoji
             * @property {signalservice.DataMessage.Reaction.Action} action Reaction action
             */

            /**
             * Constructs a new Reaction.
             * @memberof signalservice.DataMessage
             * @classdesc Represents a Reaction.
             * @implements IReaction
             * @constructor
             * @param {signalservice.DataMessage.IReaction=} [properties] Properties to set
             */
            function Reaction(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Reaction id.
             * @member {number|Long} id
             * @memberof signalservice.DataMessage.Reaction
             * @instance
             */
            Reaction.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Reaction author.
             * @member {string} author
             * @memberof signalservice.DataMessage.Reaction
             * @instance
             */
            Reaction.prototype.author = "";

            /**
             * Reaction emoji.
             * @member {string} emoji
             * @memberof signalservice.DataMessage.Reaction
             * @instance
             */
            Reaction.prototype.emoji = "";

            /**
             * Reaction action.
             * @member {signalservice.DataMessage.Reaction.Action} action
             * @memberof signalservice.DataMessage.Reaction
             * @instance
             */
            Reaction.prototype.action = 0;

            /**
             * Creates a new Reaction instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {signalservice.DataMessage.IReaction=} [properties] Properties to set
             * @returns {signalservice.DataMessage.Reaction} Reaction instance
             */
            Reaction.create = function create(properties) {
                return new Reaction(properties);
            };

            /**
             * Encodes the specified Reaction message. Does not implicitly {@link signalservice.DataMessage.Reaction.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {signalservice.DataMessage.IReaction} message Reaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Reaction.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.author);
                if (message.emoji != null && Object.hasOwnProperty.call(message, "emoji"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.emoji);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.action);
                return writer;
            };

            /**
             * Encodes the specified Reaction message, length delimited. Does not implicitly {@link signalservice.DataMessage.Reaction.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {signalservice.DataMessage.IReaction} message Reaction message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Reaction.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Reaction message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.Reaction} Reaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Reaction.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.Reaction();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint64();
                            break;
                        }
                    case 2: {
                            message.author = reader.string();
                            break;
                        }
                    case 3: {
                            message.emoji = reader.string();
                            break;
                        }
                    case 4: {
                            message.action = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("author"))
                    throw $util.ProtocolError("missing required 'author'", { instance: message });
                if (!message.hasOwnProperty("action"))
                    throw $util.ProtocolError("missing required 'action'", { instance: message });
                return message;
            };

            /**
             * Decodes a Reaction message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.Reaction} Reaction
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Reaction.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Reaction message.
             * @function verify
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Reaction.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
                if (!$util.isString(message.author))
                    return "author: string expected";
                if (message.emoji != null && message.hasOwnProperty("emoji"))
                    if (!$util.isString(message.emoji))
                        return "emoji: string expected";
                switch (message.action) {
                default:
                    return "action: enum value expected";
                case 0:
                case 1:
                    break;
                }
                return null;
            };

            /**
             * Creates a Reaction message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.Reaction} Reaction
             */
            Reaction.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.Reaction)
                    return object;
                let message = new $root.signalservice.DataMessage.Reaction();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
                if (object.author != null)
                    message.author = String(object.author);
                if (object.emoji != null)
                    message.emoji = String(object.emoji);
                switch (object.action) {
                default:
                    if (typeof object.action === "number") {
                        message.action = object.action;
                        break;
                    }
                    break;
                case "REACT":
                case 0:
                    message.action = 0;
                    break;
                case "REMOVE":
                case 1:
                    message.action = 1;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a Reaction message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {signalservice.DataMessage.Reaction} message Reaction
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Reaction.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.author = "";
                    object.emoji = "";
                    object.action = options.enums === String ? "REACT" : 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
                if (message.author != null && message.hasOwnProperty("author"))
                    object.author = message.author;
                if (message.emoji != null && message.hasOwnProperty("emoji"))
                    object.emoji = message.emoji;
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = options.enums === String ? $root.signalservice.DataMessage.Reaction.Action[message.action] === undefined ? message.action : $root.signalservice.DataMessage.Reaction.Action[message.action] : message.action;
                return object;
            };

            /**
             * Converts this Reaction to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.Reaction
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Reaction.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Reaction
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.Reaction
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Reaction.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.Reaction";
            };

            /**
             * Action enum.
             * @name signalservice.DataMessage.Reaction.Action
             * @enum {number}
             * @property {number} REACT=0 REACT value
             * @property {number} REMOVE=1 REMOVE value
             */
            Reaction.Action = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "REACT"] = 0;
                values[valuesById[1] = "REMOVE"] = 1;
                return values;
            })();

            return Reaction;
        })();

        DataMessage.Quote = (function() {

            /**
             * Properties of a Quote.
             * @memberof signalservice.DataMessage
             * @interface IQuote
             * @property {number|Long} id Quote id
             * @property {string} author Quote author
             * @property {string|null} [text] Quote text
             * @property {Array.<signalservice.DataMessage.Quote.IQuotedAttachment>|null} [attachments] Quote attachments
             */

            /**
             * Constructs a new Quote.
             * @memberof signalservice.DataMessage
             * @classdesc Represents a Quote.
             * @implements IQuote
             * @constructor
             * @param {signalservice.DataMessage.IQuote=} [properties] Properties to set
             */
            function Quote(properties) {
                this.attachments = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Quote id.
             * @member {number|Long} id
             * @memberof signalservice.DataMessage.Quote
             * @instance
             */
            Quote.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Quote author.
             * @member {string} author
             * @memberof signalservice.DataMessage.Quote
             * @instance
             */
            Quote.prototype.author = "";

            /**
             * Quote text.
             * @member {string} text
             * @memberof signalservice.DataMessage.Quote
             * @instance
             */
            Quote.prototype.text = "";

            /**
             * Quote attachments.
             * @member {Array.<signalservice.DataMessage.Quote.IQuotedAttachment>} attachments
             * @memberof signalservice.DataMessage.Quote
             * @instance
             */
            Quote.prototype.attachments = $util.emptyArray;

            /**
             * Creates a new Quote instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {signalservice.DataMessage.IQuote=} [properties] Properties to set
             * @returns {signalservice.DataMessage.Quote} Quote instance
             */
            Quote.create = function create(properties) {
                return new Quote(properties);
            };

            /**
             * Encodes the specified Quote message. Does not implicitly {@link signalservice.DataMessage.Quote.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {signalservice.DataMessage.IQuote} message Quote message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Quote.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.author);
                if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.text);
                if (message.attachments != null && message.attachments.length)
                    for (let i = 0; i < message.attachments.length; ++i)
                        $root.signalservice.DataMessage.Quote.QuotedAttachment.encode(message.attachments[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Quote message, length delimited. Does not implicitly {@link signalservice.DataMessage.Quote.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {signalservice.DataMessage.IQuote} message Quote message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Quote.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Quote message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.Quote} Quote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Quote.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.Quote();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.uint64();
                            break;
                        }
                    case 2: {
                            message.author = reader.string();
                            break;
                        }
                    case 3: {
                            message.text = reader.string();
                            break;
                        }
                    case 4: {
                            if (!(message.attachments && message.attachments.length))
                                message.attachments = [];
                            message.attachments.push($root.signalservice.DataMessage.Quote.QuotedAttachment.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("id"))
                    throw $util.ProtocolError("missing required 'id'", { instance: message });
                if (!message.hasOwnProperty("author"))
                    throw $util.ProtocolError("missing required 'author'", { instance: message });
                return message;
            };

            /**
             * Decodes a Quote message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.Quote} Quote
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Quote.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Quote message.
             * @function verify
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Quote.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
                if (!$util.isString(message.author))
                    return "author: string expected";
                if (message.text != null && message.hasOwnProperty("text"))
                    if (!$util.isString(message.text))
                        return "text: string expected";
                if (message.attachments != null && message.hasOwnProperty("attachments")) {
                    if (!Array.isArray(message.attachments))
                        return "attachments: array expected";
                    for (let i = 0; i < message.attachments.length; ++i) {
                        let error = $root.signalservice.DataMessage.Quote.QuotedAttachment.verify(message.attachments[i]);
                        if (error)
                            return "attachments." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Quote message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.Quote} Quote
             */
            Quote.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.Quote)
                    return object;
                let message = new $root.signalservice.DataMessage.Quote();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
                if (object.author != null)
                    message.author = String(object.author);
                if (object.text != null)
                    message.text = String(object.text);
                if (object.attachments) {
                    if (!Array.isArray(object.attachments))
                        throw TypeError(".signalservice.DataMessage.Quote.attachments: array expected");
                    message.attachments = [];
                    for (let i = 0; i < object.attachments.length; ++i) {
                        if (typeof object.attachments[i] !== "object")
                            throw TypeError(".signalservice.DataMessage.Quote.attachments: object expected");
                        message.attachments[i] = $root.signalservice.DataMessage.Quote.QuotedAttachment.fromObject(object.attachments[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Quote message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {signalservice.DataMessage.Quote} message Quote
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Quote.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.attachments = [];
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.author = "";
                    object.text = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
                if (message.author != null && message.hasOwnProperty("author"))
                    object.author = message.author;
                if (message.text != null && message.hasOwnProperty("text"))
                    object.text = message.text;
                if (message.attachments && message.attachments.length) {
                    object.attachments = [];
                    for (let j = 0; j < message.attachments.length; ++j)
                        object.attachments[j] = $root.signalservice.DataMessage.Quote.QuotedAttachment.toObject(message.attachments[j], options);
                }
                return object;
            };

            /**
             * Converts this Quote to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.Quote
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Quote.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Quote
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.Quote
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Quote.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.Quote";
            };

            Quote.QuotedAttachment = (function() {

                /**
                 * Properties of a QuotedAttachment.
                 * @memberof signalservice.DataMessage.Quote
                 * @interface IQuotedAttachment
                 * @property {string|null} [contentType] QuotedAttachment contentType
                 * @property {string|null} [fileName] QuotedAttachment fileName
                 * @property {signalservice.IAttachmentPointer|null} [thumbnail] QuotedAttachment thumbnail
                 */

                /**
                 * Constructs a new QuotedAttachment.
                 * @memberof signalservice.DataMessage.Quote
                 * @classdesc Represents a QuotedAttachment.
                 * @implements IQuotedAttachment
                 * @constructor
                 * @param {signalservice.DataMessage.Quote.IQuotedAttachment=} [properties] Properties to set
                 */
                function QuotedAttachment(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * QuotedAttachment contentType.
                 * @member {string} contentType
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @instance
                 */
                QuotedAttachment.prototype.contentType = "";

                /**
                 * QuotedAttachment fileName.
                 * @member {string} fileName
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @instance
                 */
                QuotedAttachment.prototype.fileName = "";

                /**
                 * QuotedAttachment thumbnail.
                 * @member {signalservice.IAttachmentPointer|null|undefined} thumbnail
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @instance
                 */
                QuotedAttachment.prototype.thumbnail = null;

                /**
                 * Creates a new QuotedAttachment instance using the specified properties.
                 * @function create
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {signalservice.DataMessage.Quote.IQuotedAttachment=} [properties] Properties to set
                 * @returns {signalservice.DataMessage.Quote.QuotedAttachment} QuotedAttachment instance
                 */
                QuotedAttachment.create = function create(properties) {
                    return new QuotedAttachment(properties);
                };

                /**
                 * Encodes the specified QuotedAttachment message. Does not implicitly {@link signalservice.DataMessage.Quote.QuotedAttachment.verify|verify} messages.
                 * @function encode
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {signalservice.DataMessage.Quote.IQuotedAttachment} message QuotedAttachment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuotedAttachment.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.contentType != null && Object.hasOwnProperty.call(message, "contentType"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.contentType);
                    if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.fileName);
                    if (message.thumbnail != null && Object.hasOwnProperty.call(message, "thumbnail"))
                        $root.signalservice.AttachmentPointer.encode(message.thumbnail, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified QuotedAttachment message, length delimited. Does not implicitly {@link signalservice.DataMessage.Quote.QuotedAttachment.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {signalservice.DataMessage.Quote.IQuotedAttachment} message QuotedAttachment message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                QuotedAttachment.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a QuotedAttachment message from the specified reader or buffer.
                 * @function decode
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {signalservice.DataMessage.Quote.QuotedAttachment} QuotedAttachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuotedAttachment.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.Quote.QuotedAttachment();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.contentType = reader.string();
                                break;
                            }
                        case 2: {
                                message.fileName = reader.string();
                                break;
                            }
                        case 3: {
                                message.thumbnail = $root.signalservice.AttachmentPointer.decode(reader, reader.uint32());
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a QuotedAttachment message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {signalservice.DataMessage.Quote.QuotedAttachment} QuotedAttachment
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                QuotedAttachment.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a QuotedAttachment message.
                 * @function verify
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                QuotedAttachment.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.contentType != null && message.hasOwnProperty("contentType"))
                        if (!$util.isString(message.contentType))
                            return "contentType: string expected";
                    if (message.fileName != null && message.hasOwnProperty("fileName"))
                        if (!$util.isString(message.fileName))
                            return "fileName: string expected";
                    if (message.thumbnail != null && message.hasOwnProperty("thumbnail")) {
                        let error = $root.signalservice.AttachmentPointer.verify(message.thumbnail);
                        if (error)
                            return "thumbnail." + error;
                    }
                    return null;
                };

                /**
                 * Creates a QuotedAttachment message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {signalservice.DataMessage.Quote.QuotedAttachment} QuotedAttachment
                 */
                QuotedAttachment.fromObject = function fromObject(object) {
                    if (object instanceof $root.signalservice.DataMessage.Quote.QuotedAttachment)
                        return object;
                    let message = new $root.signalservice.DataMessage.Quote.QuotedAttachment();
                    if (object.contentType != null)
                        message.contentType = String(object.contentType);
                    if (object.fileName != null)
                        message.fileName = String(object.fileName);
                    if (object.thumbnail != null) {
                        if (typeof object.thumbnail !== "object")
                            throw TypeError(".signalservice.DataMessage.Quote.QuotedAttachment.thumbnail: object expected");
                        message.thumbnail = $root.signalservice.AttachmentPointer.fromObject(object.thumbnail);
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a QuotedAttachment message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {signalservice.DataMessage.Quote.QuotedAttachment} message QuotedAttachment
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                QuotedAttachment.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        object.contentType = "";
                        object.fileName = "";
                        object.thumbnail = null;
                    }
                    if (message.contentType != null && message.hasOwnProperty("contentType"))
                        object.contentType = message.contentType;
                    if (message.fileName != null && message.hasOwnProperty("fileName"))
                        object.fileName = message.fileName;
                    if (message.thumbnail != null && message.hasOwnProperty("thumbnail"))
                        object.thumbnail = $root.signalservice.AttachmentPointer.toObject(message.thumbnail, options);
                    return object;
                };

                /**
                 * Converts this QuotedAttachment to JSON.
                 * @function toJSON
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                QuotedAttachment.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for QuotedAttachment
                 * @function getTypeUrl
                 * @memberof signalservice.DataMessage.Quote.QuotedAttachment
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                QuotedAttachment.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/signalservice.DataMessage.Quote.QuotedAttachment";
                };

                return QuotedAttachment;
            })();

            return Quote;
        })();

        DataMessage.Preview = (function() {

            /**
             * Properties of a Preview.
             * @memberof signalservice.DataMessage
             * @interface IPreview
             * @property {string} url Preview url
             * @property {string|null} [title] Preview title
             * @property {signalservice.IAttachmentPointer|null} [image] Preview image
             */

            /**
             * Constructs a new Preview.
             * @memberof signalservice.DataMessage
             * @classdesc Represents a Preview.
             * @implements IPreview
             * @constructor
             * @param {signalservice.DataMessage.IPreview=} [properties] Properties to set
             */
            function Preview(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Preview url.
             * @member {string} url
             * @memberof signalservice.DataMessage.Preview
             * @instance
             */
            Preview.prototype.url = "";

            /**
             * Preview title.
             * @member {string} title
             * @memberof signalservice.DataMessage.Preview
             * @instance
             */
            Preview.prototype.title = "";

            /**
             * Preview image.
             * @member {signalservice.IAttachmentPointer|null|undefined} image
             * @memberof signalservice.DataMessage.Preview
             * @instance
             */
            Preview.prototype.image = null;

            /**
             * Creates a new Preview instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {signalservice.DataMessage.IPreview=} [properties] Properties to set
             * @returns {signalservice.DataMessage.Preview} Preview instance
             */
            Preview.create = function create(properties) {
                return new Preview(properties);
            };

            /**
             * Encodes the specified Preview message. Does not implicitly {@link signalservice.DataMessage.Preview.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {signalservice.DataMessage.IPreview} message Preview message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Preview.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
                if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                    $root.signalservice.AttachmentPointer.encode(message.image, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Preview message, length delimited. Does not implicitly {@link signalservice.DataMessage.Preview.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {signalservice.DataMessage.IPreview} message Preview message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Preview.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Preview message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.Preview} Preview
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Preview.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.Preview();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.url = reader.string();
                            break;
                        }
                    case 2: {
                            message.title = reader.string();
                            break;
                        }
                    case 3: {
                            message.image = $root.signalservice.AttachmentPointer.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("url"))
                    throw $util.ProtocolError("missing required 'url'", { instance: message });
                return message;
            };

            /**
             * Decodes a Preview message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.Preview} Preview
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Preview.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Preview message.
             * @function verify
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Preview.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.url))
                    return "url: string expected";
                if (message.title != null && message.hasOwnProperty("title"))
                    if (!$util.isString(message.title))
                        return "title: string expected";
                if (message.image != null && message.hasOwnProperty("image")) {
                    let error = $root.signalservice.AttachmentPointer.verify(message.image);
                    if (error)
                        return "image." + error;
                }
                return null;
            };

            /**
             * Creates a Preview message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.Preview} Preview
             */
            Preview.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.Preview)
                    return object;
                let message = new $root.signalservice.DataMessage.Preview();
                if (object.url != null)
                    message.url = String(object.url);
                if (object.title != null)
                    message.title = String(object.title);
                if (object.image != null) {
                    if (typeof object.image !== "object")
                        throw TypeError(".signalservice.DataMessage.Preview.image: object expected");
                    message.image = $root.signalservice.AttachmentPointer.fromObject(object.image);
                }
                return message;
            };

            /**
             * Creates a plain object from a Preview message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {signalservice.DataMessage.Preview} message Preview
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Preview.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.url = "";
                    object.title = "";
                    object.image = null;
                }
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.title != null && message.hasOwnProperty("title"))
                    object.title = message.title;
                if (message.image != null && message.hasOwnProperty("image"))
                    object.image = $root.signalservice.AttachmentPointer.toObject(message.image, options);
                return object;
            };

            /**
             * Converts this Preview to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.Preview
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Preview.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Preview
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.Preview
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Preview.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.Preview";
            };

            return Preview;
        })();

        DataMessage.LokiProfile = (function() {

            /**
             * Properties of a LokiProfile.
             * @memberof signalservice.DataMessage
             * @interface ILokiProfile
             * @property {string|null} [displayName] LokiProfile displayName
             * @property {string|null} [profilePicture] LokiProfile profilePicture
             */

            /**
             * Constructs a new LokiProfile.
             * @memberof signalservice.DataMessage
             * @classdesc Represents a LokiProfile.
             * @implements ILokiProfile
             * @constructor
             * @param {signalservice.DataMessage.ILokiProfile=} [properties] Properties to set
             */
            function LokiProfile(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LokiProfile displayName.
             * @member {string} displayName
             * @memberof signalservice.DataMessage.LokiProfile
             * @instance
             */
            LokiProfile.prototype.displayName = "";

            /**
             * LokiProfile profilePicture.
             * @member {string} profilePicture
             * @memberof signalservice.DataMessage.LokiProfile
             * @instance
             */
            LokiProfile.prototype.profilePicture = "";

            /**
             * Creates a new LokiProfile instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {signalservice.DataMessage.ILokiProfile=} [properties] Properties to set
             * @returns {signalservice.DataMessage.LokiProfile} LokiProfile instance
             */
            LokiProfile.create = function create(properties) {
                return new LokiProfile(properties);
            };

            /**
             * Encodes the specified LokiProfile message. Does not implicitly {@link signalservice.DataMessage.LokiProfile.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {signalservice.DataMessage.ILokiProfile} message LokiProfile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LokiProfile.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.displayName);
                if (message.profilePicture != null && Object.hasOwnProperty.call(message, "profilePicture"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.profilePicture);
                return writer;
            };

            /**
             * Encodes the specified LokiProfile message, length delimited. Does not implicitly {@link signalservice.DataMessage.LokiProfile.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {signalservice.DataMessage.ILokiProfile} message LokiProfile message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LokiProfile.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LokiProfile message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.LokiProfile} LokiProfile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LokiProfile.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.LokiProfile();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.displayName = reader.string();
                            break;
                        }
                    case 2: {
                            message.profilePicture = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LokiProfile message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.LokiProfile} LokiProfile
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LokiProfile.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LokiProfile message.
             * @function verify
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LokiProfile.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.displayName != null && message.hasOwnProperty("displayName"))
                    if (!$util.isString(message.displayName))
                        return "displayName: string expected";
                if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                    if (!$util.isString(message.profilePicture))
                        return "profilePicture: string expected";
                return null;
            };

            /**
             * Creates a LokiProfile message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.LokiProfile} LokiProfile
             */
            LokiProfile.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.LokiProfile)
                    return object;
                let message = new $root.signalservice.DataMessage.LokiProfile();
                if (object.displayName != null)
                    message.displayName = String(object.displayName);
                if (object.profilePicture != null)
                    message.profilePicture = String(object.profilePicture);
                return message;
            };

            /**
             * Creates a plain object from a LokiProfile message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {signalservice.DataMessage.LokiProfile} message LokiProfile
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LokiProfile.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.displayName = "";
                    object.profilePicture = "";
                }
                if (message.displayName != null && message.hasOwnProperty("displayName"))
                    object.displayName = message.displayName;
                if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                    object.profilePicture = message.profilePicture;
                return object;
            };

            /**
             * Converts this LokiProfile to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.LokiProfile
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LokiProfile.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LokiProfile
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.LokiProfile
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LokiProfile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.LokiProfile";
            };

            return LokiProfile;
        })();

        DataMessage.OpenGroupInvitation = (function() {

            /**
             * Properties of an OpenGroupInvitation.
             * @memberof signalservice.DataMessage
             * @interface IOpenGroupInvitation
             * @property {string} url OpenGroupInvitation url
             * @property {string} name OpenGroupInvitation name
             */

            /**
             * Constructs a new OpenGroupInvitation.
             * @memberof signalservice.DataMessage
             * @classdesc Represents an OpenGroupInvitation.
             * @implements IOpenGroupInvitation
             * @constructor
             * @param {signalservice.DataMessage.IOpenGroupInvitation=} [properties] Properties to set
             */
            function OpenGroupInvitation(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * OpenGroupInvitation url.
             * @member {string} url
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @instance
             */
            OpenGroupInvitation.prototype.url = "";

            /**
             * OpenGroupInvitation name.
             * @member {string} name
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @instance
             */
            OpenGroupInvitation.prototype.name = "";

            /**
             * Creates a new OpenGroupInvitation instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {signalservice.DataMessage.IOpenGroupInvitation=} [properties] Properties to set
             * @returns {signalservice.DataMessage.OpenGroupInvitation} OpenGroupInvitation instance
             */
            OpenGroupInvitation.create = function create(properties) {
                return new OpenGroupInvitation(properties);
            };

            /**
             * Encodes the specified OpenGroupInvitation message. Does not implicitly {@link signalservice.DataMessage.OpenGroupInvitation.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {signalservice.DataMessage.IOpenGroupInvitation} message OpenGroupInvitation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OpenGroupInvitation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                return writer;
            };

            /**
             * Encodes the specified OpenGroupInvitation message, length delimited. Does not implicitly {@link signalservice.DataMessage.OpenGroupInvitation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {signalservice.DataMessage.IOpenGroupInvitation} message OpenGroupInvitation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            OpenGroupInvitation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an OpenGroupInvitation message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.OpenGroupInvitation} OpenGroupInvitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpenGroupInvitation.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.OpenGroupInvitation();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.url = reader.string();
                            break;
                        }
                    case 3: {
                            message.name = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("url"))
                    throw $util.ProtocolError("missing required 'url'", { instance: message });
                if (!message.hasOwnProperty("name"))
                    throw $util.ProtocolError("missing required 'name'", { instance: message });
                return message;
            };

            /**
             * Decodes an OpenGroupInvitation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.OpenGroupInvitation} OpenGroupInvitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            OpenGroupInvitation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an OpenGroupInvitation message.
             * @function verify
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            OpenGroupInvitation.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!$util.isString(message.url))
                    return "url: string expected";
                if (!$util.isString(message.name))
                    return "name: string expected";
                return null;
            };

            /**
             * Creates an OpenGroupInvitation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.OpenGroupInvitation} OpenGroupInvitation
             */
            OpenGroupInvitation.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.OpenGroupInvitation)
                    return object;
                let message = new $root.signalservice.DataMessage.OpenGroupInvitation();
                if (object.url != null)
                    message.url = String(object.url);
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from an OpenGroupInvitation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {signalservice.DataMessage.OpenGroupInvitation} message OpenGroupInvitation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            OpenGroupInvitation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.url = "";
                    object.name = "";
                }
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this OpenGroupInvitation to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            OpenGroupInvitation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for OpenGroupInvitation
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.OpenGroupInvitation
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            OpenGroupInvitation.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.OpenGroupInvitation";
            };

            return OpenGroupInvitation;
        })();

        DataMessage.ClosedGroupControlMessage = (function() {

            /**
             * Properties of a ClosedGroupControlMessage.
             * @memberof signalservice.DataMessage
             * @interface IClosedGroupControlMessage
             * @property {signalservice.DataMessage.ClosedGroupControlMessage.Type} type ClosedGroupControlMessage type
             * @property {Uint8Array|null} [publicKey] ClosedGroupControlMessage publicKey
             * @property {string|null} [name] ClosedGroupControlMessage name
             * @property {signalservice.IKeyPair|null} [encryptionKeyPair] ClosedGroupControlMessage encryptionKeyPair
             * @property {Array.<Uint8Array>|null} [members] ClosedGroupControlMessage members
             * @property {Array.<Uint8Array>|null} [admins] ClosedGroupControlMessage admins
             * @property {Array.<signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper>|null} [wrappers] ClosedGroupControlMessage wrappers
             * @property {number|null} [expirationTimer] ClosedGroupControlMessage expirationTimer
             */

            /**
             * Constructs a new ClosedGroupControlMessage.
             * @memberof signalservice.DataMessage
             * @classdesc Represents a ClosedGroupControlMessage.
             * @implements IClosedGroupControlMessage
             * @constructor
             * @param {signalservice.DataMessage.IClosedGroupControlMessage=} [properties] Properties to set
             */
            function ClosedGroupControlMessage(properties) {
                this.members = [];
                this.admins = [];
                this.wrappers = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClosedGroupControlMessage type.
             * @member {signalservice.DataMessage.ClosedGroupControlMessage.Type} type
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.type = 1;

            /**
             * ClosedGroupControlMessage publicKey.
             * @member {Uint8Array} publicKey
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.publicKey = $util.newBuffer([]);

            /**
             * ClosedGroupControlMessage name.
             * @member {string} name
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.name = "";

            /**
             * ClosedGroupControlMessage encryptionKeyPair.
             * @member {signalservice.IKeyPair|null|undefined} encryptionKeyPair
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.encryptionKeyPair = null;

            /**
             * ClosedGroupControlMessage members.
             * @member {Array.<Uint8Array>} members
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.members = $util.emptyArray;

            /**
             * ClosedGroupControlMessage admins.
             * @member {Array.<Uint8Array>} admins
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.admins = $util.emptyArray;

            /**
             * ClosedGroupControlMessage wrappers.
             * @member {Array.<signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper>} wrappers
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.wrappers = $util.emptyArray;

            /**
             * ClosedGroupControlMessage expirationTimer.
             * @member {number} expirationTimer
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             */
            ClosedGroupControlMessage.prototype.expirationTimer = 0;

            /**
             * Creates a new ClosedGroupControlMessage instance using the specified properties.
             * @function create
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {signalservice.DataMessage.IClosedGroupControlMessage=} [properties] Properties to set
             * @returns {signalservice.DataMessage.ClosedGroupControlMessage} ClosedGroupControlMessage instance
             */
            ClosedGroupControlMessage.create = function create(properties) {
                return new ClosedGroupControlMessage(properties);
            };

            /**
             * Encodes the specified ClosedGroupControlMessage message. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.verify|verify} messages.
             * @function encode
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {signalservice.DataMessage.IClosedGroupControlMessage} message ClosedGroupControlMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClosedGroupControlMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
                if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.publicKey);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                if (message.encryptionKeyPair != null && Object.hasOwnProperty.call(message, "encryptionKeyPair"))
                    $root.signalservice.KeyPair.encode(message.encryptionKeyPair, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.members != null && message.members.length)
                    for (let i = 0; i < message.members.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.members[i]);
                if (message.admins != null && message.admins.length)
                    for (let i = 0; i < message.admins.length; ++i)
                        writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.admins[i]);
                if (message.wrappers != null && message.wrappers.length)
                    for (let i = 0; i < message.wrappers.length; ++i)
                        $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.encode(message.wrappers[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.expirationTimer != null && Object.hasOwnProperty.call(message, "expirationTimer"))
                    writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.expirationTimer);
                return writer;
            };

            /**
             * Encodes the specified ClosedGroupControlMessage message, length delimited. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {signalservice.DataMessage.IClosedGroupControlMessage} message ClosedGroupControlMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClosedGroupControlMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClosedGroupControlMessage message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.DataMessage.ClosedGroupControlMessage} ClosedGroupControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClosedGroupControlMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.ClosedGroupControlMessage();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.type = reader.int32();
                            break;
                        }
                    case 2: {
                            message.publicKey = reader.bytes();
                            break;
                        }
                    case 3: {
                            message.name = reader.string();
                            break;
                        }
                    case 4: {
                            message.encryptionKeyPair = $root.signalservice.KeyPair.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            if (!(message.members && message.members.length))
                                message.members = [];
                            message.members.push(reader.bytes());
                            break;
                        }
                    case 6: {
                            if (!(message.admins && message.admins.length))
                                message.admins = [];
                            message.admins.push(reader.bytes());
                            break;
                        }
                    case 7: {
                            if (!(message.wrappers && message.wrappers.length))
                                message.wrappers = [];
                            message.wrappers.push($root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.decode(reader, reader.uint32()));
                            break;
                        }
                    case 8: {
                            message.expirationTimer = reader.uint32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("type"))
                    throw $util.ProtocolError("missing required 'type'", { instance: message });
                return message;
            };

            /**
             * Decodes a ClosedGroupControlMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.DataMessage.ClosedGroupControlMessage} ClosedGroupControlMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClosedGroupControlMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClosedGroupControlMessage message.
             * @function verify
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClosedGroupControlMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 1:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                    break;
                }
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.encryptionKeyPair != null && message.hasOwnProperty("encryptionKeyPair")) {
                    let error = $root.signalservice.KeyPair.verify(message.encryptionKeyPair);
                    if (error)
                        return "encryptionKeyPair." + error;
                }
                if (message.members != null && message.hasOwnProperty("members")) {
                    if (!Array.isArray(message.members))
                        return "members: array expected";
                    for (let i = 0; i < message.members.length; ++i)
                        if (!(message.members[i] && typeof message.members[i].length === "number" || $util.isString(message.members[i])))
                            return "members: buffer[] expected";
                }
                if (message.admins != null && message.hasOwnProperty("admins")) {
                    if (!Array.isArray(message.admins))
                        return "admins: array expected";
                    for (let i = 0; i < message.admins.length; ++i)
                        if (!(message.admins[i] && typeof message.admins[i].length === "number" || $util.isString(message.admins[i])))
                            return "admins: buffer[] expected";
                }
                if (message.wrappers != null && message.hasOwnProperty("wrappers")) {
                    if (!Array.isArray(message.wrappers))
                        return "wrappers: array expected";
                    for (let i = 0; i < message.wrappers.length; ++i) {
                        let error = $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.verify(message.wrappers[i]);
                        if (error)
                            return "wrappers." + error;
                    }
                }
                if (message.expirationTimer != null && message.hasOwnProperty("expirationTimer"))
                    if (!$util.isInteger(message.expirationTimer))
                        return "expirationTimer: integer expected";
                return null;
            };

            /**
             * Creates a ClosedGroupControlMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.DataMessage.ClosedGroupControlMessage} ClosedGroupControlMessage
             */
            ClosedGroupControlMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.DataMessage.ClosedGroupControlMessage)
                    return object;
                let message = new $root.signalservice.DataMessage.ClosedGroupControlMessage();
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "NEW":
                case 1:
                    message.type = 1;
                    break;
                case "ENCRYPTION_KEY_PAIR":
                case 3:
                    message.type = 3;
                    break;
                case "NAME_CHANGE":
                case 4:
                    message.type = 4;
                    break;
                case "MEMBERS_ADDED":
                case 5:
                    message.type = 5;
                    break;
                case "MEMBERS_REMOVED":
                case 6:
                    message.type = 6;
                    break;
                case "MEMBER_LEFT":
                case 7:
                    message.type = 7;
                    break;
                case "ENCRYPTION_KEY_PAIR_REQUEST":
                case 8:
                    message.type = 8;
                    break;
                }
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length >= 0)
                        message.publicKey = object.publicKey;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.encryptionKeyPair != null) {
                    if (typeof object.encryptionKeyPair !== "object")
                        throw TypeError(".signalservice.DataMessage.ClosedGroupControlMessage.encryptionKeyPair: object expected");
                    message.encryptionKeyPair = $root.signalservice.KeyPair.fromObject(object.encryptionKeyPair);
                }
                if (object.members) {
                    if (!Array.isArray(object.members))
                        throw TypeError(".signalservice.DataMessage.ClosedGroupControlMessage.members: array expected");
                    message.members = [];
                    for (let i = 0; i < object.members.length; ++i)
                        if (typeof object.members[i] === "string")
                            $util.base64.decode(object.members[i], message.members[i] = $util.newBuffer($util.base64.length(object.members[i])), 0);
                        else if (object.members[i].length >= 0)
                            message.members[i] = object.members[i];
                }
                if (object.admins) {
                    if (!Array.isArray(object.admins))
                        throw TypeError(".signalservice.DataMessage.ClosedGroupControlMessage.admins: array expected");
                    message.admins = [];
                    for (let i = 0; i < object.admins.length; ++i)
                        if (typeof object.admins[i] === "string")
                            $util.base64.decode(object.admins[i], message.admins[i] = $util.newBuffer($util.base64.length(object.admins[i])), 0);
                        else if (object.admins[i].length >= 0)
                            message.admins[i] = object.admins[i];
                }
                if (object.wrappers) {
                    if (!Array.isArray(object.wrappers))
                        throw TypeError(".signalservice.DataMessage.ClosedGroupControlMessage.wrappers: array expected");
                    message.wrappers = [];
                    for (let i = 0; i < object.wrappers.length; ++i) {
                        if (typeof object.wrappers[i] !== "object")
                            throw TypeError(".signalservice.DataMessage.ClosedGroupControlMessage.wrappers: object expected");
                        message.wrappers[i] = $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.fromObject(object.wrappers[i]);
                    }
                }
                if (object.expirationTimer != null)
                    message.expirationTimer = object.expirationTimer >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a ClosedGroupControlMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {signalservice.DataMessage.ClosedGroupControlMessage} message ClosedGroupControlMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClosedGroupControlMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.members = [];
                    object.admins = [];
                    object.wrappers = [];
                }
                if (options.defaults) {
                    object.type = options.enums === String ? "NEW" : 1;
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    object.name = "";
                    object.encryptionKeyPair = null;
                    object.expirationTimer = 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.signalservice.DataMessage.ClosedGroupControlMessage.Type[message.type] === undefined ? message.type : $root.signalservice.DataMessage.ClosedGroupControlMessage.Type[message.type] : message.type;
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.encryptionKeyPair != null && message.hasOwnProperty("encryptionKeyPair"))
                    object.encryptionKeyPair = $root.signalservice.KeyPair.toObject(message.encryptionKeyPair, options);
                if (message.members && message.members.length) {
                    object.members = [];
                    for (let j = 0; j < message.members.length; ++j)
                        object.members[j] = options.bytes === String ? $util.base64.encode(message.members[j], 0, message.members[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.members[j]) : message.members[j];
                }
                if (message.admins && message.admins.length) {
                    object.admins = [];
                    for (let j = 0; j < message.admins.length; ++j)
                        object.admins[j] = options.bytes === String ? $util.base64.encode(message.admins[j], 0, message.admins[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.admins[j]) : message.admins[j];
                }
                if (message.wrappers && message.wrappers.length) {
                    object.wrappers = [];
                    for (let j = 0; j < message.wrappers.length; ++j)
                        object.wrappers[j] = $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.toObject(message.wrappers[j], options);
                }
                if (message.expirationTimer != null && message.hasOwnProperty("expirationTimer"))
                    object.expirationTimer = message.expirationTimer;
                return object;
            };

            /**
             * Converts this ClosedGroupControlMessage to JSON.
             * @function toJSON
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClosedGroupControlMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ClosedGroupControlMessage
             * @function getTypeUrl
             * @memberof signalservice.DataMessage.ClosedGroupControlMessage
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ClosedGroupControlMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.DataMessage.ClosedGroupControlMessage";
            };

            /**
             * Type enum.
             * @name signalservice.DataMessage.ClosedGroupControlMessage.Type
             * @enum {number}
             * @property {number} NEW=1 NEW value
             * @property {number} ENCRYPTION_KEY_PAIR=3 ENCRYPTION_KEY_PAIR value
             * @property {number} NAME_CHANGE=4 NAME_CHANGE value
             * @property {number} MEMBERS_ADDED=5 MEMBERS_ADDED value
             * @property {number} MEMBERS_REMOVED=6 MEMBERS_REMOVED value
             * @property {number} MEMBER_LEFT=7 MEMBER_LEFT value
             * @property {number} ENCRYPTION_KEY_PAIR_REQUEST=8 ENCRYPTION_KEY_PAIR_REQUEST value
             */
            ClosedGroupControlMessage.Type = (function() {
                const valuesById = {}, values = Object.create(valuesById);
                values[valuesById[1] = "NEW"] = 1;
                values[valuesById[3] = "ENCRYPTION_KEY_PAIR"] = 3;
                values[valuesById[4] = "NAME_CHANGE"] = 4;
                values[valuesById[5] = "MEMBERS_ADDED"] = 5;
                values[valuesById[6] = "MEMBERS_REMOVED"] = 6;
                values[valuesById[7] = "MEMBER_LEFT"] = 7;
                values[valuesById[8] = "ENCRYPTION_KEY_PAIR_REQUEST"] = 8;
                return values;
            })();

            ClosedGroupControlMessage.KeyPairWrapper = (function() {

                /**
                 * Properties of a KeyPairWrapper.
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage
                 * @interface IKeyPairWrapper
                 * @property {Uint8Array} publicKey KeyPairWrapper publicKey
                 * @property {Uint8Array} encryptedKeyPair KeyPairWrapper encryptedKeyPair
                 */

                /**
                 * Constructs a new KeyPairWrapper.
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage
                 * @classdesc Represents a KeyPairWrapper.
                 * @implements IKeyPairWrapper
                 * @constructor
                 * @param {signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper=} [properties] Properties to set
                 */
                function KeyPairWrapper(properties) {
                    if (properties)
                        for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * KeyPairWrapper publicKey.
                 * @member {Uint8Array} publicKey
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @instance
                 */
                KeyPairWrapper.prototype.publicKey = $util.newBuffer([]);

                /**
                 * KeyPairWrapper encryptedKeyPair.
                 * @member {Uint8Array} encryptedKeyPair
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @instance
                 */
                KeyPairWrapper.prototype.encryptedKeyPair = $util.newBuffer([]);

                /**
                 * Creates a new KeyPairWrapper instance using the specified properties.
                 * @function create
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper=} [properties] Properties to set
                 * @returns {signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper} KeyPairWrapper instance
                 */
                KeyPairWrapper.create = function create(properties) {
                    return new KeyPairWrapper(properties);
                };

                /**
                 * Encodes the specified KeyPairWrapper message. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.verify|verify} messages.
                 * @function encode
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper} message KeyPairWrapper message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyPairWrapper.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.encryptedKeyPair);
                    return writer;
                };

                /**
                 * Encodes the specified KeyPairWrapper message, length delimited. Does not implicitly {@link signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {signalservice.DataMessage.ClosedGroupControlMessage.IKeyPairWrapper} message KeyPairWrapper message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KeyPairWrapper.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a KeyPairWrapper message from the specified reader or buffer.
                 * @function decode
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper} KeyPairWrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyPairWrapper.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper();
                    while (reader.pos < end) {
                        let tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.publicKey = reader.bytes();
                                break;
                            }
                        case 2: {
                                message.encryptedKeyPair = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    if (!message.hasOwnProperty("publicKey"))
                        throw $util.ProtocolError("missing required 'publicKey'", { instance: message });
                    if (!message.hasOwnProperty("encryptedKeyPair"))
                        throw $util.ProtocolError("missing required 'encryptedKeyPair'", { instance: message });
                    return message;
                };

                /**
                 * Decodes a KeyPairWrapper message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper} KeyPairWrapper
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KeyPairWrapper.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a KeyPairWrapper message.
                 * @function verify
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                KeyPairWrapper.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                    if (!(message.encryptedKeyPair && typeof message.encryptedKeyPair.length === "number" || $util.isString(message.encryptedKeyPair)))
                        return "encryptedKeyPair: buffer expected";
                    return null;
                };

                /**
                 * Creates a KeyPairWrapper message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper} KeyPairWrapper
                 */
                KeyPairWrapper.fromObject = function fromObject(object) {
                    if (object instanceof $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper)
                        return object;
                    let message = new $root.signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper();
                    if (object.publicKey != null)
                        if (typeof object.publicKey === "string")
                            $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                        else if (object.publicKey.length >= 0)
                            message.publicKey = object.publicKey;
                    if (object.encryptedKeyPair != null)
                        if (typeof object.encryptedKeyPair === "string")
                            $util.base64.decode(object.encryptedKeyPair, message.encryptedKeyPair = $util.newBuffer($util.base64.length(object.encryptedKeyPair)), 0);
                        else if (object.encryptedKeyPair.length >= 0)
                            message.encryptedKeyPair = object.encryptedKeyPair;
                    return message;
                };

                /**
                 * Creates a plain object from a KeyPairWrapper message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper} message KeyPairWrapper
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                KeyPairWrapper.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    let object = {};
                    if (options.defaults) {
                        if (options.bytes === String)
                            object.publicKey = "";
                        else {
                            object.publicKey = [];
                            if (options.bytes !== Array)
                                object.publicKey = $util.newBuffer(object.publicKey);
                        }
                        if (options.bytes === String)
                            object.encryptedKeyPair = "";
                        else {
                            object.encryptedKeyPair = [];
                            if (options.bytes !== Array)
                                object.encryptedKeyPair = $util.newBuffer(object.encryptedKeyPair);
                        }
                    }
                    if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                        object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                    if (message.encryptedKeyPair != null && message.hasOwnProperty("encryptedKeyPair"))
                        object.encryptedKeyPair = options.bytes === String ? $util.base64.encode(message.encryptedKeyPair, 0, message.encryptedKeyPair.length) : options.bytes === Array ? Array.prototype.slice.call(message.encryptedKeyPair) : message.encryptedKeyPair;
                    return object;
                };

                /**
                 * Converts this KeyPairWrapper to JSON.
                 * @function toJSON
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                KeyPairWrapper.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for KeyPairWrapper
                 * @function getTypeUrl
                 * @memberof signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                KeyPairWrapper.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/signalservice.DataMessage.ClosedGroupControlMessage.KeyPairWrapper";
                };

                return KeyPairWrapper;
            })();

            return ClosedGroupControlMessage;
        })();

        return DataMessage;
    })();

    signalservice.CallMessage = (function() {

        /**
         * Properties of a CallMessage.
         * @memberof signalservice
         * @interface ICallMessage
         * @property {signalservice.CallMessage.Type} type CallMessage type
         * @property {Array.<string>|null} [sdps] CallMessage sdps
         * @property {Array.<number>|null} [sdpMLineIndexes] CallMessage sdpMLineIndexes
         * @property {Array.<string>|null} [sdpMids] CallMessage sdpMids
         * @property {string} uuid CallMessage uuid
         */

        /**
         * Constructs a new CallMessage.
         * @memberof signalservice
         * @classdesc Represents a CallMessage.
         * @implements ICallMessage
         * @constructor
         * @param {signalservice.ICallMessage=} [properties] Properties to set
         */
        function CallMessage(properties) {
            this.sdps = [];
            this.sdpMLineIndexes = [];
            this.sdpMids = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CallMessage type.
         * @member {signalservice.CallMessage.Type} type
         * @memberof signalservice.CallMessage
         * @instance
         */
        CallMessage.prototype.type = 6;

        /**
         * CallMessage sdps.
         * @member {Array.<string>} sdps
         * @memberof signalservice.CallMessage
         * @instance
         */
        CallMessage.prototype.sdps = $util.emptyArray;

        /**
         * CallMessage sdpMLineIndexes.
         * @member {Array.<number>} sdpMLineIndexes
         * @memberof signalservice.CallMessage
         * @instance
         */
        CallMessage.prototype.sdpMLineIndexes = $util.emptyArray;

        /**
         * CallMessage sdpMids.
         * @member {Array.<string>} sdpMids
         * @memberof signalservice.CallMessage
         * @instance
         */
        CallMessage.prototype.sdpMids = $util.emptyArray;

        /**
         * CallMessage uuid.
         * @member {string} uuid
         * @memberof signalservice.CallMessage
         * @instance
         */
        CallMessage.prototype.uuid = "";

        /**
         * Creates a new CallMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.CallMessage
         * @static
         * @param {signalservice.ICallMessage=} [properties] Properties to set
         * @returns {signalservice.CallMessage} CallMessage instance
         */
        CallMessage.create = function create(properties) {
            return new CallMessage(properties);
        };

        /**
         * Encodes the specified CallMessage message. Does not implicitly {@link signalservice.CallMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.CallMessage
         * @static
         * @param {signalservice.ICallMessage} message CallMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CallMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.sdps != null && message.sdps.length)
                for (let i = 0; i < message.sdps.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.sdps[i]);
            if (message.sdpMLineIndexes != null && message.sdpMLineIndexes.length)
                for (let i = 0; i < message.sdpMLineIndexes.length; ++i)
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.sdpMLineIndexes[i]);
            if (message.sdpMids != null && message.sdpMids.length)
                for (let i = 0; i < message.sdpMids.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.sdpMids[i]);
            writer.uint32(/* id 5, wireType 2 =*/42).string(message.uuid);
            return writer;
        };

        /**
         * Encodes the specified CallMessage message, length delimited. Does not implicitly {@link signalservice.CallMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.CallMessage
         * @static
         * @param {signalservice.ICallMessage} message CallMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CallMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CallMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.CallMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.CallMessage} CallMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CallMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.CallMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.sdps && message.sdps.length))
                            message.sdps = [];
                        message.sdps.push(reader.string());
                        break;
                    }
                case 3: {
                        if (!(message.sdpMLineIndexes && message.sdpMLineIndexes.length))
                            message.sdpMLineIndexes = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.sdpMLineIndexes.push(reader.uint32());
                        } else
                            message.sdpMLineIndexes.push(reader.uint32());
                        break;
                    }
                case 4: {
                        if (!(message.sdpMids && message.sdpMids.length))
                            message.sdpMids = [];
                        message.sdpMids.push(reader.string());
                        break;
                    }
                case 5: {
                        message.uuid = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("uuid"))
                throw $util.ProtocolError("missing required 'uuid'", { instance: message });
            return message;
        };

        /**
         * Decodes a CallMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.CallMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.CallMessage} CallMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CallMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CallMessage message.
         * @function verify
         * @memberof signalservice.CallMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CallMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 6:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            }
            if (message.sdps != null && message.hasOwnProperty("sdps")) {
                if (!Array.isArray(message.sdps))
                    return "sdps: array expected";
                for (let i = 0; i < message.sdps.length; ++i)
                    if (!$util.isString(message.sdps[i]))
                        return "sdps: string[] expected";
            }
            if (message.sdpMLineIndexes != null && message.hasOwnProperty("sdpMLineIndexes")) {
                if (!Array.isArray(message.sdpMLineIndexes))
                    return "sdpMLineIndexes: array expected";
                for (let i = 0; i < message.sdpMLineIndexes.length; ++i)
                    if (!$util.isInteger(message.sdpMLineIndexes[i]))
                        return "sdpMLineIndexes: integer[] expected";
            }
            if (message.sdpMids != null && message.hasOwnProperty("sdpMids")) {
                if (!Array.isArray(message.sdpMids))
                    return "sdpMids: array expected";
                for (let i = 0; i < message.sdpMids.length; ++i)
                    if (!$util.isString(message.sdpMids[i]))
                        return "sdpMids: string[] expected";
            }
            if (!$util.isString(message.uuid))
                return "uuid: string expected";
            return null;
        };

        /**
         * Creates a CallMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.CallMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.CallMessage} CallMessage
         */
        CallMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.CallMessage)
                return object;
            let message = new $root.signalservice.CallMessage();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "PRE_OFFER":
            case 6:
                message.type = 6;
                break;
            case "OFFER":
            case 1:
                message.type = 1;
                break;
            case "ANSWER":
            case 2:
                message.type = 2;
                break;
            case "PROVISIONAL_ANSWER":
            case 3:
                message.type = 3;
                break;
            case "ICE_CANDIDATES":
            case 4:
                message.type = 4;
                break;
            case "END_CALL":
            case 5:
                message.type = 5;
                break;
            }
            if (object.sdps) {
                if (!Array.isArray(object.sdps))
                    throw TypeError(".signalservice.CallMessage.sdps: array expected");
                message.sdps = [];
                for (let i = 0; i < object.sdps.length; ++i)
                    message.sdps[i] = String(object.sdps[i]);
            }
            if (object.sdpMLineIndexes) {
                if (!Array.isArray(object.sdpMLineIndexes))
                    throw TypeError(".signalservice.CallMessage.sdpMLineIndexes: array expected");
                message.sdpMLineIndexes = [];
                for (let i = 0; i < object.sdpMLineIndexes.length; ++i)
                    message.sdpMLineIndexes[i] = object.sdpMLineIndexes[i] >>> 0;
            }
            if (object.sdpMids) {
                if (!Array.isArray(object.sdpMids))
                    throw TypeError(".signalservice.CallMessage.sdpMids: array expected");
                message.sdpMids = [];
                for (let i = 0; i < object.sdpMids.length; ++i)
                    message.sdpMids[i] = String(object.sdpMids[i]);
            }
            if (object.uuid != null)
                message.uuid = String(object.uuid);
            return message;
        };

        /**
         * Creates a plain object from a CallMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.CallMessage
         * @static
         * @param {signalservice.CallMessage} message CallMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CallMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.sdps = [];
                object.sdpMLineIndexes = [];
                object.sdpMids = [];
            }
            if (options.defaults) {
                object.type = options.enums === String ? "PRE_OFFER" : 6;
                object.uuid = "";
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.CallMessage.Type[message.type] === undefined ? message.type : $root.signalservice.CallMessage.Type[message.type] : message.type;
            if (message.sdps && message.sdps.length) {
                object.sdps = [];
                for (let j = 0; j < message.sdps.length; ++j)
                    object.sdps[j] = message.sdps[j];
            }
            if (message.sdpMLineIndexes && message.sdpMLineIndexes.length) {
                object.sdpMLineIndexes = [];
                for (let j = 0; j < message.sdpMLineIndexes.length; ++j)
                    object.sdpMLineIndexes[j] = message.sdpMLineIndexes[j];
            }
            if (message.sdpMids && message.sdpMids.length) {
                object.sdpMids = [];
                for (let j = 0; j < message.sdpMids.length; ++j)
                    object.sdpMids[j] = message.sdpMids[j];
            }
            if (message.uuid != null && message.hasOwnProperty("uuid"))
                object.uuid = message.uuid;
            return object;
        };

        /**
         * Converts this CallMessage to JSON.
         * @function toJSON
         * @memberof signalservice.CallMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CallMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for CallMessage
         * @function getTypeUrl
         * @memberof signalservice.CallMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        CallMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.CallMessage";
        };

        /**
         * Type enum.
         * @name signalservice.CallMessage.Type
         * @enum {number}
         * @property {number} PRE_OFFER=6 PRE_OFFER value
         * @property {number} OFFER=1 OFFER value
         * @property {number} ANSWER=2 ANSWER value
         * @property {number} PROVISIONAL_ANSWER=3 PROVISIONAL_ANSWER value
         * @property {number} ICE_CANDIDATES=4 ICE_CANDIDATES value
         * @property {number} END_CALL=5 END_CALL value
         */
        CallMessage.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[6] = "PRE_OFFER"] = 6;
            values[valuesById[1] = "OFFER"] = 1;
            values[valuesById[2] = "ANSWER"] = 2;
            values[valuesById[3] = "PROVISIONAL_ANSWER"] = 3;
            values[valuesById[4] = "ICE_CANDIDATES"] = 4;
            values[valuesById[5] = "END_CALL"] = 5;
            return values;
        })();

        return CallMessage;
    })();

    signalservice.ConfigurationMessage = (function() {

        /**
         * Properties of a ConfigurationMessage.
         * @memberof signalservice
         * @interface IConfigurationMessage
         * @property {Array.<signalservice.ConfigurationMessage.IClosedGroup>|null} [closedGroups] ConfigurationMessage closedGroups
         * @property {Array.<string>|null} [openGroups] ConfigurationMessage openGroups
         * @property {string|null} [displayName] ConfigurationMessage displayName
         * @property {string|null} [profilePicture] ConfigurationMessage profilePicture
         * @property {Uint8Array|null} [profileKey] ConfigurationMessage profileKey
         * @property {Array.<signalservice.ConfigurationMessage.IContact>|null} [contacts] ConfigurationMessage contacts
         */

        /**
         * Constructs a new ConfigurationMessage.
         * @memberof signalservice
         * @classdesc Represents a ConfigurationMessage.
         * @implements IConfigurationMessage
         * @constructor
         * @param {signalservice.IConfigurationMessage=} [properties] Properties to set
         */
        function ConfigurationMessage(properties) {
            this.closedGroups = [];
            this.openGroups = [];
            this.contacts = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConfigurationMessage closedGroups.
         * @member {Array.<signalservice.ConfigurationMessage.IClosedGroup>} closedGroups
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.closedGroups = $util.emptyArray;

        /**
         * ConfigurationMessage openGroups.
         * @member {Array.<string>} openGroups
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.openGroups = $util.emptyArray;

        /**
         * ConfigurationMessage displayName.
         * @member {string} displayName
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.displayName = "";

        /**
         * ConfigurationMessage profilePicture.
         * @member {string} profilePicture
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.profilePicture = "";

        /**
         * ConfigurationMessage profileKey.
         * @member {Uint8Array} profileKey
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.profileKey = $util.newBuffer([]);

        /**
         * ConfigurationMessage contacts.
         * @member {Array.<signalservice.ConfigurationMessage.IContact>} contacts
         * @memberof signalservice.ConfigurationMessage
         * @instance
         */
        ConfigurationMessage.prototype.contacts = $util.emptyArray;

        /**
         * Creates a new ConfigurationMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {signalservice.IConfigurationMessage=} [properties] Properties to set
         * @returns {signalservice.ConfigurationMessage} ConfigurationMessage instance
         */
        ConfigurationMessage.create = function create(properties) {
            return new ConfigurationMessage(properties);
        };

        /**
         * Encodes the specified ConfigurationMessage message. Does not implicitly {@link signalservice.ConfigurationMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {signalservice.IConfigurationMessage} message ConfigurationMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.closedGroups != null && message.closedGroups.length)
                for (let i = 0; i < message.closedGroups.length; ++i)
                    $root.signalservice.ConfigurationMessage.ClosedGroup.encode(message.closedGroups[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.openGroups != null && message.openGroups.length)
                for (let i = 0; i < message.openGroups.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.openGroups[i]);
            if (message.displayName != null && Object.hasOwnProperty.call(message, "displayName"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.displayName);
            if (message.profilePicture != null && Object.hasOwnProperty.call(message, "profilePicture"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.profilePicture);
            if (message.profileKey != null && Object.hasOwnProperty.call(message, "profileKey"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.profileKey);
            if (message.contacts != null && message.contacts.length)
                for (let i = 0; i < message.contacts.length; ++i)
                    $root.signalservice.ConfigurationMessage.Contact.encode(message.contacts[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ConfigurationMessage message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {signalservice.IConfigurationMessage} message ConfigurationMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConfigurationMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ConfigurationMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.ConfigurationMessage} ConfigurationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.ConfigurationMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.closedGroups && message.closedGroups.length))
                            message.closedGroups = [];
                        message.closedGroups.push($root.signalservice.ConfigurationMessage.ClosedGroup.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        if (!(message.openGroups && message.openGroups.length))
                            message.openGroups = [];
                        message.openGroups.push(reader.string());
                        break;
                    }
                case 3: {
                        message.displayName = reader.string();
                        break;
                    }
                case 4: {
                        message.profilePicture = reader.string();
                        break;
                    }
                case 5: {
                        message.profileKey = reader.bytes();
                        break;
                    }
                case 6: {
                        if (!(message.contacts && message.contacts.length))
                            message.contacts = [];
                        message.contacts.push($root.signalservice.ConfigurationMessage.Contact.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ConfigurationMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.ConfigurationMessage} ConfigurationMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConfigurationMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConfigurationMessage message.
         * @function verify
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConfigurationMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.closedGroups != null && message.hasOwnProperty("closedGroups")) {
                if (!Array.isArray(message.closedGroups))
                    return "closedGroups: array expected";
                for (let i = 0; i < message.closedGroups.length; ++i) {
                    let error = $root.signalservice.ConfigurationMessage.ClosedGroup.verify(message.closedGroups[i]);
                    if (error)
                        return "closedGroups." + error;
                }
            }
            if (message.openGroups != null && message.hasOwnProperty("openGroups")) {
                if (!Array.isArray(message.openGroups))
                    return "openGroups: array expected";
                for (let i = 0; i < message.openGroups.length; ++i)
                    if (!$util.isString(message.openGroups[i]))
                        return "openGroups: string[] expected";
            }
            if (message.displayName != null && message.hasOwnProperty("displayName"))
                if (!$util.isString(message.displayName))
                    return "displayName: string expected";
            if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                if (!$util.isString(message.profilePicture))
                    return "profilePicture: string expected";
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                if (!(message.profileKey && typeof message.profileKey.length === "number" || $util.isString(message.profileKey)))
                    return "profileKey: buffer expected";
            if (message.contacts != null && message.hasOwnProperty("contacts")) {
                if (!Array.isArray(message.contacts))
                    return "contacts: array expected";
                for (let i = 0; i < message.contacts.length; ++i) {
                    let error = $root.signalservice.ConfigurationMessage.Contact.verify(message.contacts[i]);
                    if (error)
                        return "contacts." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ConfigurationMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.ConfigurationMessage} ConfigurationMessage
         */
        ConfigurationMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.ConfigurationMessage)
                return object;
            let message = new $root.signalservice.ConfigurationMessage();
            if (object.closedGroups) {
                if (!Array.isArray(object.closedGroups))
                    throw TypeError(".signalservice.ConfigurationMessage.closedGroups: array expected");
                message.closedGroups = [];
                for (let i = 0; i < object.closedGroups.length; ++i) {
                    if (typeof object.closedGroups[i] !== "object")
                        throw TypeError(".signalservice.ConfigurationMessage.closedGroups: object expected");
                    message.closedGroups[i] = $root.signalservice.ConfigurationMessage.ClosedGroup.fromObject(object.closedGroups[i]);
                }
            }
            if (object.openGroups) {
                if (!Array.isArray(object.openGroups))
                    throw TypeError(".signalservice.ConfigurationMessage.openGroups: array expected");
                message.openGroups = [];
                for (let i = 0; i < object.openGroups.length; ++i)
                    message.openGroups[i] = String(object.openGroups[i]);
            }
            if (object.displayName != null)
                message.displayName = String(object.displayName);
            if (object.profilePicture != null)
                message.profilePicture = String(object.profilePicture);
            if (object.profileKey != null)
                if (typeof object.profileKey === "string")
                    $util.base64.decode(object.profileKey, message.profileKey = $util.newBuffer($util.base64.length(object.profileKey)), 0);
                else if (object.profileKey.length >= 0)
                    message.profileKey = object.profileKey;
            if (object.contacts) {
                if (!Array.isArray(object.contacts))
                    throw TypeError(".signalservice.ConfigurationMessage.contacts: array expected");
                message.contacts = [];
                for (let i = 0; i < object.contacts.length; ++i) {
                    if (typeof object.contacts[i] !== "object")
                        throw TypeError(".signalservice.ConfigurationMessage.contacts: object expected");
                    message.contacts[i] = $root.signalservice.ConfigurationMessage.Contact.fromObject(object.contacts[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ConfigurationMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {signalservice.ConfigurationMessage} message ConfigurationMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConfigurationMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.closedGroups = [];
                object.openGroups = [];
                object.contacts = [];
            }
            if (options.defaults) {
                object.displayName = "";
                object.profilePicture = "";
                if (options.bytes === String)
                    object.profileKey = "";
                else {
                    object.profileKey = [];
                    if (options.bytes !== Array)
                        object.profileKey = $util.newBuffer(object.profileKey);
                }
            }
            if (message.closedGroups && message.closedGroups.length) {
                object.closedGroups = [];
                for (let j = 0; j < message.closedGroups.length; ++j)
                    object.closedGroups[j] = $root.signalservice.ConfigurationMessage.ClosedGroup.toObject(message.closedGroups[j], options);
            }
            if (message.openGroups && message.openGroups.length) {
                object.openGroups = [];
                for (let j = 0; j < message.openGroups.length; ++j)
                    object.openGroups[j] = message.openGroups[j];
            }
            if (message.displayName != null && message.hasOwnProperty("displayName"))
                object.displayName = message.displayName;
            if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                object.profilePicture = message.profilePicture;
            if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                object.profileKey = options.bytes === String ? $util.base64.encode(message.profileKey, 0, message.profileKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.profileKey) : message.profileKey;
            if (message.contacts && message.contacts.length) {
                object.contacts = [];
                for (let j = 0; j < message.contacts.length; ++j)
                    object.contacts[j] = $root.signalservice.ConfigurationMessage.Contact.toObject(message.contacts[j], options);
            }
            return object;
        };

        /**
         * Converts this ConfigurationMessage to JSON.
         * @function toJSON
         * @memberof signalservice.ConfigurationMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConfigurationMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConfigurationMessage
         * @function getTypeUrl
         * @memberof signalservice.ConfigurationMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConfigurationMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.ConfigurationMessage";
        };

        ConfigurationMessage.ClosedGroup = (function() {

            /**
             * Properties of a ClosedGroup.
             * @memberof signalservice.ConfigurationMessage
             * @interface IClosedGroup
             * @property {Uint8Array|null} [publicKey] ClosedGroup publicKey
             * @property {string|null} [name] ClosedGroup name
             * @property {signalservice.IKeyPair|null} [encryptionKeyPair] ClosedGroup encryptionKeyPair
             * @property {Array.<Uint8Array>|null} [members] ClosedGroup members
             * @property {Array.<Uint8Array>|null} [admins] ClosedGroup admins
             */

            /**
             * Constructs a new ClosedGroup.
             * @memberof signalservice.ConfigurationMessage
             * @classdesc Represents a ClosedGroup.
             * @implements IClosedGroup
             * @constructor
             * @param {signalservice.ConfigurationMessage.IClosedGroup=} [properties] Properties to set
             */
            function ClosedGroup(properties) {
                this.members = [];
                this.admins = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ClosedGroup publicKey.
             * @member {Uint8Array} publicKey
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             */
            ClosedGroup.prototype.publicKey = $util.newBuffer([]);

            /**
             * ClosedGroup name.
             * @member {string} name
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             */
            ClosedGroup.prototype.name = "";

            /**
             * ClosedGroup encryptionKeyPair.
             * @member {signalservice.IKeyPair|null|undefined} encryptionKeyPair
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             */
            ClosedGroup.prototype.encryptionKeyPair = null;

            /**
             * ClosedGroup members.
             * @member {Array.<Uint8Array>} members
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             */
            ClosedGroup.prototype.members = $util.emptyArray;

            /**
             * ClosedGroup admins.
             * @member {Array.<Uint8Array>} admins
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             */
            ClosedGroup.prototype.admins = $util.emptyArray;

            /**
             * Creates a new ClosedGroup instance using the specified properties.
             * @function create
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {signalservice.ConfigurationMessage.IClosedGroup=} [properties] Properties to set
             * @returns {signalservice.ConfigurationMessage.ClosedGroup} ClosedGroup instance
             */
            ClosedGroup.create = function create(properties) {
                return new ClosedGroup(properties);
            };

            /**
             * Encodes the specified ClosedGroup message. Does not implicitly {@link signalservice.ConfigurationMessage.ClosedGroup.verify|verify} messages.
             * @function encode
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {signalservice.ConfigurationMessage.IClosedGroup} message ClosedGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClosedGroup.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.publicKey != null && Object.hasOwnProperty.call(message, "publicKey"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.encryptionKeyPair != null && Object.hasOwnProperty.call(message, "encryptionKeyPair"))
                    $root.signalservice.KeyPair.encode(message.encryptionKeyPair, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.members != null && message.members.length)
                    for (let i = 0; i < message.members.length; ++i)
                        writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.members[i]);
                if (message.admins != null && message.admins.length)
                    for (let i = 0; i < message.admins.length; ++i)
                        writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.admins[i]);
                return writer;
            };

            /**
             * Encodes the specified ClosedGroup message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.ClosedGroup.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {signalservice.ConfigurationMessage.IClosedGroup} message ClosedGroup message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ClosedGroup.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ClosedGroup message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.ConfigurationMessage.ClosedGroup} ClosedGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClosedGroup.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.ConfigurationMessage.ClosedGroup();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.publicKey = reader.bytes();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.encryptionKeyPair = $root.signalservice.KeyPair.decode(reader, reader.uint32());
                            break;
                        }
                    case 4: {
                            if (!(message.members && message.members.length))
                                message.members = [];
                            message.members.push(reader.bytes());
                            break;
                        }
                    case 5: {
                            if (!(message.admins && message.admins.length))
                                message.admins = [];
                            message.admins.push(reader.bytes());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ClosedGroup message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.ConfigurationMessage.ClosedGroup} ClosedGroup
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ClosedGroup.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ClosedGroup message.
             * @function verify
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ClosedGroup.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.encryptionKeyPair != null && message.hasOwnProperty("encryptionKeyPair")) {
                    let error = $root.signalservice.KeyPair.verify(message.encryptionKeyPair);
                    if (error)
                        return "encryptionKeyPair." + error;
                }
                if (message.members != null && message.hasOwnProperty("members")) {
                    if (!Array.isArray(message.members))
                        return "members: array expected";
                    for (let i = 0; i < message.members.length; ++i)
                        if (!(message.members[i] && typeof message.members[i].length === "number" || $util.isString(message.members[i])))
                            return "members: buffer[] expected";
                }
                if (message.admins != null && message.hasOwnProperty("admins")) {
                    if (!Array.isArray(message.admins))
                        return "admins: array expected";
                    for (let i = 0; i < message.admins.length; ++i)
                        if (!(message.admins[i] && typeof message.admins[i].length === "number" || $util.isString(message.admins[i])))
                            return "admins: buffer[] expected";
                }
                return null;
            };

            /**
             * Creates a ClosedGroup message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.ConfigurationMessage.ClosedGroup} ClosedGroup
             */
            ClosedGroup.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.ConfigurationMessage.ClosedGroup)
                    return object;
                let message = new $root.signalservice.ConfigurationMessage.ClosedGroup();
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length >= 0)
                        message.publicKey = object.publicKey;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.encryptionKeyPair != null) {
                    if (typeof object.encryptionKeyPair !== "object")
                        throw TypeError(".signalservice.ConfigurationMessage.ClosedGroup.encryptionKeyPair: object expected");
                    message.encryptionKeyPair = $root.signalservice.KeyPair.fromObject(object.encryptionKeyPair);
                }
                if (object.members) {
                    if (!Array.isArray(object.members))
                        throw TypeError(".signalservice.ConfigurationMessage.ClosedGroup.members: array expected");
                    message.members = [];
                    for (let i = 0; i < object.members.length; ++i)
                        if (typeof object.members[i] === "string")
                            $util.base64.decode(object.members[i], message.members[i] = $util.newBuffer($util.base64.length(object.members[i])), 0);
                        else if (object.members[i].length >= 0)
                            message.members[i] = object.members[i];
                }
                if (object.admins) {
                    if (!Array.isArray(object.admins))
                        throw TypeError(".signalservice.ConfigurationMessage.ClosedGroup.admins: array expected");
                    message.admins = [];
                    for (let i = 0; i < object.admins.length; ++i)
                        if (typeof object.admins[i] === "string")
                            $util.base64.decode(object.admins[i], message.admins[i] = $util.newBuffer($util.base64.length(object.admins[i])), 0);
                        else if (object.admins[i].length >= 0)
                            message.admins[i] = object.admins[i];
                }
                return message;
            };

            /**
             * Creates a plain object from a ClosedGroup message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {signalservice.ConfigurationMessage.ClosedGroup} message ClosedGroup
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ClosedGroup.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults) {
                    object.members = [];
                    object.admins = [];
                }
                if (options.defaults) {
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    object.name = "";
                    object.encryptionKeyPair = null;
                }
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.encryptionKeyPair != null && message.hasOwnProperty("encryptionKeyPair"))
                    object.encryptionKeyPair = $root.signalservice.KeyPair.toObject(message.encryptionKeyPair, options);
                if (message.members && message.members.length) {
                    object.members = [];
                    for (let j = 0; j < message.members.length; ++j)
                        object.members[j] = options.bytes === String ? $util.base64.encode(message.members[j], 0, message.members[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.members[j]) : message.members[j];
                }
                if (message.admins && message.admins.length) {
                    object.admins = [];
                    for (let j = 0; j < message.admins.length; ++j)
                        object.admins[j] = options.bytes === String ? $util.base64.encode(message.admins[j], 0, message.admins[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.admins[j]) : message.admins[j];
                }
                return object;
            };

            /**
             * Converts this ClosedGroup to JSON.
             * @function toJSON
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ClosedGroup.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ClosedGroup
             * @function getTypeUrl
             * @memberof signalservice.ConfigurationMessage.ClosedGroup
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ClosedGroup.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.ConfigurationMessage.ClosedGroup";
            };

            return ClosedGroup;
        })();

        ConfigurationMessage.Contact = (function() {

            /**
             * Properties of a Contact.
             * @memberof signalservice.ConfigurationMessage
             * @interface IContact
             * @property {Uint8Array} publicKey Contact publicKey
             * @property {string} name Contact name
             * @property {string|null} [profilePicture] Contact profilePicture
             * @property {Uint8Array|null} [profileKey] Contact profileKey
             * @property {boolean|null} [isApproved] Contact isApproved
             * @property {boolean|null} [isBlocked] Contact isBlocked
             * @property {boolean|null} [didApproveMe] Contact didApproveMe
             */

            /**
             * Constructs a new Contact.
             * @memberof signalservice.ConfigurationMessage
             * @classdesc Represents a Contact.
             * @implements IContact
             * @constructor
             * @param {signalservice.ConfigurationMessage.IContact=} [properties] Properties to set
             */
            function Contact(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Contact publicKey.
             * @member {Uint8Array} publicKey
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.publicKey = $util.newBuffer([]);

            /**
             * Contact name.
             * @member {string} name
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.name = "";

            /**
             * Contact profilePicture.
             * @member {string} profilePicture
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.profilePicture = "";

            /**
             * Contact profileKey.
             * @member {Uint8Array} profileKey
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.profileKey = $util.newBuffer([]);

            /**
             * Contact isApproved.
             * @member {boolean} isApproved
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.isApproved = false;

            /**
             * Contact isBlocked.
             * @member {boolean} isBlocked
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.isBlocked = false;

            /**
             * Contact didApproveMe.
             * @member {boolean} didApproveMe
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             */
            Contact.prototype.didApproveMe = false;

            /**
             * Creates a new Contact instance using the specified properties.
             * @function create
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {signalservice.ConfigurationMessage.IContact=} [properties] Properties to set
             * @returns {signalservice.ConfigurationMessage.Contact} Contact instance
             */
            Contact.create = function create(properties) {
                return new Contact(properties);
            };

            /**
             * Encodes the specified Contact message. Does not implicitly {@link signalservice.ConfigurationMessage.Contact.verify|verify} messages.
             * @function encode
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {signalservice.ConfigurationMessage.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.publicKey);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                if (message.profilePicture != null && Object.hasOwnProperty.call(message, "profilePicture"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.profilePicture);
                if (message.profileKey != null && Object.hasOwnProperty.call(message, "profileKey"))
                    writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.profileKey);
                if (message.isApproved != null && Object.hasOwnProperty.call(message, "isApproved"))
                    writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isApproved);
                if (message.isBlocked != null && Object.hasOwnProperty.call(message, "isBlocked"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.isBlocked);
                if (message.didApproveMe != null && Object.hasOwnProperty.call(message, "didApproveMe"))
                    writer.uint32(/* id 7, wireType 0 =*/56).bool(message.didApproveMe);
                return writer;
            };

            /**
             * Encodes the specified Contact message, length delimited. Does not implicitly {@link signalservice.ConfigurationMessage.Contact.verify|verify} messages.
             * @function encodeDelimited
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {signalservice.ConfigurationMessage.IContact} message Contact message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Contact.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Contact message from the specified reader or buffer.
             * @function decode
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {signalservice.ConfigurationMessage.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.ConfigurationMessage.Contact();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.publicKey = reader.bytes();
                            break;
                        }
                    case 2: {
                            message.name = reader.string();
                            break;
                        }
                    case 3: {
                            message.profilePicture = reader.string();
                            break;
                        }
                    case 4: {
                            message.profileKey = reader.bytes();
                            break;
                        }
                    case 5: {
                            message.isApproved = reader.bool();
                            break;
                        }
                    case 6: {
                            message.isBlocked = reader.bool();
                            break;
                        }
                    case 7: {
                            message.didApproveMe = reader.bool();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                if (!message.hasOwnProperty("publicKey"))
                    throw $util.ProtocolError("missing required 'publicKey'", { instance: message });
                if (!message.hasOwnProperty("name"))
                    throw $util.ProtocolError("missing required 'name'", { instance: message });
                return message;
            };

            /**
             * Decodes a Contact message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {signalservice.ConfigurationMessage.Contact} Contact
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Contact.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Contact message.
             * @function verify
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Contact.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                    return "publicKey: buffer expected";
                if (!$util.isString(message.name))
                    return "name: string expected";
                if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                    if (!$util.isString(message.profilePicture))
                        return "profilePicture: string expected";
                if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                    if (!(message.profileKey && typeof message.profileKey.length === "number" || $util.isString(message.profileKey)))
                        return "profileKey: buffer expected";
                if (message.isApproved != null && message.hasOwnProperty("isApproved"))
                    if (typeof message.isApproved !== "boolean")
                        return "isApproved: boolean expected";
                if (message.isBlocked != null && message.hasOwnProperty("isBlocked"))
                    if (typeof message.isBlocked !== "boolean")
                        return "isBlocked: boolean expected";
                if (message.didApproveMe != null && message.hasOwnProperty("didApproveMe"))
                    if (typeof message.didApproveMe !== "boolean")
                        return "didApproveMe: boolean expected";
                return null;
            };

            /**
             * Creates a Contact message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {signalservice.ConfigurationMessage.Contact} Contact
             */
            Contact.fromObject = function fromObject(object) {
                if (object instanceof $root.signalservice.ConfigurationMessage.Contact)
                    return object;
                let message = new $root.signalservice.ConfigurationMessage.Contact();
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length >= 0)
                        message.publicKey = object.publicKey;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.profilePicture != null)
                    message.profilePicture = String(object.profilePicture);
                if (object.profileKey != null)
                    if (typeof object.profileKey === "string")
                        $util.base64.decode(object.profileKey, message.profileKey = $util.newBuffer($util.base64.length(object.profileKey)), 0);
                    else if (object.profileKey.length >= 0)
                        message.profileKey = object.profileKey;
                if (object.isApproved != null)
                    message.isApproved = Boolean(object.isApproved);
                if (object.isBlocked != null)
                    message.isBlocked = Boolean(object.isBlocked);
                if (object.didApproveMe != null)
                    message.didApproveMe = Boolean(object.didApproveMe);
                return message;
            };

            /**
             * Creates a plain object from a Contact message. Also converts values to other types if specified.
             * @function toObject
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {signalservice.ConfigurationMessage.Contact} message Contact
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Contact.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    object.name = "";
                    object.profilePicture = "";
                    if (options.bytes === String)
                        object.profileKey = "";
                    else {
                        object.profileKey = [];
                        if (options.bytes !== Array)
                            object.profileKey = $util.newBuffer(object.profileKey);
                    }
                    object.isApproved = false;
                    object.isBlocked = false;
                    object.didApproveMe = false;
                }
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.profilePicture != null && message.hasOwnProperty("profilePicture"))
                    object.profilePicture = message.profilePicture;
                if (message.profileKey != null && message.hasOwnProperty("profileKey"))
                    object.profileKey = options.bytes === String ? $util.base64.encode(message.profileKey, 0, message.profileKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.profileKey) : message.profileKey;
                if (message.isApproved != null && message.hasOwnProperty("isApproved"))
                    object.isApproved = message.isApproved;
                if (message.isBlocked != null && message.hasOwnProperty("isBlocked"))
                    object.isBlocked = message.isBlocked;
                if (message.didApproveMe != null && message.hasOwnProperty("didApproveMe"))
                    object.didApproveMe = message.didApproveMe;
                return object;
            };

            /**
             * Converts this Contact to JSON.
             * @function toJSON
             * @memberof signalservice.ConfigurationMessage.Contact
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Contact.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Contact
             * @function getTypeUrl
             * @memberof signalservice.ConfigurationMessage.Contact
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Contact.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/signalservice.ConfigurationMessage.Contact";
            };

            return Contact;
        })();

        return ConfigurationMessage;
    })();

    signalservice.ReceiptMessage = (function() {

        /**
         * Properties of a ReceiptMessage.
         * @memberof signalservice
         * @interface IReceiptMessage
         * @property {signalservice.ReceiptMessage.Type} type ReceiptMessage type
         * @property {Array.<number|Long>|null} [timestamp] ReceiptMessage timestamp
         */

        /**
         * Constructs a new ReceiptMessage.
         * @memberof signalservice
         * @classdesc Represents a ReceiptMessage.
         * @implements IReceiptMessage
         * @constructor
         * @param {signalservice.IReceiptMessage=} [properties] Properties to set
         */
        function ReceiptMessage(properties) {
            this.timestamp = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReceiptMessage type.
         * @member {signalservice.ReceiptMessage.Type} type
         * @memberof signalservice.ReceiptMessage
         * @instance
         */
        ReceiptMessage.prototype.type = 1;

        /**
         * ReceiptMessage timestamp.
         * @member {Array.<number|Long>} timestamp
         * @memberof signalservice.ReceiptMessage
         * @instance
         */
        ReceiptMessage.prototype.timestamp = $util.emptyArray;

        /**
         * Creates a new ReceiptMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {signalservice.IReceiptMessage=} [properties] Properties to set
         * @returns {signalservice.ReceiptMessage} ReceiptMessage instance
         */
        ReceiptMessage.create = function create(properties) {
            return new ReceiptMessage(properties);
        };

        /**
         * Encodes the specified ReceiptMessage message. Does not implicitly {@link signalservice.ReceiptMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {signalservice.IReceiptMessage} message ReceiptMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReceiptMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.timestamp != null && message.timestamp.length)
                for (let i = 0; i < message.timestamp.length; ++i)
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.timestamp[i]);
            return writer;
        };

        /**
         * Encodes the specified ReceiptMessage message, length delimited. Does not implicitly {@link signalservice.ReceiptMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {signalservice.IReceiptMessage} message ReceiptMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReceiptMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReceiptMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.ReceiptMessage} ReceiptMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReceiptMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.ReceiptMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        if (!(message.timestamp && message.timestamp.length))
                            message.timestamp = [];
                        if ((tag & 7) === 2) {
                            let end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.timestamp.push(reader.uint64());
                        } else
                            message.timestamp.push(reader.uint64());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            return message;
        };

        /**
         * Decodes a ReceiptMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.ReceiptMessage} ReceiptMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReceiptMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReceiptMessage message.
         * @function verify
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReceiptMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
                break;
            }
            if (message.timestamp != null && message.hasOwnProperty("timestamp")) {
                if (!Array.isArray(message.timestamp))
                    return "timestamp: array expected";
                for (let i = 0; i < message.timestamp.length; ++i)
                    if (!$util.isInteger(message.timestamp[i]) && !(message.timestamp[i] && $util.isInteger(message.timestamp[i].low) && $util.isInteger(message.timestamp[i].high)))
                        return "timestamp: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a ReceiptMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.ReceiptMessage} ReceiptMessage
         */
        ReceiptMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.ReceiptMessage)
                return object;
            let message = new $root.signalservice.ReceiptMessage();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "READ":
            case 1:
                message.type = 1;
                break;
            }
            if (object.timestamp) {
                if (!Array.isArray(object.timestamp))
                    throw TypeError(".signalservice.ReceiptMessage.timestamp: array expected");
                message.timestamp = [];
                for (let i = 0; i < object.timestamp.length; ++i)
                    if ($util.Long)
                        (message.timestamp[i] = $util.Long.fromValue(object.timestamp[i])).unsigned = true;
                    else if (typeof object.timestamp[i] === "string")
                        message.timestamp[i] = parseInt(object.timestamp[i], 10);
                    else if (typeof object.timestamp[i] === "number")
                        message.timestamp[i] = object.timestamp[i];
                    else if (typeof object.timestamp[i] === "object")
                        message.timestamp[i] = new $util.LongBits(object.timestamp[i].low >>> 0, object.timestamp[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a ReceiptMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {signalservice.ReceiptMessage} message ReceiptMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReceiptMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.timestamp = [];
            if (options.defaults)
                object.type = options.enums === String ? "READ" : 1;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.ReceiptMessage.Type[message.type] === undefined ? message.type : $root.signalservice.ReceiptMessage.Type[message.type] : message.type;
            if (message.timestamp && message.timestamp.length) {
                object.timestamp = [];
                for (let j = 0; j < message.timestamp.length; ++j)
                    if (typeof message.timestamp[j] === "number")
                        object.timestamp[j] = options.longs === String ? String(message.timestamp[j]) : message.timestamp[j];
                    else
                        object.timestamp[j] = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp[j]) : options.longs === Number ? new $util.LongBits(message.timestamp[j].low >>> 0, message.timestamp[j].high >>> 0).toNumber(true) : message.timestamp[j];
            }
            return object;
        };

        /**
         * Converts this ReceiptMessage to JSON.
         * @function toJSON
         * @memberof signalservice.ReceiptMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReceiptMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ReceiptMessage
         * @function getTypeUrl
         * @memberof signalservice.ReceiptMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ReceiptMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.ReceiptMessage";
        };

        /**
         * Type enum.
         * @name signalservice.ReceiptMessage.Type
         * @enum {number}
         * @property {number} READ=1 READ value
         */
        ReceiptMessage.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "READ"] = 1;
            return values;
        })();

        return ReceiptMessage;
    })();

    signalservice.AttachmentPointer = (function() {

        /**
         * Properties of an AttachmentPointer.
         * @memberof signalservice
         * @interface IAttachmentPointer
         * @property {number|Long} id AttachmentPointer id
         * @property {string|null} [contentType] AttachmentPointer contentType
         * @property {Uint8Array|null} [key] AttachmentPointer key
         * @property {number|null} [size] AttachmentPointer size
         * @property {Uint8Array|null} [digest] AttachmentPointer digest
         * @property {string|null} [fileName] AttachmentPointer fileName
         * @property {number|null} [flags] AttachmentPointer flags
         * @property {number|null} [width] AttachmentPointer width
         * @property {number|null} [height] AttachmentPointer height
         * @property {string|null} [caption] AttachmentPointer caption
         * @property {string|null} [url] AttachmentPointer url
         */

        /**
         * Constructs a new AttachmentPointer.
         * @memberof signalservice
         * @classdesc Represents an AttachmentPointer.
         * @implements IAttachmentPointer
         * @constructor
         * @param {signalservice.IAttachmentPointer=} [properties] Properties to set
         */
        function AttachmentPointer(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AttachmentPointer id.
         * @member {number|Long} id
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AttachmentPointer contentType.
         * @member {string} contentType
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.contentType = "";

        /**
         * AttachmentPointer key.
         * @member {Uint8Array} key
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.key = $util.newBuffer([]);

        /**
         * AttachmentPointer size.
         * @member {number} size
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.size = 0;

        /**
         * AttachmentPointer digest.
         * @member {Uint8Array} digest
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.digest = $util.newBuffer([]);

        /**
         * AttachmentPointer fileName.
         * @member {string} fileName
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.fileName = "";

        /**
         * AttachmentPointer flags.
         * @member {number} flags
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.flags = 0;

        /**
         * AttachmentPointer width.
         * @member {number} width
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.width = 0;

        /**
         * AttachmentPointer height.
         * @member {number} height
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.height = 0;

        /**
         * AttachmentPointer caption.
         * @member {string} caption
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.caption = "";

        /**
         * AttachmentPointer url.
         * @member {string} url
         * @memberof signalservice.AttachmentPointer
         * @instance
         */
        AttachmentPointer.prototype.url = "";

        /**
         * Creates a new AttachmentPointer instance using the specified properties.
         * @function create
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {signalservice.IAttachmentPointer=} [properties] Properties to set
         * @returns {signalservice.AttachmentPointer} AttachmentPointer instance
         */
        AttachmentPointer.create = function create(properties) {
            return new AttachmentPointer(properties);
        };

        /**
         * Encodes the specified AttachmentPointer message. Does not implicitly {@link signalservice.AttachmentPointer.verify|verify} messages.
         * @function encode
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {signalservice.IAttachmentPointer} message AttachmentPointer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttachmentPointer.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 1 =*/9).fixed64(message.id);
            if (message.contentType != null && Object.hasOwnProperty.call(message, "contentType"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.contentType);
            if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.key);
            if (message.size != null && Object.hasOwnProperty.call(message, "size"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.size);
            if (message.digest != null && Object.hasOwnProperty.call(message, "digest"))
                writer.uint32(/* id 6, wireType 2 =*/50).bytes(message.digest);
            if (message.fileName != null && Object.hasOwnProperty.call(message, "fileName"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.fileName);
            if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.flags);
            if (message.width != null && Object.hasOwnProperty.call(message, "width"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.width);
            if (message.height != null && Object.hasOwnProperty.call(message, "height"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.height);
            if (message.caption != null && Object.hasOwnProperty.call(message, "caption"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.caption);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 101, wireType 2 =*/810).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified AttachmentPointer message, length delimited. Does not implicitly {@link signalservice.AttachmentPointer.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {signalservice.IAttachmentPointer} message AttachmentPointer message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AttachmentPointer.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AttachmentPointer message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.AttachmentPointer} AttachmentPointer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttachmentPointer.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.AttachmentPointer();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.fixed64();
                        break;
                    }
                case 2: {
                        message.contentType = reader.string();
                        break;
                    }
                case 3: {
                        message.key = reader.bytes();
                        break;
                    }
                case 4: {
                        message.size = reader.uint32();
                        break;
                    }
                case 6: {
                        message.digest = reader.bytes();
                        break;
                    }
                case 7: {
                        message.fileName = reader.string();
                        break;
                    }
                case 8: {
                        message.flags = reader.uint32();
                        break;
                    }
                case 9: {
                        message.width = reader.uint32();
                        break;
                    }
                case 10: {
                        message.height = reader.uint32();
                        break;
                    }
                case 11: {
                        message.caption = reader.string();
                        break;
                    }
                case 101: {
                        message.url = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            return message;
        };

        /**
         * Decodes an AttachmentPointer message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.AttachmentPointer} AttachmentPointer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AttachmentPointer.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AttachmentPointer message.
         * @function verify
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AttachmentPointer.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                return "id: integer|Long expected";
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                if (!$util.isString(message.contentType))
                    return "contentType: string expected";
            if (message.key != null && message.hasOwnProperty("key"))
                if (!(message.key && typeof message.key.length === "number" || $util.isString(message.key)))
                    return "key: buffer expected";
            if (message.size != null && message.hasOwnProperty("size"))
                if (!$util.isInteger(message.size))
                    return "size: integer expected";
            if (message.digest != null && message.hasOwnProperty("digest"))
                if (!(message.digest && typeof message.digest.length === "number" || $util.isString(message.digest)))
                    return "digest: buffer expected";
            if (message.fileName != null && message.hasOwnProperty("fileName"))
                if (!$util.isString(message.fileName))
                    return "fileName: string expected";
            if (message.flags != null && message.hasOwnProperty("flags"))
                if (!$util.isInteger(message.flags))
                    return "flags: integer expected";
            if (message.width != null && message.hasOwnProperty("width"))
                if (!$util.isInteger(message.width))
                    return "width: integer expected";
            if (message.height != null && message.hasOwnProperty("height"))
                if (!$util.isInteger(message.height))
                    return "height: integer expected";
            if (message.caption != null && message.hasOwnProperty("caption"))
                if (!$util.isString(message.caption))
                    return "caption: string expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        /**
         * Creates an AttachmentPointer message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.AttachmentPointer} AttachmentPointer
         */
        AttachmentPointer.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.AttachmentPointer)
                return object;
            let message = new $root.signalservice.AttachmentPointer();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.contentType != null)
                message.contentType = String(object.contentType);
            if (object.key != null)
                if (typeof object.key === "string")
                    $util.base64.decode(object.key, message.key = $util.newBuffer($util.base64.length(object.key)), 0);
                else if (object.key.length >= 0)
                    message.key = object.key;
            if (object.size != null)
                message.size = object.size >>> 0;
            if (object.digest != null)
                if (typeof object.digest === "string")
                    $util.base64.decode(object.digest, message.digest = $util.newBuffer($util.base64.length(object.digest)), 0);
                else if (object.digest.length >= 0)
                    message.digest = object.digest;
            if (object.fileName != null)
                message.fileName = String(object.fileName);
            if (object.flags != null)
                message.flags = object.flags >>> 0;
            if (object.width != null)
                message.width = object.width >>> 0;
            if (object.height != null)
                message.height = object.height >>> 0;
            if (object.caption != null)
                message.caption = String(object.caption);
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a plain object from an AttachmentPointer message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {signalservice.AttachmentPointer} message AttachmentPointer
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AttachmentPointer.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.contentType = "";
                if (options.bytes === String)
                    object.key = "";
                else {
                    object.key = [];
                    if (options.bytes !== Array)
                        object.key = $util.newBuffer(object.key);
                }
                object.size = 0;
                if (options.bytes === String)
                    object.digest = "";
                else {
                    object.digest = [];
                    if (options.bytes !== Array)
                        object.digest = $util.newBuffer(object.digest);
                }
                object.fileName = "";
                object.flags = 0;
                object.width = 0;
                object.height = 0;
                object.caption = "";
                object.url = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.contentType != null && message.hasOwnProperty("contentType"))
                object.contentType = message.contentType;
            if (message.key != null && message.hasOwnProperty("key"))
                object.key = options.bytes === String ? $util.base64.encode(message.key, 0, message.key.length) : options.bytes === Array ? Array.prototype.slice.call(message.key) : message.key;
            if (message.size != null && message.hasOwnProperty("size"))
                object.size = message.size;
            if (message.digest != null && message.hasOwnProperty("digest"))
                object.digest = options.bytes === String ? $util.base64.encode(message.digest, 0, message.digest.length) : options.bytes === Array ? Array.prototype.slice.call(message.digest) : message.digest;
            if (message.fileName != null && message.hasOwnProperty("fileName"))
                object.fileName = message.fileName;
            if (message.flags != null && message.hasOwnProperty("flags"))
                object.flags = message.flags;
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            if (message.caption != null && message.hasOwnProperty("caption"))
                object.caption = message.caption;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Converts this AttachmentPointer to JSON.
         * @function toJSON
         * @memberof signalservice.AttachmentPointer
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AttachmentPointer.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for AttachmentPointer
         * @function getTypeUrl
         * @memberof signalservice.AttachmentPointer
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        AttachmentPointer.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.AttachmentPointer";
        };

        /**
         * Flags enum.
         * @name signalservice.AttachmentPointer.Flags
         * @enum {number}
         * @property {number} VOICE_MESSAGE=1 VOICE_MESSAGE value
         */
        AttachmentPointer.Flags = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "VOICE_MESSAGE"] = 1;
            return values;
        })();

        return AttachmentPointer;
    })();

    signalservice.GroupContext = (function() {

        /**
         * Properties of a GroupContext.
         * @memberof signalservice
         * @interface IGroupContext
         * @property {Uint8Array|null} [id] GroupContext id
         * @property {signalservice.GroupContext.Type|null} [type] GroupContext type
         * @property {string|null} [name] GroupContext name
         * @property {Array.<string>|null} [members] GroupContext members
         * @property {signalservice.IAttachmentPointer|null} [avatar] GroupContext avatar
         * @property {Array.<string>|null} [admins] GroupContext admins
         */

        /**
         * Constructs a new GroupContext.
         * @memberof signalservice
         * @classdesc Represents a GroupContext.
         * @implements IGroupContext
         * @constructor
         * @param {signalservice.IGroupContext=} [properties] Properties to set
         */
        function GroupContext(properties) {
            this.members = [];
            this.admins = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GroupContext id.
         * @member {Uint8Array} id
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.id = $util.newBuffer([]);

        /**
         * GroupContext type.
         * @member {signalservice.GroupContext.Type} type
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.type = 0;

        /**
         * GroupContext name.
         * @member {string} name
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.name = "";

        /**
         * GroupContext members.
         * @member {Array.<string>} members
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.members = $util.emptyArray;

        /**
         * GroupContext avatar.
         * @member {signalservice.IAttachmentPointer|null|undefined} avatar
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.avatar = null;

        /**
         * GroupContext admins.
         * @member {Array.<string>} admins
         * @memberof signalservice.GroupContext
         * @instance
         */
        GroupContext.prototype.admins = $util.emptyArray;

        /**
         * Creates a new GroupContext instance using the specified properties.
         * @function create
         * @memberof signalservice.GroupContext
         * @static
         * @param {signalservice.IGroupContext=} [properties] Properties to set
         * @returns {signalservice.GroupContext} GroupContext instance
         */
        GroupContext.create = function create(properties) {
            return new GroupContext(properties);
        };

        /**
         * Encodes the specified GroupContext message. Does not implicitly {@link signalservice.GroupContext.verify|verify} messages.
         * @function encode
         * @memberof signalservice.GroupContext
         * @static
         * @param {signalservice.IGroupContext} message GroupContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupContext.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.id);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
            if (message.members != null && message.members.length)
                for (let i = 0; i < message.members.length; ++i)
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.members[i]);
            if (message.avatar != null && Object.hasOwnProperty.call(message, "avatar"))
                $root.signalservice.AttachmentPointer.encode(message.avatar, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.admins != null && message.admins.length)
                for (let i = 0; i < message.admins.length; ++i)
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.admins[i]);
            return writer;
        };

        /**
         * Encodes the specified GroupContext message, length delimited. Does not implicitly {@link signalservice.GroupContext.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.GroupContext
         * @static
         * @param {signalservice.IGroupContext} message GroupContext message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GroupContext.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GroupContext message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.GroupContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.GroupContext} GroupContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupContext.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.GroupContext();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.bytes();
                        break;
                    }
                case 2: {
                        message.type = reader.int32();
                        break;
                    }
                case 3: {
                        message.name = reader.string();
                        break;
                    }
                case 4: {
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push(reader.string());
                        break;
                    }
                case 5: {
                        message.avatar = $root.signalservice.AttachmentPointer.decode(reader, reader.uint32());
                        break;
                    }
                case 6: {
                        if (!(message.admins && message.admins.length))
                            message.admins = [];
                        message.admins.push(reader.string());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GroupContext message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.GroupContext
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.GroupContext} GroupContext
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GroupContext.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GroupContext message.
         * @function verify
         * @memberof signalservice.GroupContext
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GroupContext.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!(message.id && typeof message.id.length === "number" || $util.isString(message.id)))
                    return "id: buffer expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.members != null && message.hasOwnProperty("members")) {
                if (!Array.isArray(message.members))
                    return "members: array expected";
                for (let i = 0; i < message.members.length; ++i)
                    if (!$util.isString(message.members[i]))
                        return "members: string[] expected";
            }
            if (message.avatar != null && message.hasOwnProperty("avatar")) {
                let error = $root.signalservice.AttachmentPointer.verify(message.avatar);
                if (error)
                    return "avatar." + error;
            }
            if (message.admins != null && message.hasOwnProperty("admins")) {
                if (!Array.isArray(message.admins))
                    return "admins: array expected";
                for (let i = 0; i < message.admins.length; ++i)
                    if (!$util.isString(message.admins[i]))
                        return "admins: string[] expected";
            }
            return null;
        };

        /**
         * Creates a GroupContext message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.GroupContext
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.GroupContext} GroupContext
         */
        GroupContext.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.GroupContext)
                return object;
            let message = new $root.signalservice.GroupContext();
            if (object.id != null)
                if (typeof object.id === "string")
                    $util.base64.decode(object.id, message.id = $util.newBuffer($util.base64.length(object.id)), 0);
                else if (object.id.length >= 0)
                    message.id = object.id;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "UPDATE":
            case 1:
                message.type = 1;
                break;
            case "DELIVER":
            case 2:
                message.type = 2;
                break;
            case "QUIT":
            case 3:
                message.type = 3;
                break;
            case "REQUEST_INFO":
            case 4:
                message.type = 4;
                break;
            }
            if (object.name != null)
                message.name = String(object.name);
            if (object.members) {
                if (!Array.isArray(object.members))
                    throw TypeError(".signalservice.GroupContext.members: array expected");
                message.members = [];
                for (let i = 0; i < object.members.length; ++i)
                    message.members[i] = String(object.members[i]);
            }
            if (object.avatar != null) {
                if (typeof object.avatar !== "object")
                    throw TypeError(".signalservice.GroupContext.avatar: object expected");
                message.avatar = $root.signalservice.AttachmentPointer.fromObject(object.avatar);
            }
            if (object.admins) {
                if (!Array.isArray(object.admins))
                    throw TypeError(".signalservice.GroupContext.admins: array expected");
                message.admins = [];
                for (let i = 0; i < object.admins.length; ++i)
                    message.admins[i] = String(object.admins[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a GroupContext message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.GroupContext
         * @static
         * @param {signalservice.GroupContext} message GroupContext
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GroupContext.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.members = [];
                object.admins = [];
            }
            if (options.defaults) {
                if (options.bytes === String)
                    object.id = "";
                else {
                    object.id = [];
                    if (options.bytes !== Array)
                        object.id = $util.newBuffer(object.id);
                }
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.name = "";
                object.avatar = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = options.bytes === String ? $util.base64.encode(message.id, 0, message.id.length) : options.bytes === Array ? Array.prototype.slice.call(message.id) : message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.GroupContext.Type[message.type] === undefined ? message.type : $root.signalservice.GroupContext.Type[message.type] : message.type;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.members && message.members.length) {
                object.members = [];
                for (let j = 0; j < message.members.length; ++j)
                    object.members[j] = message.members[j];
            }
            if (message.avatar != null && message.hasOwnProperty("avatar"))
                object.avatar = $root.signalservice.AttachmentPointer.toObject(message.avatar, options);
            if (message.admins && message.admins.length) {
                object.admins = [];
                for (let j = 0; j < message.admins.length; ++j)
                    object.admins[j] = message.admins[j];
            }
            return object;
        };

        /**
         * Converts this GroupContext to JSON.
         * @function toJSON
         * @memberof signalservice.GroupContext
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GroupContext.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GroupContext
         * @function getTypeUrl
         * @memberof signalservice.GroupContext
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GroupContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.GroupContext";
        };

        /**
         * Type enum.
         * @name signalservice.GroupContext.Type
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} UPDATE=1 UPDATE value
         * @property {number} DELIVER=2 DELIVER value
         * @property {number} QUIT=3 QUIT value
         * @property {number} REQUEST_INFO=4 REQUEST_INFO value
         */
        GroupContext.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "UPDATE"] = 1;
            values[valuesById[2] = "DELIVER"] = 2;
            values[valuesById[3] = "QUIT"] = 3;
            values[valuesById[4] = "REQUEST_INFO"] = 4;
            return values;
        })();

        return GroupContext;
    })();

    signalservice.WebSocketRequestMessage = (function() {

        /**
         * Properties of a WebSocketRequestMessage.
         * @memberof signalservice
         * @interface IWebSocketRequestMessage
         * @property {string|null} [verb] WebSocketRequestMessage verb
         * @property {string|null} [path] WebSocketRequestMessage path
         * @property {Uint8Array|null} [body] WebSocketRequestMessage body
         * @property {Array.<string>|null} [headers] WebSocketRequestMessage headers
         * @property {number|Long|null} [id] WebSocketRequestMessage id
         */

        /**
         * Constructs a new WebSocketRequestMessage.
         * @memberof signalservice
         * @classdesc Represents a WebSocketRequestMessage.
         * @implements IWebSocketRequestMessage
         * @constructor
         * @param {signalservice.IWebSocketRequestMessage=} [properties] Properties to set
         */
        function WebSocketRequestMessage(properties) {
            this.headers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebSocketRequestMessage verb.
         * @member {string} verb
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         */
        WebSocketRequestMessage.prototype.verb = "";

        /**
         * WebSocketRequestMessage path.
         * @member {string} path
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         */
        WebSocketRequestMessage.prototype.path = "";

        /**
         * WebSocketRequestMessage body.
         * @member {Uint8Array} body
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         */
        WebSocketRequestMessage.prototype.body = $util.newBuffer([]);

        /**
         * WebSocketRequestMessage headers.
         * @member {Array.<string>} headers
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         */
        WebSocketRequestMessage.prototype.headers = $util.emptyArray;

        /**
         * WebSocketRequestMessage id.
         * @member {number|Long} id
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         */
        WebSocketRequestMessage.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new WebSocketRequestMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {signalservice.IWebSocketRequestMessage=} [properties] Properties to set
         * @returns {signalservice.WebSocketRequestMessage} WebSocketRequestMessage instance
         */
        WebSocketRequestMessage.create = function create(properties) {
            return new WebSocketRequestMessage(properties);
        };

        /**
         * Encodes the specified WebSocketRequestMessage message. Does not implicitly {@link signalservice.WebSocketRequestMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {signalservice.IWebSocketRequestMessage} message WebSocketRequestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketRequestMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.verb != null && Object.hasOwnProperty.call(message, "verb"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.verb);
            if (message.path != null && Object.hasOwnProperty.call(message, "path"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.path);
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.body);
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.id);
            if (message.headers != null && message.headers.length)
                for (let i = 0; i < message.headers.length; ++i)
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.headers[i]);
            return writer;
        };

        /**
         * Encodes the specified WebSocketRequestMessage message, length delimited. Does not implicitly {@link signalservice.WebSocketRequestMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {signalservice.IWebSocketRequestMessage} message WebSocketRequestMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketRequestMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WebSocketRequestMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.WebSocketRequestMessage} WebSocketRequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketRequestMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.WebSocketRequestMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.verb = reader.string();
                        break;
                    }
                case 2: {
                        message.path = reader.string();
                        break;
                    }
                case 3: {
                        message.body = reader.bytes();
                        break;
                    }
                case 5: {
                        if (!(message.headers && message.headers.length))
                            message.headers = [];
                        message.headers.push(reader.string());
                        break;
                    }
                case 4: {
                        message.id = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a WebSocketRequestMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.WebSocketRequestMessage} WebSocketRequestMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketRequestMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WebSocketRequestMessage message.
         * @function verify
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WebSocketRequestMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.verb != null && message.hasOwnProperty("verb"))
                if (!$util.isString(message.verb))
                    return "verb: string expected";
            if (message.path != null && message.hasOwnProperty("path"))
                if (!$util.isString(message.path))
                    return "path: string expected";
            if (message.body != null && message.hasOwnProperty("body"))
                if (!(message.body && typeof message.body.length === "number" || $util.isString(message.body)))
                    return "body: buffer expected";
            if (message.headers != null && message.hasOwnProperty("headers")) {
                if (!Array.isArray(message.headers))
                    return "headers: array expected";
                for (let i = 0; i < message.headers.length; ++i)
                    if (!$util.isString(message.headers[i]))
                        return "headers: string[] expected";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            return null;
        };

        /**
         * Creates a WebSocketRequestMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.WebSocketRequestMessage} WebSocketRequestMessage
         */
        WebSocketRequestMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.WebSocketRequestMessage)
                return object;
            let message = new $root.signalservice.WebSocketRequestMessage();
            if (object.verb != null)
                message.verb = String(object.verb);
            if (object.path != null)
                message.path = String(object.path);
            if (object.body != null)
                if (typeof object.body === "string")
                    $util.base64.decode(object.body, message.body = $util.newBuffer($util.base64.length(object.body)), 0);
                else if (object.body.length >= 0)
                    message.body = object.body;
            if (object.headers) {
                if (!Array.isArray(object.headers))
                    throw TypeError(".signalservice.WebSocketRequestMessage.headers: array expected");
                message.headers = [];
                for (let i = 0; i < object.headers.length; ++i)
                    message.headers[i] = String(object.headers[i]);
            }
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = true;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a WebSocketRequestMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {signalservice.WebSocketRequestMessage} message WebSocketRequestMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WebSocketRequestMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.headers = [];
            if (options.defaults) {
                object.verb = "";
                object.path = "";
                if (options.bytes === String)
                    object.body = "";
                else {
                    object.body = [];
                    if (options.bytes !== Array)
                        object.body = $util.newBuffer(object.body);
                }
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
            }
            if (message.verb != null && message.hasOwnProperty("verb"))
                object.verb = message.verb;
            if (message.path != null && message.hasOwnProperty("path"))
                object.path = message.path;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = options.bytes === String ? $util.base64.encode(message.body, 0, message.body.length) : options.bytes === Array ? Array.prototype.slice.call(message.body) : message.body;
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.headers && message.headers.length) {
                object.headers = [];
                for (let j = 0; j < message.headers.length; ++j)
                    object.headers[j] = message.headers[j];
            }
            return object;
        };

        /**
         * Converts this WebSocketRequestMessage to JSON.
         * @function toJSON
         * @memberof signalservice.WebSocketRequestMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WebSocketRequestMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WebSocketRequestMessage
         * @function getTypeUrl
         * @memberof signalservice.WebSocketRequestMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WebSocketRequestMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.WebSocketRequestMessage";
        };

        return WebSocketRequestMessage;
    })();

    signalservice.WebSocketMessage = (function() {

        /**
         * Properties of a WebSocketMessage.
         * @memberof signalservice
         * @interface IWebSocketMessage
         * @property {signalservice.WebSocketMessage.Type|null} [type] WebSocketMessage type
         * @property {signalservice.IWebSocketRequestMessage|null} [request] WebSocketMessage request
         */

        /**
         * Constructs a new WebSocketMessage.
         * @memberof signalservice
         * @classdesc Represents a WebSocketMessage.
         * @implements IWebSocketMessage
         * @constructor
         * @param {signalservice.IWebSocketMessage=} [properties] Properties to set
         */
        function WebSocketMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * WebSocketMessage type.
         * @member {signalservice.WebSocketMessage.Type} type
         * @memberof signalservice.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.type = 0;

        /**
         * WebSocketMessage request.
         * @member {signalservice.IWebSocketRequestMessage|null|undefined} request
         * @memberof signalservice.WebSocketMessage
         * @instance
         */
        WebSocketMessage.prototype.request = null;

        /**
         * Creates a new WebSocketMessage instance using the specified properties.
         * @function create
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {signalservice.IWebSocketMessage=} [properties] Properties to set
         * @returns {signalservice.WebSocketMessage} WebSocketMessage instance
         */
        WebSocketMessage.create = function create(properties) {
            return new WebSocketMessage(properties);
        };

        /**
         * Encodes the specified WebSocketMessage message. Does not implicitly {@link signalservice.WebSocketMessage.verify|verify} messages.
         * @function encode
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {signalservice.IWebSocketMessage} message WebSocketMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.request != null && Object.hasOwnProperty.call(message, "request"))
                $root.signalservice.WebSocketRequestMessage.encode(message.request, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified WebSocketMessage message, length delimited. Does not implicitly {@link signalservice.WebSocketMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {signalservice.IWebSocketMessage} message WebSocketMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        WebSocketMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer.
         * @function decode
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {signalservice.WebSocketMessage} WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.signalservice.WebSocketMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.int32();
                        break;
                    }
                case 2: {
                        message.request = $root.signalservice.WebSocketRequestMessage.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a WebSocketMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {signalservice.WebSocketMessage} WebSocketMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        WebSocketMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a WebSocketMessage message.
         * @function verify
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        WebSocketMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.request != null && message.hasOwnProperty("request")) {
                let error = $root.signalservice.WebSocketRequestMessage.verify(message.request);
                if (error)
                    return "request." + error;
            }
            return null;
        };

        /**
         * Creates a WebSocketMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {signalservice.WebSocketMessage} WebSocketMessage
         */
        WebSocketMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.signalservice.WebSocketMessage)
                return object;
            let message = new $root.signalservice.WebSocketMessage();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "UNKNOWN":
            case 0:
                message.type = 0;
                break;
            case "REQUEST":
            case 1:
                message.type = 1;
                break;
            case "RESPONSE":
            case 2:
                message.type = 2;
                break;
            }
            if (object.request != null) {
                if (typeof object.request !== "object")
                    throw TypeError(".signalservice.WebSocketMessage.request: object expected");
                message.request = $root.signalservice.WebSocketRequestMessage.fromObject(object.request);
            }
            return message;
        };

        /**
         * Creates a plain object from a WebSocketMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {signalservice.WebSocketMessage} message WebSocketMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        WebSocketMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "UNKNOWN" : 0;
                object.request = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.signalservice.WebSocketMessage.Type[message.type] === undefined ? message.type : $root.signalservice.WebSocketMessage.Type[message.type] : message.type;
            if (message.request != null && message.hasOwnProperty("request"))
                object.request = $root.signalservice.WebSocketRequestMessage.toObject(message.request, options);
            return object;
        };

        /**
         * Converts this WebSocketMessage to JSON.
         * @function toJSON
         * @memberof signalservice.WebSocketMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        WebSocketMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for WebSocketMessage
         * @function getTypeUrl
         * @memberof signalservice.WebSocketMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        WebSocketMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/signalservice.WebSocketMessage";
        };

        /**
         * Type enum.
         * @name signalservice.WebSocketMessage.Type
         * @enum {number}
         * @property {number} UNKNOWN=0 UNKNOWN value
         * @property {number} REQUEST=1 REQUEST value
         * @property {number} RESPONSE=2 RESPONSE value
         */
        WebSocketMessage.Type = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UNKNOWN"] = 0;
            values[valuesById[1] = "REQUEST"] = 1;
            values[valuesById[2] = "RESPONSE"] = 2;
            return values;
        })();

        return WebSocketMessage;
    })();

    return signalservice;
})();

export { $root as default };
