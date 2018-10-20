extern crate mylib;

use std::process;

use mylib::*;
use std::env;

fn main() {
    let a = "sdsdf";
    let args: Vec<String> = env::args().collect();

    let query = args[1].clone();
    let filename = args[2].clone();
    let case_sensitive: bool = args[3].parse().unwrap();

    let lines = match run(query, filename, case_sensitive) {
        Ok(val) => val,
        Err(e) => {
            panic!("{:?}", e);
        }
    };

    println!("{:?}", lines);
}
