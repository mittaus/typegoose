import type { Aggregate, Query } from 'mongoose';
import type { DocumentType, EmptyVoidFn } from './types';
declare type NumberOrDocumentOrDocumentArray<T> = number | DocumentType<T> | DocumentType<T>[];
declare type ReturnVoid = void | Promise<void>;
declare type HookNextErrorFn = (err?: Error) => ReturnVoid;
declare type PreFnWithAggregate<T> = (this: Aggregate<T>, next: (error?: Error) => ReturnVoid, done: EmptyVoidFn) => ReturnVoid;
declare type PreFnWithDocumentType<T> = (this: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
declare type PreFnWithQuery<T> = (this: Query<any, any>, next: (error?: Error) => ReturnVoid, done: EmptyVoidFn) => ReturnVoid;
declare type ModelPostFn<T> = (result: any, next: EmptyVoidFn) => ReturnVoid;
declare type PostNumberResponse<T> = (result: number, next: EmptyVoidFn) => ReturnVoid;
declare type PostSingleResponse<T> = (result: DocumentType<T>, next: EmptyVoidFn) => ReturnVoid;
declare type PostMultipleResponse<T> = (result: DocumentType<T>[], next: EmptyVoidFn) => ReturnVoid;
declare type PostRegExpResponse<T> = (result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
declare type PostArrayResponse<T> = (result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
declare type PostNumberWithError<T> = (error: Error, result: number, next: HookNextErrorFn) => ReturnVoid;
declare type PostSingleWithError<T> = (error: Error, result: DocumentType<T>, next: HookNextErrorFn) => ReturnVoid;
declare type PostMultipleWithError<T> = (error: Error, result: DocumentType<T>[], next: HookNextErrorFn) => ReturnVoid;
declare type PostRegExpWithError<T> = (error: Error, result: NumberOrDocumentOrDocumentArray<T>, next: HookNextErrorFn) => ReturnVoid;
declare type PostArrayWithError<T> = (error: Error, result: NumberOrDocumentOrDocumentArray<T>, next: EmptyVoidFn) => ReturnVoid;
declare type AggregateMethod = 'aggregate';
declare type DocumentMethod = 'init' | 'validate' | 'save' | 'remove';
declare type NumberMethod = 'count';
declare type SingleMethod = 'findOne' | 'findOneAndRemove' | 'findOneAndUpdate' | 'findOneAndDelete' | 'deleteOne' | DocumentMethod;
declare type MultipleMethod = 'find' | 'update' | 'deleteMany' | 'aggregate';
declare type QueryMethod =
  | 'count'
  | 'countDocuments'
  | 'estimatedDocumentCount'
  | 'find'
  | 'findOne'
  | 'findOneAndRemove'
  | 'findOneAndUpdate'
  | 'update'
  | 'updateOne'
  | 'updateMany'
  | 'findOneAndDelete'
  | 'deleteOne'
  | 'deleteMany';
declare type ModelMethod = 'insertMany';
declare type QMR = QueryMethod | ModelMethod | RegExp;
declare type QDM = QMR | DocumentMethod;
declare type DR = DocumentMethod | RegExp;
export declare const pre: {
  <T>(method: AggregateMethod, fn: PreFnWithAggregate<T>): ClassDecorator;
  <T_1>(method: DR | DR[], fn: PreFnWithDocumentType<T_1>): ClassDecorator;
  <T_2>(method: QMR | QMR[], fn: PreFnWithQuery<T_2>): ClassDecorator;
};
export declare const post: {
  <T>(method: RegExp, fn: PostRegExpResponse<T>): ClassDecorator;
  <T_1>(method: RegExp, fn: PostRegExpWithError<T_1>): ClassDecorator;
  <T_2>(method: NumberMethod, fn: PostNumberResponse<T_2>): ClassDecorator;
  <T_3>(method: NumberMethod, fn: PostNumberWithError<T_3>): ClassDecorator;
  <T_4>(method: SingleMethod, fn: PostSingleResponse<T_4>): ClassDecorator;
  <T_5>(method: SingleMethod, fn: PostSingleWithError<T_5>): ClassDecorator;
  <T_6>(method: MultipleMethod, fn: PostMultipleResponse<T_6>): ClassDecorator;
  <T_7>(method: MultipleMethod, fn: PostMultipleWithError<T_7>): ClassDecorator;
  <T_8>(method: ModelMethod, fn: ModelPostFn<T_8> | PostMultipleResponse<T_8>): ClassDecorator;
  <T_9>(method: QDM | QDM[], fn: PostArrayResponse<T_9>): ClassDecorator;
  <T_10>(method: QDM | QDM[], fn: PostArrayWithError<T_10>): ClassDecorator;
};
export declare const Pre: {
  <T>(method: AggregateMethod, fn: PreFnWithAggregate<T>): ClassDecorator;
  <T_1>(method: DR | DR[], fn: PreFnWithDocumentType<T_1>): ClassDecorator;
  <T_2>(method: QMR | QMR[], fn: PreFnWithQuery<T_2>): ClassDecorator;
};
export declare const Post: {
  <T>(method: RegExp, fn: PostRegExpResponse<T>): ClassDecorator;
  <T_1>(method: RegExp, fn: PostRegExpWithError<T_1>): ClassDecorator;
  <T_2>(method: NumberMethod, fn: PostNumberResponse<T_2>): ClassDecorator;
  <T_3>(method: NumberMethod, fn: PostNumberWithError<T_3>): ClassDecorator;
  <T_4>(method: SingleMethod, fn: PostSingleResponse<T_4>): ClassDecorator;
  <T_5>(method: SingleMethod, fn: PostSingleWithError<T_5>): ClassDecorator;
  <T_6>(method: MultipleMethod, fn: PostMultipleResponse<T_6>): ClassDecorator;
  <T_7>(method: MultipleMethod, fn: PostMultipleWithError<T_7>): ClassDecorator;
  <T_8>(method: ModelMethod, fn: ModelPostFn<T_8> | PostMultipleResponse<T_8>): ClassDecorator;
  <T_9>(method: QDM | QDM[], fn: PostArrayResponse<T_9>): ClassDecorator;
  <T_10>(method: QDM | QDM[], fn: PostArrayWithError<T_10>): ClassDecorator;
};
export {};