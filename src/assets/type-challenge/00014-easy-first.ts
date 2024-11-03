// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
];

type errors = [
  // @ts-expect-error
  First<"notArray">,
  // @ts-expect-error
  First<{ 0: "arrayLike" }>,
];

// ============= Your Code Here =============
// type First<T extends any[]> = T extends [] ? never : T[0]
//它检查类型 T 是否可以赋值给空数组类型 []。换句话说，它检查 T 是否为空数组。
//T[0]: 如果条件为假（T 不是空数组），则返回 T[0]。 T[0] 表示 T 类型的数组的第一个元素的类型。 例如，如果 T 是 string[]，那么 T[0] 就是 string。

// type First<T extends any[]> = T['length'] extends 0 ? never : T[0]

type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never;
