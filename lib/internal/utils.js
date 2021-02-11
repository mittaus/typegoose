"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnNotCorrectTypeOptions = exports.deprecate = exports.isConstructor = exports.getType = exports.assertionIsClass = exports.assertion = exports.createArrayFromDimensions = exports.assignGlobalModelOptions = exports.isNullOrUndefined = exports.warnMixed = exports.mapOptions = exports.mapArrayOptions = exports.isNotDefined = exports.getName = exports.getRightTarget = exports.mergeSchemaOptions = exports.mergeMetadata = exports.assignMetadata = exports.includesAllVirtualPOP = exports.allVirtualoptions = exports.isWithVirtualPOP = exports.isWithEnumValidate = exports.isWithNumberValidate = exports.isWithStringTransform = exports.isWithStringValidate = exports.getClass = exports.getClassForDocument = exports.initProperty = exports.isString = exports.isNumber = exports.isObject = exports.isAnRefType = exports.isPrimitive = void 0;
const lodash_1 = require("lodash");
const mongoose = require("mongoose");
const logSettings_1 = require("../logSettings");
const constants_1 = require("./constants");
const data_1 = require("./data");
const errors_1 = require("./errors");
/**
 * Returns true, if the type is included in mongoose.Schema.Types
 * @param Type The Type
 * @returns true, if it includes it
 */
function isPrimitive(Type) {
    if (typeof (Type === null || Type === void 0 ? void 0 : Type.name) === 'string') {
        // try to match "Type.name" with all the Property Names of "mongoose.Schema.Types"
        // (like "String" with "mongoose.Schema.Types.String")
        return (Object.getOwnPropertyNames(mongoose.Schema.Types).includes(Type.name) ||
            // try to match "Type.name" with all "mongoose.Schema.Types.*.name"
            // (like "SchemaString" with "mongoose.Schema.Types.String.name")
            Object.values(mongoose.Schema.Types).findIndex((v) => v.name === Type.name) >= 0);
    }
    return false;
}
exports.isPrimitive = isPrimitive;
/**
 * Returns true, if the type is included in mongoose.Schema.Types except the aliases
 * @param Type The Type
 * @returns true, if it includes it
 */
function isAnRefType(Type) {
    if (typeof (Type === null || Type === void 0 ? void 0 : Type.name) === 'string') {
        // Note: this is not done "once" because types can be added as custom types
        const tmp = Object.getOwnPropertyNames(mongoose.Schema.Types).filter((x) => {
            switch (x) {
                case 'Oid':
                case 'Bool':
                case 'Object':
                case 'Boolean':
                    return false;
                default:
                    return true;
            }
        });
        // try to match "Type.name" with all the Property Names of "mongoose.Schema.Types" except the ones with aliases
        // (like "String" with "mongoose.Schema.Types.String")
        return (tmp.includes(Type.name) ||
            // try to match "Type.name" with all "mongoose.Schema.Types.*.name"
            // (like "SchemaString" with "mongoose.Schema.Types.String.name")
            Object.values(mongoose.Schema.Types).findIndex((v) => v.name === Type.name) >= 0);
    }
    return false;
}
exports.isAnRefType = isAnRefType;
/**
 * Returns true, if it is an Object
 * @param Type The Type
 * @param once Just run it once?
 * @returns true, if it is an Object
 */
function isObject(Type, once = false) {
    if (typeof (Type === null || Type === void 0 ? void 0 : Type.name) === 'string') {
        let prototype = Type.prototype;
        let name = Type.name;
        while (name) {
            if (name === 'Object' || name === 'Mixed') {
                return true;
            }
            if (once) {
                break;
            }
            prototype = Object.getPrototypeOf(prototype);
            name = prototype === null || prototype === void 0 ? void 0 : prototype.constructor.name;
        }
    }
    return false;
}
exports.isObject = isObject;
/**
 * Returns true, if it is an Number
 * @param Type The Type
 * @returns true, if it is an Number
 */
function isNumber(Type) {
    var _a;
    const name = (_a = Type === null || Type === void 0 ? void 0 : Type.name) !== null && _a !== void 0 ? _a : '';
    return name === 'Number' || name === mongoose.Schema.Types.Number.name;
}
exports.isNumber = isNumber;
/**
 * Returns true, if it is an String
 * @param Type The Type
 * @returns true, if it is an String
 */
function isString(Type) {
    var _a;
    const name = (_a = Type === null || Type === void 0 ? void 0 : Type.name) !== null && _a !== void 0 ? _a : '';
    return name === 'String' || name === mongoose.Schema.Types.String.name;
}
exports.isString = isString;
/**
 * Initialize the property in the schemas Map
 * @param name Name of the current Model/Class
 * @param key Key of the property
 * @param whatis What should it be for a type?
 */
function initProperty(name, key, whatis) {
    const schemaProp = !data_1.schemas.has(name) ? data_1.schemas.set(name, {}).get(name) : data_1.schemas.get(name);
    switch (whatis) {
        case constants_1.WhatIsIt.ARRAY:
            schemaProp[key] = [{}];
            break;
        case constants_1.WhatIsIt.MAP:
        case constants_1.WhatIsIt.NONE:
            schemaProp[key] = {};
            break;
        default:
            /* istanbul ignore next */ // ignore because this case should really never happen (typescript prevents this)
            throw new TypeError(`"${whatis}"(whatis(subSchema)) is invalid for "${name}.${key}" [E013]`);
    }
    return schemaProp;
}
exports.initProperty = initProperty;
/**
 * Get the Class for a given Document
 * @param document The Document
 */
function getClassForDocument(document) {
    const modelName = document.constructor.modelName;
    return data_1.constructors.get(modelName);
}
exports.getClassForDocument = getClassForDocument;
/**
 * Get the Class for a given Schema
 * @param input
 */
function getClass(input) {
    if (typeof input === 'string') {
        return data_1.constructors.get(input);
    }
    if (typeof (input === null || input === void 0 ? void 0 : input.typegooseName) === 'string') {
        return data_1.constructors.get(input.typegooseName);
    }
    if (typeof (input === null || input === void 0 ? void 0 : input.typegooseName) === 'function') {
        return data_1.constructors.get(input.typegooseName());
    }
    throw new ReferenceError('Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string [E014]');
}
exports.getClass = getClass;
/**
 * Return an array of options that are included
 * @param options The raw Options
 */
function isWithStringValidate(options) {
    return lodash_1.intersection(Object.keys(options), ['match', 'minlength', 'maxlength']);
}
exports.isWithStringValidate = isWithStringValidate;
/**
 * Return an array of options that are included
 * @param options The raw Options
 */
function isWithStringTransform(options) {
    return lodash_1.intersection(Object.keys(options), ['lowercase', 'uppercase', 'trim']);
}
exports.isWithStringTransform = isWithStringTransform;
/**
 * Return an array of options that are included
 * @param options The raw Options
 */
function isWithNumberValidate(options) {
    return lodash_1.intersection(Object.keys(options), ['min', 'max']);
}
exports.isWithNumberValidate = isWithNumberValidate;
/**
 * Return an array of options that are included
 * @param options The raw Options
 */
function isWithEnumValidate(options) {
    return lodash_1.intersection(Object.keys(options), ['enum']);
}
exports.isWithEnumValidate = isWithEnumValidate;
const virtualOptions = ['localField', 'foreignField'];
/**
 * Check if Options include Virtual Populate Options
 * @param options RawOptions of the Prop
 */
function isWithVirtualPOP(options) {
    return Object.keys(options).some((v) => virtualOptions.includes(v));
}
exports.isWithVirtualPOP = isWithVirtualPOP;
exports.allVirtualoptions = virtualOptions.slice(0); // copy "virtualOptions" array
exports.allVirtualoptions.push('ref');
/**
 * Check if All the required Options are present
 * @param options RawOptions of the Prop
 */
function includesAllVirtualPOP(options) {
    return exports.allVirtualoptions.every((v) => Object.keys(options).includes(v));
}
exports.includesAllVirtualPOP = includesAllVirtualPOP;
/**
 * Merge value & existing Metadata & Save it to the class
 * Difference with "mergeMetadata" is that this one DOES save it to the class
 * @param key Metadata key
 * @param value Raw value
 * @param cl The constructor
 * @internal
 */
function assignMetadata(key, value, cl) {
    if (isNullOrUndefined(value)) {
        return value;
    }
    const newValue = mergeMetadata(key, value, cl);
    Reflect.defineMetadata(key, newValue, cl);
    return newValue;
}
exports.assignMetadata = assignMetadata;
/**
 * Merge value & existing Metadata
 * Difference with "assignMetadata" is that this one DOES NOT save it to the class
 * @param key Metadata key
 * @param value Raw value
 * @param cl The constructor
 * @internal
 */
function mergeMetadata(key, value, cl) {
    assertion(typeof key === 'string', new TypeError(`"${key}"(key) is not a string! (mergeMetadata)`));
    assertionIsClass(cl);
    // Please don't remove the other values from the function, even when unused - it is made to be clear what is what
    return lodash_1.mergeWith({}, Reflect.getMetadata(key, cl), value, (_objValue, srcValue, ckey, _object, _source, _stack) => customMerger(ckey, srcValue));
}
exports.mergeMetadata = mergeMetadata;
/**
 * Used for lodash customizer's (cloneWith, cloneDeepWith, mergeWith)
 * @param key the key of the current object
 * @param val the value of the object that should get returned for "existingMongoose" & "existingConnection"
 */
function customMerger(key, val) {
    if (typeof key !== 'string') {
        return undefined;
    }
    if (/^(existingMongoose|existingConnection)$/.test(key)) {
        return val;
    }
    return undefined;
}
/**
 * Merge only schemaOptions from ModelOptions of the class
 * @param value The value to use
 * @param cl The Class to get the values from
 */
function mergeSchemaOptions(value, cl) {
    return mergeMetadata(constants_1.DecoratorKeys.ModelOptions, { schemaOptions: value }, cl).schemaOptions;
}
exports.mergeSchemaOptions = mergeSchemaOptions;
/**
 * Tries to return the right target
 * if target.constructor.name is "Function", return target, otherwise target.constructor
 * @param target The target to determine
 */
function getRightTarget(target) {
    var _a;
    return ((_a = target.constructor) === null || _a === void 0 ? void 0 : _a.name) === 'Function' ? target : target.constructor;
}
exports.getRightTarget = getRightTarget;
/**
 * Get the correct name of the class's model
 * (with suffix)
 * @param cl The Class
 */
function getName(cl) {
    var _a, _b, _c, _d;
    const ctor = getRightTarget(cl);
    const options = (_a = Reflect.getMetadata(constants_1.DecoratorKeys.ModelOptions, ctor)) !== null && _a !== void 0 ? _a : {};
    const baseName = ctor.name;
    const customName = (_b = options.options) === null || _b === void 0 ? void 0 : _b.customName;
    if (typeof customName === 'function') {
        const name = customName(options);
        assertion(typeof name === 'string' && name.length > 0, new TypeError(`The return type of the function assigned to "customName" must be a string and must not be empty! ("${baseName}") [E022]`));
        return name;
    }
    if ((_c = options.options) === null || _c === void 0 ? void 0 : _c.automaticName) {
        const suffix = customName !== null && customName !== void 0 ? customName : (_d = options.schemaOptions) === null || _d === void 0 ? void 0 : _d.collection;
        return !isNullOrUndefined(suffix) ? `${baseName}_${suffix}` : baseName;
    }
    if (typeof customName === 'string') {
        if (customName.length <= 0) {
            throw new TypeError(`"customName" must be a string AND at least one character ("${baseName}") [E015]`);
        }
    }
    if (isNullOrUndefined(customName)) {
        return baseName;
    }
    return customName;
}
exports.getName = getName;
/**
 * Returns if it is not defined in "schemas"
 * @param cl The Type
 */
function isNotDefined(cl) {
    return (typeof cl === 'function'
        && !isPrimitive(cl)
        && cl !== Object
        && !data_1.schemas.has(getName(cl)));
}
exports.isNotDefined = isNotDefined;
/**
 * Map Options to "inner" & "outer"
 * -> inner: means inner of "type: [{here})"
 * -> outer: means outer of "type: [{}], here"
 *
 * Specific to Arrays
 * @param rawOptions The raw options
 * @param Type The Type of the array
 * @param target The Target class
 * @param pkey Key of the Property
 * @param loggerType Type to use for logging
 */
function mapArrayOptions(rawOptions, Type, target, pkey, loggerType) {
    logSettings_1.logger.debug('mapArrayOptions called');
    loggerType = loggerType !== null && loggerType !== void 0 ? loggerType : Type;
    if (!(Type instanceof mongoose.Schema)) {
        loggerType = Type;
    }
    const dim = rawOptions.dim; // needed, otherwise it will be included (and not removed) in the returnObject
    delete rawOptions.dim;
    const mapped = mapOptions(rawOptions, Type, target, pkey, loggerType);
    /** The Object that gets returned */
    const returnObject = Object.assign(Object.assign({}, mapped.outer), { type: [
            Object.assign({ type: Type }, mapped.inner)
        ] });
    rawOptions.dim = dim; // re-add for "createArrayFromDimensions"
    returnObject.type = createArrayFromDimensions(rawOptions, returnObject.type, getName(target), pkey);
    if (loggerType) {
        logSettings_1.logger.debug('(Array) Final mapped Options for Type "%s"', getName(loggerType), returnObject);
    }
    return returnObject;
}
exports.mapArrayOptions = mapArrayOptions;
/**
 * Map Options to "inner" & "outer"
 * @param rawOptions The raw options
 * @param Type The Type of the array
 * @param target The Target class
 * @param pkey Key of the Property
 * @param loggerType Type to use for logging
 */
function mapOptions(rawOptions, Type, target, pkey, loggerType) {
    var _a;
    logSettings_1.logger.debug('mapOptions called');
    loggerType = loggerType !== null && loggerType !== void 0 ? loggerType : Type;
    /** The Object that gets returned */
    const ret = {
        inner: {},
        outer: {}
    };
    if (!(Type instanceof mongoose.Schema)) {
        loggerType = Type;
        if (getName(loggerType) in mongoose.Schema.Types) {
            logSettings_1.logger.info('Converting "%s" to mongoose Type', getName(loggerType));
            Type = mongoose.Schema.Types[getName(loggerType)];
            /* istanbul ignore next */
            if (Type === mongoose.Schema.Types.Mixed) {
                warnMixed(target, pkey);
            }
        }
    }
    if (isNullOrUndefined(loggerType)) {
        logSettings_1.logger.info('mapOptions loggerType is undefined!');
    }
    /** The OptionsConstructor to use */
    let OptionsCTOR = (_a = Type === null || Type === void 0 ? void 0 : Type.prototype) === null || _a === void 0 ? void 0 : _a.OptionsConstructor;
    // Fix because "Schema" is not a valid type and doesn't have a ".prototype.OptionsConstructor"
    if (Type instanceof mongoose.Schema) {
        // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
        OptionsCTOR = mongoose.Schema.Types.Embedded.prototype.OptionsConstructor;
    }
    assertion(!isNullOrUndefined(OptionsCTOR), new TypeError(`Type does not have an valid "OptionsConstructor"! (${getName(loggerType)} on ${getName(target)}.${pkey}) [E016]`));
    const options = Object.assign({}, rawOptions); // for sanity
    delete options.items;
    // "mongoose as any" is because the types package does not yet have an entry for "SchemaTypeOptions"
    // TODO: remove "as any" cast if "OptionsConstructor" is implemented in @types/mongoose
    if (OptionsCTOR.prototype instanceof mongoose.SchemaTypeOptions) {
        for (const [key, value] of Object.entries(options)) {
            if (Object.getOwnPropertyNames(OptionsCTOR.prototype).includes(key)) {
                ret.inner[key] = value;
            }
            else {
                ret.outer[key] = value;
            }
        }
    }
    else {
        if (loggerType) {
            logSettings_1.logger.info('The Type "%s" has a property "OptionsConstructor" but it does not extend "SchemaTypeOptions"', getName(loggerType));
        }
        ret.outer = options;
    }
    if (typeof (options === null || options === void 0 ? void 0 : options.innerOptions) === 'object') {
        delete ret.outer.innerOptions;
        for (const [key, value] of Object.entries(options.innerOptions)) {
            ret.inner[key] = value;
        }
    }
    if (typeof (options === null || options === void 0 ? void 0 : options.outerOptions) === 'object') {
        delete ret.outer.outerOptions;
        for (const [key, value] of Object.entries(options.outerOptions)) {
            ret.outer[key] = value;
        }
    }
    if (loggerType) {
        logSettings_1.logger.debug('Final mapped Options for Type "%s"', getName(loggerType), ret);
    }
    return ret;
}
exports.mapOptions = mapOptions;
/**
 * Warn, Error or Allow if an mixed type is set
 * -> this function exists for de-duplication
 * @param target Target Class
 * @param key Property key
 */
function warnMixed(target, key) {
    var _a, _b;
    const name = getName(target);
    const modelOptions = (_a = Reflect.getMetadata(constants_1.DecoratorKeys.ModelOptions, getRightTarget(target))) !== null && _a !== void 0 ? _a : {};
    switch ((_b = modelOptions.options) === null || _b === void 0 ? void 0 : _b.allowMixed) {
        default:
        case constants_1.Severity.WARN:
            logSettings_1.logger.warn('Setting "Mixed" for property "%s.%s"\nLook here for how to disable this message: https://typegoose.github.io/typegoose/docs/api/decorators/model-options/#allowmixed', name, key);
            break;
        case constants_1.Severity.ALLOW:
            break;
        case constants_1.Severity.ERROR:
            throw new TypeError(`Setting "Mixed" is not allowed! (${name}, ${key}) [E017]`);
    }
    return; // always return, if "allowMixed" is not "ERROR"
}
exports.warnMixed = warnMixed;
/**
 * Because since node 4.0.0 the internal util.is* functions got deprecated
 * @param val Any value to test if null or undefined
 */
function isNullOrUndefined(val) {
    return val === null || val === undefined;
}
exports.isNullOrUndefined = isNullOrUndefined;
/**
 * Assign Global ModelOptions if not already existing
 * @param target Target Class
 */
function assignGlobalModelOptions(target) {
    if (isNullOrUndefined(Reflect.getMetadata(constants_1.DecoratorKeys.ModelOptions, target))) {
        logSettings_1.logger.info('Assigning global Schema Options to "%s"', getName(target));
        assignMetadata(constants_1.DecoratorKeys.ModelOptions, lodash_1.omit(data_1.globalOptions, 'globalOptions'), target);
    }
}
exports.assignGlobalModelOptions = assignGlobalModelOptions;
/**
 * Loop over "dimensions" and create an array from that
 * @param rawOptions baseProp's rawOptions
 * @param extra What is actually in the deepest array
 * @param name name of the target for better error logging
 * @param key key of target-key for better error logging
 */
function createArrayFromDimensions(rawOptions, extra, name, key) {
    // dimensions start at 1 (not 0)
    const dim = typeof rawOptions.dim === 'number' ? rawOptions.dim : 1;
    if (dim < 1) {
        throw new RangeError(`"dim" needs to be higher than 0 (${name}.${key}) [E018]`);
    }
    delete rawOptions.dim; // delete this property to not actually put it as an option
    logSettings_1.logger.info('createArrayFromDimensions called with %d dimensions', dim);
    let retArray = Array.isArray(extra) ? extra : [extra];
    // index starts at 1 because "retArray" is already once wrapped in an array
    for (let index = 1; index < dim; index++) {
        retArray = [retArray];
    }
    return retArray;
}
exports.createArrayFromDimensions = createArrayFromDimensions;
/**
 * Assert an condition, if "false" throw error
 * Note: it is not named "assert" to differentiate between node and jest types
 * @param cond The Condition to throw
 * @param error An Custom Error to throw
 */
function assertion(cond, error) {
    if (!cond) {
        throw error !== null && error !== void 0 ? error : new Error('Assert failed - no custom error [E019]');
    }
}
exports.assertion = assertion;
/**
 * Assert if val is an function (constructor for classes)
 * @param val Value to test
 */
function assertionIsClass(val) {
    assertion(isConstructor(val), new errors_1.NoValidClass(val));
}
exports.assertionIsClass = assertionIsClass;
/**
 * Get Type, if input is an arrow-function, execute it and return the result
 * @param typeOrFunc Function or Type
 * @param returnLastFoundArray Return the last found array (used for something like PropOptions.discriminators)
 */
function getType(typeOrFunc, returnLastFoundArray = false) {
    const returnObject = {
        type: typeOrFunc,
        dim: 0
    };
    if (typeof returnObject.type === 'function' && !isConstructor(returnObject.type)) {
        returnObject.type = returnObject.type();
    }
    function getDepth() {
        if (returnObject.dim > 100) { // this is arbitrary, but why would anyone have more than 10 nested arrays anyway?
            throw new Error('getDepth recursed too much (dim > 100)');
        }
        if (Array.isArray(returnObject.type)) {
            returnObject.dim++;
            if (returnLastFoundArray && !Array.isArray(returnObject.type[0])) {
                return;
            }
            returnObject.type = returnObject.type[0];
            getDepth();
        }
    }
    getDepth();
    logSettings_1.logger.debug('Final getType: dim: %s, type:', returnObject.dim, returnObject.type);
    return returnObject;
}
exports.getType = getType;
/**
 * Is the provided input an class with an constructor?
 */
function isConstructor(obj) {
    var _a, _b;
    return typeof obj === 'function' && !isNullOrUndefined((_b = (_a = obj.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name);
}
exports.isConstructor = isConstructor;
// Below are function to wrap NodeJS functions for client compatability (tsline ignore is needed)
/**
 * Execute util.deprecate or when !process console log
 * (if client, it dosnt cache which codes already got logged)
 */
/* tslint:disable-next-line:ban-types */
function deprecate(fn, message, code) {
    if (!isNullOrUndefined(process)) {
        /* tslint:disable-next-line:no-require-imports */
        return require('util').deprecate(fn, message, code);
    }
    /* tslint:disable-next-line:no-console */
    console.log(`[${code}] DeprecationWarning: ${message}`);
    return fn;
}
exports.deprecate = deprecate;
/**
 * Logs an warning if "included > 0" that the options of not the current type are included
 * @param name Name of the Class
 * @param key Name of the Currently Processed key
 * @param type Name of the Expected Type
 * @param extra Extra string to be included
 * @param included Included Options to be listed
 */
function warnNotCorrectTypeOptions(name, key, type, extra, included) {
    // this "if" is in this function to de-duplicate code
    if (included.length > 0) {
        logSettings_1.logger.warn(`Type of "${name}.${key}" is not ${type}, but includes the following ${extra} options [W001]:\n`
            + `  [${included.join(', ')}]`);
    }
}
exports.warnNotCorrectTypeOptions = warnNotCorrectTypeOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJuYWwvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXVEO0FBQ3ZELHFDQUFxQztBQUVyQyxnREFBd0M7QUFjeEMsMkNBQWdFO0FBQ2hFLGlDQUE4RDtBQUM5RCxxQ0FBd0M7QUFFeEM7Ozs7R0FJRztBQUNILFNBQWdCLFdBQVcsQ0FBQyxJQUFTO0lBQ25DLElBQUksUUFBTyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxDQUFBLEtBQUssUUFBUSxFQUFFO1FBQ2xDLGtGQUFrRjtRQUNsRixzREFBc0Q7UUFDdEQsT0FBTyxDQUNMLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JFLG1FQUFtRTtZQUNuRSxpRUFBaUU7WUFDakUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNqRixDQUFDO0tBQ0g7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFiRCxrQ0FhQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixXQUFXLENBQUMsSUFBUztJQUNuQyxJQUFJLFFBQU8sSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksQ0FBQSxLQUFLLFFBQVEsRUFBRTtRQUNsQywyRUFBMkU7UUFDM0UsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekUs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