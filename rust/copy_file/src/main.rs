use std::time::Instant;

extern crate mylib;
use mylib::run;

fn main() {
    let now = Instant::now();
    let dist = String::from("C:/Users/zhangshiyang/.vscode/extensions");
    let src = String::from("C:/Users/zhangshiyang/Desktop/test/extensions");

    // let dist = String::from("C:\\Users\\zhangshiyang\\Desktop\\test\\src\\save.7z");
    // let src = String::from("C:\\Users\\zhangshiyang\\Desktop\\test\\src\\save-copy.7z");

    run(dist.clone(), src.clone());
    println!("{}", now.elapsed().as_secs());
}
