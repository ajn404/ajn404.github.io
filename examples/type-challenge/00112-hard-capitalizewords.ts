// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
    Expect<Equal<CapitalizeWords<'foobar'>, 'Foobar'>>,
    Expect<Equal<CapitalizeWords<'FOOBAR'>, 'FOOBAR'>>,
    Expect<Equal<CapitalizeWords<'foo bar'>, 'Foo Bar'>>,
    Expect<Equal<CapitalizeWords<'foo bar hello world'>, 'Foo Bar Hello World'>>,
    Expect<Equal<CapitalizeWords<'foo bar.hello,world'>, 'Foo Bar.Hello,World'>>,
    Expect<Equal<CapitalizeWords<'aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq'>, 'Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq'>>,
    Expect<Equal<CapitalizeWords<''>, ''>>,
]


// ============= Your Code Here =============



type CapitalizeWords<
    S extends string,
    W extends string = ''
// 用于累积已经处理的单词，默认为空字符串。
> = S extends `${infer A}${infer B}`
    //将字符串 S 分解为两个部分 A 和 B，其中 A 是当前处理的字符，B 是剩余的字符串。
    ? Uppercase<A> extends Lowercase<A>
    //检查 A 是否是一个字母（即是否是大写字母）。如果是大写字母，则表示它不是单词的一部分。
    ? `${Capitalize<`${W}${A}`>}${CapitalizeWords<B>}`
    //如果 A 是一个单词的一部分，则将其与累积的单词 W 连接并首字母大写。
    : CapitalizeWords<B, `${W}${A}`>
    //递归处理剩余的字符串 B，并将当前字符 A 添加到累积的单词 W 中
    : Capitalize<W>
//当字符串 S 被完全处理后，返回 Capitalize<W>，将最终的累积单词首字母大写。
