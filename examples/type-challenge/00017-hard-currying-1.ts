// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const curried1 = Currying((a: string, b: number, c: boolean) => true);
const curried2 = Currying(
  (
    a: string,
    b: number,
    c: boolean,
    d: boolean,
    e: boolean,
    f: string,
    g: boolean
  ) => true
);
const curried3 = Currying(() => true);

type cases = [
  Expect<
    Equal<typeof curried1, (a: string) => (b: number) => (c: boolean) => true>
  >,
  Expect<
    Equal<
      typeof curried2,
      (
        a: string
      ) => (
        b: number
      ) => (
        c: boolean
      ) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
    >
  >,
  Expect<Equal<typeof curried3, () => true>>,
];

// ============= Your Code Here =============

//这个类型用于提取一个元组的第一个元素，并将其作为元组返回。
type FirstAsTuple<T extends any[]> = T extends [any, ...infer R]
  ? T extends [...infer F, ...R]
    ? F
    : never
  : never;
type Curried<F> = F extends (...args: infer Args) => infer Return
  ? Args["length"] extends 0 | 1
    ? F
    : Args extends [any, ...infer Rest]
      ? (...args: FirstAsTuple<Args>) => Curried<(...rest: Rest) => Return>
      : never
  : never;

declare function Currying<T extends Function>(fn: T): Curried<T>;
