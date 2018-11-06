use std::sync::mpsc;
use std::thread;
use std::time::Duration;

trait Print {
    fn print(&self);
}

#[derive(Debug)]
struct Test {
    val: i32,
}
impl Print for Test {
    fn print(&self) {
        println!("{}", self.val);
    }
}

impl Test {
    fn print1(&self) {
        self.print();
    }
}

fn main() {
    let a = Test { val: 10 };
    a.print1();
}
