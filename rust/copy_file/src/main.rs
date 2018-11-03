use std::sync::mpsc;
use std::thread;
use std::time::Duration;

#[derive(Debug)]

struct Test {
    val: i32,
}
impl Test {
    fn print(&self) {
        println!("{}", self.val);
    }
}

fn main() {
    let (tx, rx) = mpsc::channel();

    let handle = thread::spawn(move || {
        for i in 1..20 {
            let v = Test { val: i };
            tx.send(v).unwrap();
        }
    });

    thread::sleep(Duration::from_millis(10));

    loop {
        if let Ok(a) = rx.recv() {
            a.print();
        } else {
            continue;
        }

        // if a.val ==  {
        //     break;
        // }
    }

    handle.join().unwrap();
}

fn test(str: &Vec<i32>) {
    println!("{:?}", str);
}
