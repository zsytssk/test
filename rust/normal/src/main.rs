use std::sync::{Arc, Mutex};
use std::thread;

struct MyInner {
    s: u8,
}
struct My {
    inner: Arc<Mutex<MyInner>>,
}

impl My {
    fn new(s: u8) -> My {
        My {
            inner: Arc::new(Mutex::new(MyInner { s })),
        }
    }
    fn start(&mut self) {
        let local_self = self.inner.clone();
        thread::spawn(move || {
            local_self.lock().unwrap().add();
        });
    }
    fn get(&self) -> u8 {
        self.inner.lock().unwrap().s
    }
}

impl MyInner {
    fn add(&mut self) {
        println!("{:?}", self.s);
        self.s += 1;
        println!("{:?}", self.s);
    }
}

fn main() {
    let mut thread_test = My::new(0);
    loop {
        thread_test.start();
        println!("{}", thread_test.get());
    }
}
