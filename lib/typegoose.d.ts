import * as mongoose from 'mongoose';
import 'reflect-metadata';
import { setGlobalOptions } from './globalOptions';
import type { AnyParamConstructor, DocumentType, IModelOptions, Ref, ReturnModelType } from './types';
export { mongoose, setGlobalOptions };
export { setLogLevel, LogLevels } from './logSettings';
export * from './prop';
export * from './hooks';
export * from './plugin';
export * from './index';
export * from './modelOptions';
export * from './queryMethod';
export * from './typeguards';
export * as defaultClasses from './defaultClasses';
export * as errors from './internal/errors';
export * as types from './types';
export { DocumentType, Ref, ReturnModelType };
export { getClassForDocument, getClass, getName } from './internal/utils';
export { Severity } from './internal/constants';
/**
 * Get a Model for a Class
 * Executes .setModelForClass if it can't find it already
 * @param cl The uninitialized Class
 * @returns The Model
 * @public
 * @example
 * ```ts
 * class Name {}
 *
 * const NameModel = getModelForClass(Name);
 * ```
 */
export declare function getModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = {}>(
  cl: U,
  options?: IModelOptions
): ReturnModelType<U, QueryHelpers>;
/**
 * Get Model from internal cache
 * @param key ModelName key
 * @example
 * ```ts
 * class Name {}
 * getModelForClass(Name); // build the model
 * const NameModel = getModelWithString<typeof Name>("Name");
 * ```
 */
export declare function getModelWithString<U extends AnyParamConstructor<any>>(key: string): undefined | ReturnModelType<U>;
/**
 * Generates a Mongoose schema out of class props, iterating through all parents
 * @param cl The not initialized Class
 * @returns Returns the Build Schema
 * @example
 * ```ts
 * class Name {}
 * const NameSchema = buildSchema(Name);
 * const NameModel = mongoose.model("Name", NameSchema);
 * ```
 */
export declare function buildSchema<U extends AnyParamConstructor<any>>(
  cl: U,
  options?: mongoose.SchemaOptions
): mongoose.Schema<mongoose.Document>;
/**
 * This can be used to add custom Models to Typegoose, with the type information of cl
 * Note: no gurantee that the type information is fully correct
 * @param model The model to store
 * @param cl The Class to store
 * @param options? Optional param for existingMongoose or existingConnection
 * @example
 * ```ts
 * class Name {}
 *
 * const schema = buildSchema(Name);
 * // modifications to the schame can be done
 * const model = addModelToTypegoose(mongoose.model("Name", schema), Name);
 * ```
 */
export declare function addModelToTypegoose<U extends AnyParamConstructor<any>, QueryHelpers = {}>(
  model: mongoose.Model<any>,
  cl: U,
  options?: {
    existingMongoose?: mongoose.Mongoose;
    existingConnection?: any;
  }
): ReturnModelType<U, QueryHelpers>;
/**
 * Deletes an existing model so that it can be overwritten
 * with another model
 * (deletes from mongoose.connection & typegoose models cache & typegoose constructors cache)
 * @param key
 * @example
 * ```ts
 * class Name {}
 * const NameModel = getModelForClass(Name);
 * deleteModel("Name");
 * ```
 */
export declare function deleteModel(name: string): void;
/**
 * Delete a model, with the given class
 * Same as "deleteModel", only that it can be done with the class instead of the name
 * @param cl The Class
 * @example
 * ```ts
 * class Name {}
 * const NameModel = getModelForClass(Name);
 * deleteModelWithClass(Name);
 * ```
 */
export declare function deleteModelWithClass<U extends AnyParamConstructor<any>>(cl: U): void;
/**
 * Build a Model from a given class and return the model
 * @param from The Model to build From
 * @param cl The Class to make a model out
 * @param value The Identifier to use to differentiate documents (default: cl.name)
 * @example
 * ```ts
 * class C1 {}
 * class C2 extends C1 {}
 *
 * const C1Model = getModelForClass(C1);
 * const C2Model = getDiscriminatorModelForClass(C1Model, C1);
 * ```
 */
export declare function getDiscriminatorModelForClass<U extends AnyParamConstructor<any>, QueryHelpers = {}>(
  from: mongoose.Model<any>,
  cl: U,
  value?: string
): ReturnModelType<U, QueryHelpers>;