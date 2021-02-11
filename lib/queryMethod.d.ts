import type { Document } from 'mongoose';
import type { AnyParamConstructor, ReturnModelType } from './types';
/**
 * Adds a query method to schema.
 *
 * @param func Query function
 * @example
 * ```ts
 * interface FindHelpers {
 *   findByTitle: QueryMethod<typeof findByTitle>;
 * }
 *
 * function findByTitle(this: ReturnModelType<typeof Event, FindHelpers>, title: string) {
 *  return this.find({ title });
 * }
 *
 * @queryMethod(findByTitle)
 * class Event {
 *  @prop()
 *  public title: string;
 * }
 *
 * const EventModel = getModelForClass<typeof Event, FindHelpers>(Event);
 * ```
 */
export declare function queryMethod<QueryHelpers, U extends AnyParamConstructor<any>>(
  func: (this: ReturnModelType<U, QueryHelpers>, ...params: any[]) => Document<any>
): ClassDecorator;
export { queryMethod as QueryMethod };