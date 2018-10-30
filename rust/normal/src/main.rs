use std::thread;
use std::time::Duration;

struct Cacher<T>
where
    T: Fn(u32) -> u32,
{
    arg: Option<u32>,
    calculation: T,
    value: Option<u32>,
}

impl<T> Cacher<T>
where
    T: Fn(u32) -> u32,
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            arg: None,
            calculation,
            value: None,
        }
    }
    fn value(&mut self, arg: u32) -> u32 {
        let mut result: u32;
        if self.arg == None || arg != self.arg.unwrap() {
            result = (self.calculation)(arg);
            self.value = Some(result);
        }

        match self.value {
            Some(v) => {
                result = v;
            }
            None => {
                result = (self.calculation)(arg);
                self.value = Some(result);
            }
        }

        result
    }
}

fn main() {
    let simulated_user_specified_val = 35;
    let simulated_random_number = 7;

    generate_workout(simulated_user_specified_val, simulated_random_number);
}

fn generate_workout(intensity: u32, random_number: u32) {
    let mut expensive_result = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });

    if intensity < 25 {
        println!("today, do {} pushups", expensive_result.value(intensity));
        println!("Next, do {} situps!", expensive_result.value(intensity));
    } else {
        if random_number == 3 {
            println!("take a break tody! remember to stay hydrated!");
        } else {
            println!(
                "today run for {} minites!",
                expensive_result.value(intensity)
            )
        }
    }
}

#[test]
fn call_with_different_values() {
    let mut c = Cacher::new(|a| a);

    let v1 = c.value(1);
    let v2 = c.value(2);

    assert_eq!(v2, 2);
}
