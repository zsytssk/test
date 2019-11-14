#![allow(dead_code)]
use std::cell::RefCell;

thread_local!(static NOTIFY: RefCell<bool> = RefCell::new(true));

mod task {
     use crate::NOTIFY;

     pub struct Context<'a> {
          waker: &'a Waker,
     }

     impl<'a> Context<'a> {
          pub fn from_waker(waker: &'a Waker) -> Self {
               Context { waker }
          }

          pub fn waker(&self) -> &'a Waker {
               &self.waker
          }
     }

     pub struct Waker;

     impl Waker {
          pub fn wake(&self) {
               NOTIFY.with(|f| *f.borrow_mut() = true)
          }
     }
}
use crate::task::*;

mod future {
     use crate::task::*;

     pub enum Poll<T> {
          Ready(T),
          Pending,
     }

     pub trait Future {
          type Output;

          fn poll(&mut self, cx: &Context) -> Poll<Self::Output>;

          fn map<U, F>(self, f: F) -> Map<Self, F>
          where
               F: FnOnce(Self::Output) -> U,
               Self: Sized,
          {
               Map {
                    future: self,
                    f: Some(f),
               }
          }
     }

     pub struct Ready<T>(Option<T>);

     impl<T> Future for Ready<T> {
          type Output = T;

          fn poll(&mut self, _: &Context) -> Poll<Self::Output> {
               Poll::Ready(self.0.take().unwrap())
          }
     }

     pub fn ready<T>(val: T) -> Ready<T> {
          Ready(Some(val))
     }

     pub struct Map<Fut, F> {
          future: Fut,
          f: Option<F>,
     }

     impl<Fut, F, T> Future for Map<Fut, F>
     where
          Fut: Future,
          F: FnOnce(Fut::Output) -> T,
     {
          type Output = T;

          fn poll(&mut self, cx: &Context) -> Poll<T> {
               match self.future.poll(cx) {
                    Poll::Ready(val) => {
                         let f = self.f.take().unwrap();
                         Poll::Ready(f(val))
                    }
                    Poll::Pending => Poll::Pending,
               }
          }
     }
}

use crate::future::*;

fn block_on<F>(mut f: F) -> F::Output
where
     F: Future,
{
     NOTIFY.with(|n| loop {
          if *n.borrow() {
               *n.borrow_mut() = false;
               let ctx = Context::from_waker(&Waker);
               if let Poll::Ready(val) = f.poll(&ctx) {
                    return val;
               }
          }
     })
}

fn main() {
     let my_future = future::ready(1).map(|val| val + 1);
     println!("Output: {}", block_on(my_future));
}
