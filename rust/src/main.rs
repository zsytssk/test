extern crate rand;

use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");
    println!("please input your guess.");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    let mut guess = String::new();
    io::stdin()
        .read_line(&mut guess)
        .expect("fail to read line!");

    let guess: u32 = guess.trim().parse().expect("please type a number");

    println!("You guessed: {}", guess);

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("Too equal!"),
    }
}
