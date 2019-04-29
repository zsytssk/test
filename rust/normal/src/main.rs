extern crate futures;
extern crate tokio;

mod interval;
mod stream;

use self::interval::Interval;
use self::stream::IntervalStream;
use tokio::prelude::*;

struct MyOk<T>(Option<T>, u32);
impl<T> MyOk<T> {
    fn new(t: T) -> MyOk<T> {
        MyOk(Some(t), 0)
    }
}

impl<T> Future for MyOk<T> {
    type Item = T;
    type Error = ();
    fn poll(&mut self) -> Poll<T, ()> {
        let state = self.1;
        println!("MyOk state  = {}", self.1);
        if state == 0 {
            self.1 = 1;
            let task = futures::task::current();
            task.clone().notify();
            Ok(Async::NotReady)
        } else {
            Ok(Async::Ready(self.0.take().unwrap()))
        }
    }
}

fn main() {
    let name = String::from("Alice");
    let future = MyOk::new(name).and_then(|name| {
        println!("Name: {}", name);
        MyOk::new(())
    });
    println!("test");
    tokio::run(future);
}
