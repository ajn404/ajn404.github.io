package main

import (
	"fmt"
	"runtime"
	"time"
)
func main() {
	runtime.GOMAXPROCS(4)//这行代码将 Go 程序限制为只使用一个处理器核心。 这意味着 goroutine 会串行执行，而不是并行执行。 这会影响输出顺序，但不会改变最终输出的结果。
	go func() {
		time.Sleep(1)
	}()
	for i := 0; i < 3; i++ {
		j := i // 创建一个新的变量 j，并将 i 的值复制给它
		go func(j int) {
			fmt.Println(j)
		}(j); // 将 j 传递给匿名函数
	}
	fmt.Println("Hello, world!")
	time.Sleep(5)
}