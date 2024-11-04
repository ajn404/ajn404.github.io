// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<GetRequired<{ foo: number; bar?: string }>, { foo: number }>>,
    Expect<Equal<GetRequired<{ foo: undefined; bar?: undefined }>, { foo: undefined }>>,
]


// ============= Your Code Here =============
type GetRequired<T> = {
    [k in keyof T  as T[k] extends Required<T>[k] ? k : never]: T[k]
}
