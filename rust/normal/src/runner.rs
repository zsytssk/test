use std::cell::RefCell;

thread_local!(static NOTIFY: RefCell<bool> = RefCell::new(true));

struct Context<'a> {
    waker: &'a Waker,
}

impl<'a> Context<'a> {
    fn from_waker(waker: &'a Waker) -> Self {
        Context { waker }
    }

    fn waker(&self) -> &'a Waker {
        &self.waker
    }
}

struct Waker;

enum Poll<T> {
    Ready(T),
    Pending,
}

impl Waker {
    fn wake(&self) {
        NOTIFY.with(|f| *f.borrow_mut() = true)
    }
}

trait Future {
    type Output;
    fn poll(&mut self, ctx: &Context) -> Poll<Self::Output>;
}

fn run<F>(mut f: F) -> F::Output
where
    F: Future,
{
    NOTIFY.with(|n| loop {
        if *n.borrow() {
            *n.borrow_mut() = false;
            let ctx = Context::from_waker(&waker);
            if let Poll::Ready(val) = f.poll(&ctx) {
                return val;
            }
        }
    })
}

#[derive(Default)]
struct MyFuture {
    count: u32,
}

impl Future for MyFuture {
    type Output = i32;

    fn poll(&mut self, ctx: &Context) -> Poll<Self::Output> {
        match self.count {
            3 => Poll::Ready(3),
            _ => {
                self.count += 1;
                ctx.waker().wake()();
                Poll::Pending
            }
        }
    }
}

struct AddOneFuture<T>(T);

impl<T> Future for AddOneFuture<T>
where
    T: Future,
    T::Output: std::ops::Add<i32, Output = i32>,
{
    type Output = i32;
    fn poll(&mut self, ctx: &Context) -> Poll<Self::Output> {
        match self.0.poll(ctx) {
            Poll::Ready(count) => Poll::Ready(count + 1),
            Poll::Pending => Poll::Pending,
        }
    }
}
