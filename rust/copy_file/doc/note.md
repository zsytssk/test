## 2018-11-17 15:54:26

- @ques `thread::spawn(*first_fn);`

  - 这怎么处理 `dyn std::ops::Fn()` cannot be sent between threads safely

- 我想想创建一个 thread pool, 可以将代码闭包传进去

  - 在 pool 中定义 thread 的个数...
  - 每次运行结束去拿保存的闭包运行...
  - 超过个数就等待...

- @ques generic type 怎么定义类型...

  - `calc_pool::CalcPool::new()`

- @ques Path::new(src.as_str())

  - 为什么是一个 `&std::path::Path`

- @ques for each thread join

- @ques 能不能支持多个 thread

- @ques thread in thread 行不行啊

## 2018-11-17 15:54:23

- @quet rust 能不能建立 stream...

  - pipe
  - rust lang read file stream

- @ques 为什么可以 read stream...

- @ques fs::copy 这个是阻塞的吗, 必须等一个复制完了之后, 才会有下一个行为吗

* @ques 我这代码转换类型实在太烦了, 没有找到合适的参数类型...
