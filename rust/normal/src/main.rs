trait Print {
    fn print(&self);
}

impl Print for i32 {
    fn print(&self) {
        println!("{}", self);
    }
}

impl Print for i64 {
    fn print(&self) {
        println!("{}", self);
    }
}

fn main() {
    let x = 0i32;
    let y = 10i64;
    x.print(); // 0
    y.print(); // 10

    let data: [Box<Print>; 2] = [Box::new(20i32), Box::new(30i32)];

    for val in &data {
        val.print();
    }
}
