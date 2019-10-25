- std::sync::mpsc::sync_channel
  - cross thread pass msg

* @todo Option<T>

```rs
match result {
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
