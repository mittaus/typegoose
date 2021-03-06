---
id: change-id-type
title: 'Change _id Type'
---

You can easily change the type of the `_id` field:

```ts
class SomeChangedID {
  @prop()
  public _id: string; // change the type of _id to string
}
```

Note: when the type is not `ObjectID`, you need to explicitly set the `_id` before saving.

To disable the `_id` field altogether (useful in arrays of subdocuments), add [`@prop({ _id: false })`](api/decorators/prop.md#_id) or [`@modelOptions({ schemaOptions: { _id: false } })`](https://mongoosejs.com/docs/guide.html#_id).

```ts
class WithNoId {
  @prop()
  public someValue: string;
}

class SomeChangedID {
  @prop({ type: WithNoId, _id: false })
  public someField: WithNoId[];
}
```

## With the Base Class

With the `Base` class's special `_id` treatment (types), it can be used as follows:

```ts
class SomeChangedIDBase extends Base<string> {
  @prop()
  public _id: string;
}
```

**Notes**:
- it needs to be duplicated, because the `Base` class only provides _types_ and doesn't actually change anything at runtime.
- to have `_id` not be `any`, the project needs to have either `noImplicitAny` or `strict` active in the `tsconfig`.

Restriction: this method (extending Base) can only be used with types that are in `RefType` (all of `mongoose.Schema.Types` should work except `Array`, `Mixed`, `Boolean`).
