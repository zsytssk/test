- @ques Result 不需要设置错误类型

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
