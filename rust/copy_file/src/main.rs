extern crate mylib;

use std::time::SystemTime;

use mylib::*;

fn main() {
    let now = SystemTime::now();

    copy(
        "C:/Users/zhangshiyang/.vscode/extensions".to_string(),
        "C:/Users/zhangshiyang/Desktop/test/dist".to_string(),
    );

    println!("{}", now.elapsed().unwrap().as_secs());
}
