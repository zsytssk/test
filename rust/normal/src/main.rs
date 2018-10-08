pub struct Guess {
    value: u32,
}

impl Guess {
    pub fn new(value: u32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value out 1..100");
        }

        Guess { value }
    }
    fn test(&self) {
        println!("this is a test");
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let guess = Guess::new(10);
        guess.test();
    }
}

fn main() {}
