use std::sync::mpsc::channel;
use std::thread;

fn main() {
    let (tx, rx) = channel();
    let mut a: Vec<thread::JoinHandle<_>> = vec![];
    for i in 0..10 {
        let tx = tx.clone();
        let b = thread::spawn(move || {
            tx.send(i).unwrap();
        });
        a.push(b);
    }

    loop {
        let j = rx.recv().unwrap();
        println!("{}", j);
    }

    for item in a {
        item.join();
    }
}
