// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<OptionalKeys<{ a: number; b?: string }>, 'b'>>,
    Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined }>, 'b'>>,
    Expect<Equal<OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }>, 'b' | 'c' | 'd'>>,
    Expect<Equal<OptionalKeys<{}>, never>>,
]


// ============= Your Code Here =============
type OptionalKeys<T> = {
    [P in keyof T]-?: {} extends Pick<T, P> ? P : never }[keyof T];

// type OptionalKeys<T> = {
//     [P in keyof T]-?: {} extends Pick<T, P> ? P : never }[keyof T]