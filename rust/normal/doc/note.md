## 2018-09-14 09:18:29

- @ques 怎么在数组中找到一个元素...

  - 怎么合并一个数组...

- @ques rust conditional paramer

- @note

  - `teams.iter().zip(scores.iter()).collect()` 这个为什么必须定义类型才能转化
  - collect 可以转变成很多的类型...

- @note 华为语音笔记

- @note vscode new feature

- @ques vscode select

- @thk state setState 这种方式来组织属性

  - 目标属性 + 实现属性...

- @ques 怎么将所有人拉到一起去沟通一下...

  - 将 merge request 准备好...

- 我改你的东西 你肯定会生气

  - 有没有改进...

- component 只放在属性上面 属性太多要一个个的访问

  - 直接在 components 中可以直接访问

- a.getComponent(Class)....

  - 统一的 api, 统一的访问方式...

- 比方说 life 属性可能有多个方法会用到, 但是这些方法并不是每一个都用的到..

  - 那么如果我将一个属性和方法绑定, 其他的方法使用这个属性就比较麻烦了
    - 其他的就依赖这个 component...
  - 所以 ecs, 将属性和方法解绑, 提供统一的访问方式...
  - 如果我某个功能需要多个属性来控制,
  - 真正需要的属性, 和为了实现这个属性而添加的属性
  - 真正的属性其实很少, 很多都是为了实现这个功能而添加属性...
  - 功能动态添加 多个功能公用属性...

- 功能...

  - 动作+属性
  - register_com

- @note 最完美的形式 无法再减少一点

- 面向对象的缺点

  - 对象太多的属性...
  - 继承链

  ***

  - 将东西分离....

- 禅道

- @note Control Flow
- @note Modules mod

  - Controlling Visibility with pub

- @ques data oriented program

- @note 能不能在 binary crate 定义 mod

- @note 移动纠正 144

  - 停止纠正...

- 不同种族的人士在一起和谐相处... 伟大的国家...

- @note 检测我的修改 explodingDog

  - ...

- @ques println! macro 这个如何去处理...

  - `#[derive(Debug)]` 这些功能(derive annotation)到底是如何实现的...
  - ..

- @ques 为什么 rust 没有 class 拿到是 borrow check

- rust 支持 json 吗

- @ques `let slice:[i32, 2]` 怎么定义数组的类型+个数

- @ques 如何从 String::from("hello") 去掉几个字母

- @ques s 是 String 类型, slice: &str, para_s: &String 类型为什么, a: str 可以自动转换
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
