- @ques 如何停止一个Promise链？

- @ques resolvePromise 是什么意思
    - 目的是什么
    - 是为了处理 promise onResolved 是 promise的情形...

- @ques executor 是干什么的...

- @ques 但它需要异步且尽早的调用所有已经加入队列的函数

- @ques promise 如何实现异步的流程 settimeOut 吗
    - 应该不是, 那是什么...

- @ques promise then 的原理...

```ts
return promise2 = new Promise(function(resolve, reject) {
    try {
    var x = onResolved(self.data)
    if (x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
        x.then(resolve, reject)
    }
    resolve(x) // 否则，以它的返回值做为promise2的结果
    } catch (e) {
    reject(e) // 如果出错，以捕获到的错误做为promise2的结果
    }
})

promise2 = promise1.then(onResolved, onRejected);
```