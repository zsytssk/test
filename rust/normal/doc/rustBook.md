- std::sync::mpsc::sync_channel
  - cross thread pass msg

* Result<T, E>

```rs
enum Result<T, E> {
   Ok(T),
   Err(E),
}

match result {
    Ok(v) => ...,
    Err(e) => ...,
}

```
* Option<T>

```rs
match option {
    // The division was valid
    Some(x) => println!("Some: {}", x),
    // The division was invalid
    None    => println!("None"),
}
```

- arc (not mutable)
  - thread refrence count 跨线程引用计数
  - rc(refrence count) 引用计数

```rs
use std::sync::Arc;

fn main() {
    let foo = Arc::new(vec![1.0, 2.0, 3.0]);
    // The two syntaxes below are equivalent.
    let a = foo.clone();
    let b = Arc::clone(&foo);

    println!("{:?}", foo);
    println!("{:?}", a);
    println!("{:?}", foo == a);
}
```

- rc (not mutable)
  - 同一个值有多个引用 引用计数

```rs
use std::rc::Rc;

fn main() {
    let x = Rc::new(4);
    let _y = Rc::clone(&x);
    let _x = Rc::clone(&x);

    println!("{:?}:{:?}", x == _y, _y ==_x)
}
```

- Mutex(mutable)

- dyn Trait
  rust 新语法用在 trait 前面, &Trait -> &dyn Trait, Box<Trait> -> Box<dyn Trait>

- Deref(trait use std::ops::Deref)
  customize the behavior of the dereference operator

- Drop (trait use std::ops::Drop)
  run some code when a value goes out of scope

- `impl From<io::Error> for Decode`
  io::Error --> Decode 的转化过程...

- `const fn`
  - 只能传递 const 参数

## other

### rustup

- 切换 rust 版本 `rustup default stable`
  https://doc.rust-lang.org/edition-guide/rust-2018/rustup-for-managing-rust-versions.html

### pub(crate) pub(super) pub(self)

makes an item visible within the current crate | super | self
