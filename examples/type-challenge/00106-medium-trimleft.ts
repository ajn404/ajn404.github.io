// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<TrimLeft<'str'>, 'str'>>,
    Expect<Equal<TrimLeft<' str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
    Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
    Expect<Equal<TrimLeft<''>, ''>>,
    Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]


// ============= Your Code Here =============

type Space = ` ` | `\t` | `\n`
type TrimLeft<S extends string> = S extends `${Space}${infer R}` ? TrimLeft<R> : S;
