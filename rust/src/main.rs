fn main() {
    let s = String::from("hello");
    let s1 = takes_ownsership(s);
    println!("{}", s1);

    let x = 5;
    makes_copy(x);
    println!("{}", x);
}

fn takes_ownsership(some_string: String) -> String {
    println!("{}", some_string);
    some_string
}
fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
