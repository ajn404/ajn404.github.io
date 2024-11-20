// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<Trim<'str'>, 'str'>>,
    Expect<Equal<Trim<' str'>, 'str'>>,
    Expect<Equal<Trim<'     str'>, 'str'>>,
    Expect<Equal<Trim<'str   '>, 'str'>>,
    Expect<Equal<Trim<'     str     '>, 'str'>>,
    Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
    Expect<Equal<Trim<''>, ''>>,
    Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============

type Space = ` ` | `\t` | '\n';
type Trim<S extends string> =
    S extends `${Space}${infer R}` | `${infer R}${Space}`
    ? Trim<R>
    : S;


