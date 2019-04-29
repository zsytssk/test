extern crate futures;

use super::interval::Interval;
use futures::prelude::*;

pub struct IntervalStream {
    interval: Interval,
    last: usize,
}

impl IntervalStream {
    pub fn new(interval: Interval) -> IntervalStream {
        let last = interval.get_counter();
        IntervalStream { interval, last }
    }
}

impl Stream for IntervalStream {
    type Item = usize;
    type Error = ();

    fn poll(&mut self) -> Poll<Option<Self::Item>, Self::Error> {
        let curr = self.interval.get_counter();
        if curr == self.last {
            let task = futures::task::current();
            self.interval.set_task(task);
            Ok(Async::NotReady)
        } else {
            self.last = curr;
            Ok(Async::Ready(Some(curr)))
        }
    }
}