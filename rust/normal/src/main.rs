use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let path = "../hello.txt";
    let f = File::open(&path).map_err(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create(&path).unwrap_or_else(|error| {
                panic!("Tried to create file but there was a problem: {:?}", error);
            });
        } else {
            panic!("There was a problem opening the file: {:?}", error);
        }
    });

    println!("11 {:?}", f);
}
