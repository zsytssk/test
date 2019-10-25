- @ques rxjs 怎么像 promise.then 处理数据 再传给下一个接受的地方...
  - rxjs 的高级玩法

## 2019-10-25 16:34:27

- timer interval ?

  - concatMap
  - pipe
  - mergeMap ..
  - map

- @ques 如何获得一个 observer 的值 改变他

  - map 除了 map 之外还有吗

- rxjs performance?

  - timer interval 会不会有性能问题, 毕竟=包裹这些方法??

- promise.all == forkJoin == merge
  - 合并所有完成
- promise.then => concatMap(onebyone) => concat(...)

- @ques

  - 这 observer mergeAll 是如何实现的

- @ques

  - mergeMap 由什么实用场景？？

- @ques
  - 如何 cancel
  - 如何 retry
  - http get .. 这个外在的东西怎么可能能够 retry 呢
  - 如何合并多个 observer

## 2018-01-21 11:14:17

- scan 是什么意思

- 如何应用到 cocos 或者 laya 中

## 2018-01-24 11:08:22

- 如何简单方便的使用
- 如何清除 observer

- 有没有公共 socket 测试的地址

## 2018-01-22 10:26:36

- rxjs 的应用场景

  - socket 全部 return observer
  - connect 修改 全部 return observer

- event 全部使用 observer...

  - 甚至 我的所有 on bindOther 全部返回 observer
  - once 能用这个吗 Observer take(1) 之后应该会自己销毁
  - 这时候 observer.next("") 保存在其他地方 会不会自己销毁, 应该不会
  - 这会导致什么 bug 吗??

- 一个 observerable 每次 subscripe 都会重新创建

  - 那么初始的 observervable 我只需要创建一个
  - 需要的时候我将原来的 observer 直接 return 就可以了
  - 是这样吗

  http://www.syntaxsuccess.com/viewarticle/error-handling-in-rxjs

## 下面这段代码是什么意思

var decrease = Rx.Observable.fromEvent(decreaseButton, 'click')
// 我们还是映射到一个函数，它会减少 count
.map(() => state => Object.assign({}, state, {count: state.count - 1}));
