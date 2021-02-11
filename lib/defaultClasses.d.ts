import type { Types } from 'mongoose';
import type { AnyParamConstructor, DocumentType, RefType } from './types';
export declare abstract class TimeStamps {
  public createdAt?: Date;
  public updatedAt?: Date;
}
/**
 * This class provied the basic mongoose document properties
 */
export declare abstract class Base<T_ID extends RefType = Types.ObjectId> {
  public _id: T_ID;
  public __v?: number;
  public __t?: string | number;
}
export interface FindOrCreateResult<T> {
  created: boolean;
  doc: DocumentType<T>;
}
/**
 * This class contains all types for the module "mongoose-findorcreate"
 */
export declare abstract class FindOrCreate {
  public static findOrCreate: <T extends FindOrCreate>(this: AnyParamConstructor<T>, condition: any) => Promise<FindOrCreateResult<T>>;
}
