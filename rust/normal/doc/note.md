- https://dev.to/mindflavor

- https://rust-lang.github.io/async-book/05_streams/01_chapter.html

- @learn@todo@sum stream + pin ...

- @ques stream poll_next 什么时候执行...

  - 像 future 通过 context waker 一样吗?

- @ques `Result<Async<Option<Self::Item>>, Self::Error>`
  - Async 是什么意思

### save

- @ques rust 能不能录制视频...
- @ques channel 怎么关闭(close)
  - drop(tx|rx)

## 2019-11-30 10:53:06

- understand task and stream is import than futures

  - future 常见的概念 和他们的相互关系 作用...

- ? 什么意思... synthetic + side effect

- @ques rust 异步函数 会不会阻塞 main thread

- marinara firefox

- @ques found staticlib `std` instead of rlib or dylib

- @ques JoinHandle ?

- @ques `task::spawn` 应该是启动一个独立的 thread 去做任务
- @ques `task::spawn_blocking` 到底是干什么的

  - 他是异步的吗, 会阻塞当前进程吗...

- @ques 如何使用 unstable api

- @ques await 不是一个 function, 倒像一个属性...

- @todo 学习 std 的常用功能 arc mutex channel ...

## 2019-11-29 19:54:13

- 类似 js promise 的功能
  then await Promise.all|join|race
  自己写一个 future...

- @rust

- https://www.viget.com/articles/understanding-futures-is-rust-part-2/
  - future 常见的概念 和他们的相互关系 作用...

* tryFuture 一定是 Future 吗
* Future TryFuture AndThe 的相互关系

- @ques `map(|val| Ok(val + 1))` 是什么鬼
  - 因为 4 中 Result<i32, ()> 确定 3 中的 err 类型为()

```ts
let my_future = future::ready(1) // 0
    .map(|val| val + 1) // 1
    .then(|val| future::ready(val + 1)) // 2
    .map(|val| Ok(val + 1)) // 3
    .and_then(|val| future::ready(<Result<i32, ()>>::Err(()))) // 4
    .map_err(|_: ()| 100); // 5
```

- future::ready(Ok(val + 1))

## 2019-11-25 09:39:34

task + Context + waker

- @ques 为什么要 context

## 2019-11-22 09:21:36

- @ques `.map(|val| val + 1)`

  - `let t = |x: i32| {Ok(x)};` 会报错
  - `.map(|val| val + 1)` 不会报错 为什么...

- @ques `.map_err(|_: ()| 5)` 是什么意思

  - ..

- @ques future 怎么转化为 tryFuture

  - 只要返回值是一个 result 就可以
  - result 是一个 enum 又一个 ok + error
  - 怎么就可以 and_then+ mapError

- @ques rust result

- map_err 转化错误...

## 2019-11-21 09:42:00

- @ques 每一个 trait 的相互关系...

  - ...

- @ques Sized 是干什么的
  - 在编译的时候能知道他的大小 ?

## 2019-11-20 09:33:33

- @ques `Ok::<i32, ()>` 是做什么的

- @ques 链式调用的过程是什么...

- @ques AndThen 将一个返回值为 Result 的 future 转化为一个新的 future

- @ques 为什么 用 try_poll 代替 poll

## 2019-11-19 09:37:48

- @ques andThen tryFuture 到底是干什么的
  - 看了半天都看不懂..., 为什么...

## 2019-11-18 09:39:07

- @ques TryFuture, try_poll 怎么处理错误...

- @ques Then 的三个 <Fut, F> 分别都是怎么实现的
  - future.then 返回一个 then 包含 原来的 future + 一个 FnOnce

## 2019-11-14 09:18:44

- @ques `fn poll(&mut Pin<Self>, cx: &Context)`

  - poll Pin<Self> 是干什么的
  - 或许和生命周期有关...

- @ques RefCell + thread_local

- rust

在 future 链上的 前面比 A -> B A 的生命周期 > B

- @ques
  NOTIFY 只是用来做 future 开始调用 开关的, 只有这种方式吗
  或者通常如何实现这个功能...

每次调用 context 都不一样??

分散 + 整理

## 2019-11-12 09:21:42

- @ques NOTIFY 是做什么的...

- future 传递 必须要前一个 future 的类型 这样不怎么好用...

## 2019-11-11 09:21:53

- task...

- future-chain

  - future -> future -> ...

- @ques
- RefCell
- thread_local!
- Poll push

- `T: std::ops::Add<i32, Output = i32>,` ? 是什么意思...

  - x(:T) + i32 = i32

- NOTIFY.with? (NOTIFY ? width 是做什么的)

- context -> waker -> wake

- future
  -> Output
  -> poll(ctx: &Context) -> Poll<Output>

- context 是为了传递 wake 的, 用来通知 异步任务完成...

  - 是不是用来在多个 future 中同步...

- future 的流程到底是什么样子的...

  - 一个个的节点 到底是什么, 消息怎么传递...

- wake 如何通知其他地方, 自己完成了...

- pin 又是什么 ??

- @ques future 传递的类型...

## 2019-11-09 09:46:01

- @ques future 怎么使用

  - Pin + Poll, Pin<self>

- `impl From<io::Error> for Decode` 是干什么的

  - 到底是怎么使用的...

- @thk rust 的难点就是记住各种的 trait 各自的功能, 还有就是 lifeTime

- @ques `Deref` std::Pin

- @ques `pub auto trait UnPin` auto 是什么意思

- @ques Parsed<'self> 为什么会报错...

  - 好像现在还不支持 只是展示逻辑的代码...

- @ques `dyn AsynsRead + AsyncWrite` dyn 是什么意思...

* @ques 无法记忆这么多东西, 到后面都不知道 在做什么

## tokio-beanstalkd

- @qyes sink sinkExit(futures_util) frame

- @ques #[fail(display = "Did not find a job of that Id")]
- #![warn(rust_2018_idioms)]
- #[macro_use]

- @ques 几个文件是干什么的

çç

- 是只是两个类型之间的转化 ?
- 将 `io::Error` --> `Decode`

- @ques 是做什么的, 和 http 有什么关系...

  - `enum Request`
  - `enum Response`

- @ques `pub(crate) enum ProtocolError`

  - 是不是可以发布出去...

- @ques `tokio::codec::Framed;`

## 2019-10-31 09:36:59

https://rust-lang.github.io/async-book/02_execution/03_wakeups.html

- @ques future 运行的整个流程...

  - Executor + Spawner + Task + Future
  - ...

- @ques futures poll 的 第二个参数 context 是什么意思...

- new_excutor_and_spawner

- @ques Arc::new + Mutex::new

  - task 是做什么的 SyncSender

- @ques std::task

- 自己根本就看不懂这些东西在干什么??

  - 要记忆 rust 的常用功能... 这些现在都记不住...
  - 也可以一个个的查+记忆...

- @ques rust rc 的 count 能够获取吗 ?

- @ques task . context waker... 到底有什么用...

## 2019-10-14 09:44:08

- @ques `sync::mpsc::{sync_channel, Receiver, SyncSender}`

- @ques `impl Future<Output = ()> + 'static + Send`

- @ques 下面语法的意思

  - Pin<&mut Self>
  - Arc<Mutex<SharedState>>
  - &mut Context<'\_>
  - Some(cx.waker().clone())
  - Mutex<Option<BoxFuture<'static, ()>>, ??
  - SyncSender<Arc<Task>>,
  - sync_channel((MAX_QUEUED_TASKS))

- future -> awaker

## 2019-10-14 09:28:32

- @ques serve_req(req).boxed().compat()

- @ques run(futures_01_future);
  - 是不是 hyper 不支持 features-0.3

## 2019-10-12 10:02:30

- @ques 怎么简单的方式匹配 if else and ...

https://doc.rust-lang.org/1.7.0/reference.html#macro-by-example

- 怎么将数组形式的数据 转化为树状

- @ques 特殊的 macro 在一个 youtube 上看过..

  - declarative mabcros

  - procedural macros

- @ques macro 能不能处理 语言的匹配 cha

- @ques `vec![]` [] 是在什么地方匹配的
  - [] 只是一个闭合区域 到底是什么 其实无所谓的
- @note write_html! 这么强大

- @ques `Currently, macros can expand to expressions, statements, items, or patterns.`
  - 这些东西到底是什么意思? express statement items patterns
  - 分别怎么使用...

## 2019-09-25 20:01:59

- @ques code

- marcro vec 看不懂..
  - code generation

## 2018-11-27 09:25:13

- rust 2018

- @ques ADT/PoD
  - https://www.atjiang.com/data-structures-using-python-ADT/
  - https://zh.wikipedia.org/wiki/POD_(%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)
  - and any references between the data records will be of a form of an ID (number, uuid, or a deterministic hash).
  - t typically closely resembles or actually is backed by a relational database: Vectors or HashMaps storing bulk of the data by Index or ID

## 2018-11-22 09:21:24

- @qeus 将这些通信用异步处理是不是更有效率...
  - 所有 block thread 都是浪费时间...

* @ques 如何为 mpsc::channel 手动设置类型...

* @ques tx.send(val) 一个个的 send receive 就可以 for in 很奇怪, rx impl iterator

* @ques 怎么看一个 struct 有没有 impl 一个 trait 呢?

* @qeus 如何 clone tx

## 2018-11-20 09:22:35

- @note 将所有复杂的地方全部列举出来...

  - rc 多个 immutable owner | arc thread
    - strong_count weak_count
  - RefCell --> immutable -> mutable
  - Mutex + arc --> mutable thread share data..

- Box<T>
  - 知道内存占用.., eg list

* Refcel

- @ques 什么是 deadlock
  '

- @ques lock 怎么没有 unlock 的地方...

## 2018-11-17 10:20:42

- @ques cargo bench

- @ques 循环引用超过多少就 panic?

- @ques 关系 变化 functional program, data program

- [q] rust Rc RefCell Weak .. 都是为了解决实际问题的...

* @ques 函数式编程的样子是???

## 2018-11-15 09:24:03

- @note Rc
  - 多个 immutable owner
- @note RefCell
  - 把 immutable 变成 mutable
  - 这有什么实际的意义除了 demo 上面的?

## 2018-11-08 09:23:27

- @ques 为什么
  - `let list = Cons(1, Cons(2, Cons(3, Nil)));` 这个不行
  - `Cons(i32, Box<List>),` 这样就行了呢??

* 下面代码是什么意思?

```rs
let buffer: &mut [i32];
let coefficients: [i64; 12];
let qlp_shift: i16;

for i in 12..buffer.len() {
    let prediction = coefficients.iter()
                                 .zip(&buffer[i - 12..i])
                                 .map(|(&c, &s)| c * s as i64)
                                 .sum::<i64>() >> qlp_shift;
    let delta = buffer[i];
    buffer[i] = prediction as i32 + delta;
}
```

## 2018-11-07 09:14:39

- @ques `for in` 能不能不 move 使用引用...

  - 我还想用原来的 iter 怎么办...
  - 必须要先 clone 一个吗??, 这也是太扯了..
  - 能不能在多线程的时候才开启 ownership...
  - Vec 可以 for in

- @ques 我怎么让编辑器知道 data 的 behave 的

- @ques filter 中的 x 为什么是一个双引用...

  - `v1_iter.filter(|x| **x == 1).collect()`

- @ques 如何设置 rust 函数的返回类型

  - `v1_iter.sum::<i32>()`

- rust vscode 自动补全为什么用不了...

- v1_iter 为什么必须是 mut
  - next 要改变他的 index..
  - for in 做了什么处理 让他不要... 基本上是一样的实现啊

```rs
let mut v1_iter = v1.iter();
assert_eq!(v1_iter.next(), Some(&1));
```

```rs
// 这个为什么不需要...
for val in v1_iter {
    println!("Got: {}", val);
}
```

## 2018-11-03 10:20:06

- @ques 如何传递 thread

- `std::sync::mpsc::Receiver<std::fs::DirEntry>` cannot be shared between threads safely

- @todo

  - futures
  - thread

- 可以跨越 thread ?? why

```rs
thread::spawn(|| {
    for i in 1..10 {
        println!("spawn thread: {}", i);
        thread::sleep(Duration::from_millis(1))
    }
});
```

- @ques rust canvas..

- @ques 如何确定 thread 的个数...

- @note thread 可以调用 main 的 fun

- @ques thread 只能跑 一个 function 这种东西吗

  - 能不能跑整个环境...

- @ques 我怎么确定我的 tx 在前 rx 在后, rx 一定收到 tx 的信息

  - 现在是如果 rx 没有收到信息, 进程就会卡住...
  - rx 确保自己一定收到 tx 的信息...
  - tx 的信息必须拥有 ownership

- @note 所有东西都可以通过 threa 传递 只不过需要 onwership

## 2018-10-27 10:06:03

- @ques 跨 thread lifetime 如何处理...

- rust main send to thread

- ## thread 里面直接调用 外面的方法 copy 不会有问题?
  - 有问题 为什么是 lifetime 报错...

* @ques 为什么异步比同步还快呢...

  - 快 4 ~ 5 倍
  - 能不能同时复制三个文件...

* @ques rust 有没有大文件限制...

* @ques 这一大堆的错误 怎么处理

  - 一个个的 unwrap 很麻烦

* @note 这好像速度没有变快, 这主要是 io 性能

  - 如果我将 ls 中 cp 变成多个同时经行能不能变快

* @todo

  - 先一层
  - recursive
  - ***
  - @ques mk folder
  - recursive copy folder
  - thread

* @qeus 这到底有多快...

  - 这是 io 的请求和语言本身的处理速度应该没有关系
  - 也许 thread 可以加快...

* @ques 怎么建一个 Error 包裹已经存在的 error
  - 下面这种形式怎么不行...
  ```rs
  // pub enum CopyError {
  //     String,
  //     ioErr(io::Error),
  // }
  // pub type CopyResult = Result<(), CopyError>;
  ```

- rust `if !false` 这能不能工作

- ? 环境变量

  > sdfsdf

- @ques rust read all file

- @todo @ques rust 复制文件的速度
  > rust copy 文件
  > 异步 + 多进程

---

- @ques rust cmd
  > sdfsd

## 2018-10-19 09:15:47

- run 为什么不需要设置错误返回??

  - Result 本身就是一个自定义类型

- @ques string to bool

- fs::read_to_string 的错误处理...

- @ques 像捕鱼中的对象引用能在 rust 中实现吗???

- @ques @todo 如何检测一个值被清楚了

  - 监听 drop 事件...
  - 做一个例子

- @ques `Result<[&str], &'static str>` 就会有一个 compile time not know size err

  - `[&str]` 换成 `Vec<&str>` 就不报错了...

- lifeTime 只能在外面传过来, 或者本地 copy 没有更好的方法
  - copy 能不用就不用, 太消耗性能了

* @ques 哪些类型拥有 static lifetime
  - string iter `let a: &str = "sdfsdf";`
  - 在函数中定义的
  - 下面函数结束 a 还存在吗, 应该不存在了
  - &str 到底是什么意思, 对"str"的引用??

```rs
fn test() {
  let a = "sddsfsdf";
}
```

- @note lifetime 最大的问题应该是 对一个整体的部分的借用...

- rust 常用的数据类型

-

## 2018-10-13 10:42:59

- found staticlib `std` instead of rlib or dylib

- github action

- @ques rust 自动补全实在是太慢了...

- @ques rust 编译文件 默认 文件夹到底是什么...

- @ques rust 静态文件服务器..

- @ques 为什么有时候编译半天没有效果...

- @ques 像 command 一样查找模块...

- @async

  - @ques Arc<Self> 是做什么的...
  - @ques async 支持 promise 的所有选项吗

- @ques deepsea 服务器卡住了, 是不是 前端发给服务器的命令 不是

  - render 的数据需要一个个 传递 太累了
    - 为什么不做一个全局变量

- @ques 碰撞检测 是如何处理的..
- 位置如何更新...

  - 移除最后一个元素, 在前面添加一个元素...

- rust 1.30 什么新功能

- @ques 为什么要 game 和 snake 各自有一个独立的 gl

- @ques Snake_Piece 是做什么的

- 用户操作放在一个独立的地方...

- @ques 刷新的时间如何设置的?? 怎么没有看到...

  - events.next 的时间间隔是多少...
  - Events::new(EventSettings::new()).ups
  - 10 ms

- @ques 为什么 rust 用文件夹来组织 model 而不是 像 js 一样 export ....

- gitlab 如何看自己写了多少代码 ???

- @ques render_args
  - 为什么需要 game.render 需要这个额外的参数...

* @ques 有没有 borrow check 的例子...

- @ques 能不能用 rust 写些脚本 例如 本地服务器 webpack... 性能会很好吗?

- @ques 蛇是如何画在页面中的, 又是如何进行碰撞的检测的...

- @ques 这种本地跑的东西如何调试...

* @ques 能不能将一个大的计算任务分成很多小块...

## 2018-10-05 09:55:42

- vscode cmd 命令

- 打包 vscode

  - @note 标记 vscode 的 setting...
  - 大小...

- @note rust game 贪食蛇...

  - ripgrep 的使用

- @note mcTree assetsLoader 加载跳动

  - 可以累加 整个完成时的百分比...

- generic lifetime

- [input lifetimes][output lifetimes]

* @ques 下面不行 将 string2 换成 "xyz"就可以为什么

```ts
let string1 = String::from("abcd");
let result: &str;
{
    let string2 = String::from("xyz");

    result = longest(string1.as_str(), string2.as_str());
}
println!("The longest string is {}", result);
```

- @ques 下面函数如何返回&T

```rs
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest

}
```

## 2018-09-14 09:18:29

- 抽象的作用...
  - generic 能不能用在汉语上

* 能不能将下面的 改成 I32 也能调用...
  `impl Point<f32> { fn distance_from_origin(&self) -> f32 { (self.x.powi(2) + self.y.powi(2)).sqrt() } }`

* @note 练胆子: 滑板...

* @ques match ... 实在是太多了 难道不烦吗

  - 没有 error scope 吗

* @note 一个变量引用是否还合理和 error 本身是类似的问题

  - 只不过我在每次调用的地方都写这些逻辑实在是太重复了
  - 如果有方法将这些集中处理就很好的解决了...

* @note 国家权利和义务...

* @note 记录伸展

* @ques rust 能不能将错误处理放在统一的地方...

* @note rust 国内原

  - window 本地配置

* @note 国内 rust 升级版本..

* @note

  - 手机 chrome 升级
  - 锐龙 笔记本 怎么样...
  - 6000 左右笔记本...

* @ques 怎么在数组中找到一个元素...

  - 怎么合并一个数组...

* @ques rust conditional paramer

* @note

  - `teams.iter().zip(scores.iter()).collect()` 这个为什么必须定义类型才能转化
  - collect 可以转变成很多的类型...

* @note 华为语音笔记

* @note vscode new feature

* @ques vscode select

* @thk state setState 这种方式来组织属性

  - 目标属性 + 实现属性...

* @ques 怎么将所有人拉到一起去沟通一下...

  - 将 merge request 准备好...

* 我改你的东西 你肯定会生气

  - 有没有改进...

* component 只放在属性上面 属性太多要一个个的访问

  - 直接在 components 中可以直接访问

* a.getComponent(Class)....

  - 统一的 api, 统一的访问方式...

* 比方说 life 属性可能有多个方法会用到, 但是这些方法并不是每一个都用的到..

  - 那么如果我将一个属性和方法绑定, 其他的方法使用这个属性就比较麻烦了
    - 其他的就依赖这个 component...
  - 所以 ecs, 将属性和方法解绑, 提供统一的访问方式...
  - 如果我某个功能需要多个属性来控制,
  - 真正需要的属性, 和为了实现这个属性而添加的属性
  - 真正的属性其实很少, 很多都是为了实现这个功能而添加属性...
  - 功能动态添加 多个功能公用属性...

* 功能...

  - 动作+属性
  - register_com

* @note 最完美的形式 无法再减少一点

* 面向对象的缺点

  - 对象太多的属性...
  - 继承链

  ---

  - 将东西分离....

* 禅道

* @note Control Flow
* @note Modules mod

  - Controlling Visibility with pub

* @ques data oriented program

* @note 能不能在 binary crate 定义 mod

* @note 移动纠正 144

  - 停止纠正...

* 不同种族的人士在一起和谐相处... 伟大的国家...

* @note 检测我的修改 explodingDog

  - ...

* @ques println! macro 这个如何去处理...

  - `#[derive(Debug)]` 这些功能(derive annotation)到底是如何实现的...
  - ..

* @ques 为什么 rust 没有 class 拿到是 borrow check

* rust 支持 json 吗

* @ques `let slice:[i32, 2]` 怎么定义数组的类型+个数

* @ques 如何从 String::from("hello") 去掉几个字母

* @ques s 是 String 类型, slice: &str, para_s: &String 类型为什么, a: str 可以自动转换
  一个 string 为什么有那么多的类型

```rs
let b = "world"; // &str
let s = String::from("hello"); // String
let slice = &s; // &str
test(&s);

fn test(para_s: &String) {
  let a = para_s[..]; // str
}
```

## 2018-09-11 09:08:01

- @ques string iteral 是什么类型

- @play

  - 找房子
  - xi dtiror
  - ...
  - @ques rust ownership 是如何发明的

- @keyword

  - ownership
  - lifetime
  - move
  - copy

  ***

  - reference
    - invalid reference
  - trait
  - scalar values 单量...
    - integer Boolean floating character Tuples for above
  - compound value 组合...

- The Rules of References
  `At any given time, you can have either (but not both of) one mutable reference or any number of immutable references. References must always be valid.`

- @ques 增加流动 减少导致不流动的原因

- @ques memory 控制 引用计数...

  - 引用计数 为什么会消耗性能

- @note literals

- heap 上面的数据到底是怎么排列的...

- @ques rust 如何做大型项目 @google

  - 有没有已经的大型项目了...

- @note mvc m v 相互独立可以移动到任何地方...

  - 简单的项目直接使用 view 就可以了

- @note 直接访问对象的属性 为什么还比服务器 memory..慢..

- @ques heap 为什么不能动态的组织, 保持密集排布...

- @ques vscode rust auto complete

- @note 耳朵

- @ques &arr 怎么可以 for

- @ques 整除英文

- rust 支持 switch 吗 好像有 match

- 下面这段代码怎么会报错, 将 a 初始化之后就可以了(a = 0) 这是为什么

```rust
let number = 14;
let mut a: i32;

    // println!("{}", a);
    if number <= 5 {
        a = number;
    } else if number > 5 {
        a = number % 5;
    }

    println!("{}", a);
```

## 2018-09-11 09:43:00

- `control flow`

- tslint used value

- @ques rust 没有继承如何做大型的项目...

  - 比方说我的项目, 如果转化为 rust, 如何组织...

- @ques lib | bin 项目和一般项目如何区分

- @ques cargo 能创建项目吗

- @ques rust project git ignore

- @ques
  `The "rustsym" command is not available. Make sure it is installed.`

- vscode 字符检查

- @ques 错误如何才能集中处理

- unsize 是什么类型 `io::Result<unsize>`

- vscode

  - 报错 `multiple matching crates for 'rand'`
  - 不能自动补全

- @ques 怎么自定义错误的处理...

- @ques indent 太丑了

- @ques `use rand::Rng;` 怎么没有用这个

  - 因为 gen_range 这个是 Rng impl 的??

- @ques 怎么抛出 rand::Rng 让别人使用

  - pub trait Rng: RngCore

- @ques rust 怎么看执行时间

- @ques 如何获取 struct 的值

- @ques 报错

  - 下面这个代码能不能做成一个独立的函数...

- @ques vscode 无法自动补全...

```rust
let end2 = SystemTime::now();
println!("{}", end2.intervals); // unknown field
```
