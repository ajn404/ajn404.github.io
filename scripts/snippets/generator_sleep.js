// sleep 函数返回 Promise（与 Promise 实现相同）
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 生成器函数示例
function* task() {
  console.log("Start");
  yield sleep(1000); // 在生成器中 yield sleep 的 Promise
  console.log("After 1 second");
}

// 执行器（运行生成器并处理异步）
function run(generator) {
  const g = generator();
  function next(err, result) {
    const { value, done } = g.next(result);
    if (done) return;
    value.then(next); // 等待 Promise 完成后再继续
  }
  next();
}

run(task);