#[derive(Debug)]
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

fn main() {
    let mut v = vec![
        SpreadsheetCell::Int(3),
        SpreadsheetCell::Float(3.0),
        SpreadsheetCell::Text(String::from("blue")),
    ];
    for i in (0..3) {
        match v[i] {
            ::Float(_) => {
                let a = v.swap_remove(i);
                println!("{:?}", a);
                break;
            }
            _ => {}
        }
    }
    println!("{:?}", v);
}
