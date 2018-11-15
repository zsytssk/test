struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;

        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    // let a = Counter::new();
    let a = vec![1, 2, 3];
    // loop {
    //     if let Some(v) = a.next() {
    //         println!("{:?}", v);
    //     } else {
    //         break;
    //     }
    // }
    for v in &a {
        println!("{}", v);
    }
    println!("{:?}", a.iter().sum::<u32>())
}
