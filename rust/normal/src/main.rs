extern crate mylib;

use std::process;

use mylib::*;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    if let Err(e) = search_file(&args) {
        println!("{}", e);
        process::exit(1);
    }
}
