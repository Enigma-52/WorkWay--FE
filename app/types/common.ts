import type { BOOLEAN_INT, METHOD } from "~/lib/constants";

type Arrayable<T> = T | T[];
export type CustomObject = {
  [key: string | number]: Arrayable<CustomObject | string | number | boolean> | null | undefined;
};

export type ValueOf<
  ObjectType,
  ValueType extends keyof ObjectType = keyof ObjectType,
> = ObjectType[ValueType]; // https://github.com/sindresorhus/type-fest/blob/main/source/value-of.d.ts


export type EMethod = ValueOf<typeof METHOD>;

export type EBooleanInt = ValueOf<typeof BOOLEAN_INT>;

export type JSONString = string;
export type DateString = string;

export type WithPrefix<T, Px extends string> = {
  [key in keyof T as key extends string ? `${Px}${key}` : never]: T[key];
};