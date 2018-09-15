## 2018-09-14 09:18:29

- @ques println! macro 这个如何去处理...

  - `#[derive(Debug)]` 这些功能(derive annotation)到底是如何实现的...
  - ..

- @ques 为什么 rust 没有 class 拿到是 borrow check

- rust 支持 json 吗

- @ques `let slice:[i32, 2]` 怎么定义数组的类型+个数

- @ques 如何从 String::from("hello") 去掉几个字母

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
  - ***
  - reference
    - invalid reference
  - trait
  - scalar values 单量...
    - integer Boolean floating character Tuples for above
  - compound value 组合...

- The Rules of References
  `At any given time, you can have either (but not both of) one mutable reference or any number of immutable references. References must always be valid.`

* @ques 增加流动 减少导致不流动的原因

- @ques memory 控制 引用计数...

  - 引用计数 为什么会消耗性能

- @note literals

- heap 上面的数据到底是怎么排列的...

- @ques rust 如何做大型项目 @google
  - 有没有已经的大型项目了...

* @note mvc m v 相互独立可以移动到任何地方...

  - 简单的项目直接使用 view 就可以了

* @note 直接访问对象的属性 为什么还比服务器 memory..慢..

* @ques heap 为什么不能动态的组织, 保持密集排布...

* @ques vscode rust auto complete

* @note 耳朵

* @ques &arr 怎么可以 for

* @ques 整除英文

* rust 支持 switch 吗 好像有 match

* 下面这段代码怎么会报错, 将 a 初始化之后就可以了(a = 0) 这是为什么

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
