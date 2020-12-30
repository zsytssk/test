https://leetcode-cn.com/explore/featured/card/bytedance/

## 2020-12-30 10:20:48

-   @ques 如果要重构项目需要做什么
-   目标文件
-   引用文件 最顶级的依赖

    -   export 出去的
    -   export 的依赖的

-   @ques 怎么知道一个函数 方法引用其他的 代码

*   @ques 如何将语法变成简洁的格式

*   @ques local 是干嘛的
    -   是当前的 node 信息

-   @ques 所有 node type
    -   ImportSpecifier
    -   ImportDeclaration
        -   specifiers
        -   source
    -   VariableDeclaration
        -   kind
        -   declarations
    -   VariableDeclarator
        -   id init
    -   NumericLiteral
        -   extra.rawValue
    -   ObjectPattern
        -   properties
    -   ObjectProperty
        -   key

### end

-   @ques tokens 的作用

    -   是记录所有信息的地方

## 2019-12-04 20:08:36

-   @ques https://www.npmjs.com/package/recast

-   @ques 所有的递归都可以用循环代替吗

-   @ques 二叉树 有没有更好的写法...
    -   用 class 的方式...

## 2019-11-30 20:42:50

-   @ques ip 地址的规则我不知道...

    -   不能大于 255
    -   树排列
    -   如果少一位 很容易 将 1 放在任何位置...
    -   2 || 1,1
    -   3 2,1 || 1,1,1
    -   4 2,2 || 1,1,1,1
    -   排列组合的可能选项 如何用数学表示:>
    -   将一一个数分成 2 到 1 之间的数(如何处理)

-   @ques 有多种可能如何处理

-   @ques 翻转单词 而不是 char 如果是空怎么处

-   @ques multiply 如果是 c++怎么处理...

-   @ques 总共 38 题 我怎么处理...

-   @bug indexOf 有一个问题 两个相同的字符在页面的不同位置 怎么处理

    -   不行 循环就需要重新下去...

-   一旦有相同的 下面所有的字符都相同

## 2019-11-30 20:23:10

-   @ques Angular 里的\$q 跟其它 Promise 的交互

-   https://github.com/xieranmaya/blog/issues/3

-   @ques executor 是干什么的...
    -   搜索 `executor函数什么`

## 2019-11-26 15:23:08

-   编程思想 面向数据 组件化编程...

-   @ques promise 如何实现异步的流程 settimeOut 吗
    -   应该不是, 那是什么...

*   @ques resolvePromise 是什么意思
    -   目的是什么
    -   是为了处理 promise onResolved 是 promise 的情形...

-   @ques 但它需要异步且尽早的调用所有已经加入队列的函数

*   @ques promise then 的原理...

```ts
return (promise2 = new Promise(function(resolve, reject) {
    try {
        var x = onResolved(self.data);
        if (x instanceof Promise) {
            // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
            x.then(resolve, reject);
        }
        resolve(x); // 否则，以它的返回值做为promise2的结果
    } catch (e) {
        reject(e); // 如果出错，以捕获到的错误做为promise2的结果
    }
}));

promise2 = promise1.then(onResolved, onRejected);
```
