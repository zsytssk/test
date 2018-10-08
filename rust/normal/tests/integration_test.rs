extern crate mylib;

use mylib::*;

#[test]
fn it_works() {
    let guess = Guess::new(10);
    guess.test();
}
