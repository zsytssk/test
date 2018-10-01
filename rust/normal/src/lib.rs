use std::cmp::Ordering;

#[derive(Debug)]
pub struct Guess {
    value: u32,
}

impl Guess {
    pub fn new(value: u32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }

        Guess { value }
    }
    pub fn value(&self) -> u32 {
        self.value
    }
    pub fn cmp(&self, num: &u32) -> Ordering {
        self.value.cmp(num)
    }
}
