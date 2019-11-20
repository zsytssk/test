- The Observer pattern
- https://stackoverflow.com/questions/37572734/how-can-i-implement-the-observer-pattern-in-rust

  - https://this-week-in-rust.org/blog/2019/11/12/this-week-in-rust-312/

- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=9c427527c64b4dd5238c508de1d4151a

* @ques Result 不需要设置错误类型

```rs
use std::io;
use std::io::prelude::*;
use std::fs::File;

fn main() -> io::Result<(), _> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = [0; 10];

    // read up to 10 bytes
    f.read(&mut buffer[..])?;
    Ok(())
}
```

- vscode 不能自动补全
- @ques `let slice:[i32, 2]` 怎么定义数组的类型+个数
- @ques 如何从 String::from("hello") 去掉几个字母
