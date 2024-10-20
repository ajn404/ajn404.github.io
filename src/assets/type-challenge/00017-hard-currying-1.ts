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
  ? //检查 T 是否是一个至少有一个元素的元组。如果是，R 将是剩余的元素。
    T extends [...infer F, ...R]
    ? //进一步检查 T 是否可以被分解为一个以 F 开头的元组，F 将是第一个元素。
      F
    : never
  : never;
//如果以上条件都满足，返回 F，否则返回 never。
/**
 * 这个类型用于将一个多参数函数转换为一个柯里化（currying）函数。
 * */
type Curried<F> = F extends (...args: infer Args) => infer Return
  ? //检查 F 是否是一个函数类型，并提取其参数 Args 和返回值 Return。
    Args["length"] extends 0 | 1
    ? //如果参数的长度为 0 或 1，直接返回 F，因为不需要柯里化。
      F
    : Args extends [any, ...infer Rest]
      ? //如果 Args 至少有一个参数，提取第一个参数并将剩余参数存储在 Rest 中。
        (...args: FirstAsTuple<Args>) => Curried<(...rest: Rest) => Return>
      : //返回一个新的函数类型，该函数接受第一个参数（通过 FirstAsTuple 提取），并返回一个柯里化的函数，接受剩余的参数。
        never
  : never;

//声明一个名为 Currying 的函数，它接受一个函数 fn，并返回一个柯里化后的函数类型。
declare function Currying<T extends Function>(fn: T): Curried<T>;
