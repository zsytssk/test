## 2018-09-11 09:08:01

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
