#[macro_use]
extern crate futures;
extern crate tokio;

mod future;
mod interval;

use self::future::IntervalFuture;
use self::interval::Interval;
use tokio::prelude::*;

struct IntervalPrinter(IntervalFuture);

impl Future for IntervalPrinter {
    type Item = ();
    type Error = ();
    fn poll(&mut self) -> Poll<Self::Item, Self::Error> {
        let curr = try_ready!(self.0.poll());
        println!("Counter is: {}", curr);
        Ok(Async::Ready(()))
    }
}

fn main() {
    let interval = Interval::from_millis(500);
    let interval_future = IntervalFuture::new(interval);
    let interval_printer = IntervalPrinter(interval_future);
    tokio::run(interval_printer)
}
