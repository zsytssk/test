use std::fs::File;
use std::io;
use std::io::prelude::*;

struct Info {
    name: String,
    age: i32,
    rating: i32,
}

fn write_info(info: &Info) -> io::Result<()> {
    let mut file = File::create("my_best_friends.txt")?;

    file.write_all(format!("name: {}\n", info.name).as_bytes())?;
    file.write_all(format!("age: {}\n", info.age).as_bytes())?;
    file.write_all(format!("age: {}\n", info.rating).as_bytes())?;
    Ok(())
}

fn main() {
    let info = Info {
        name: String::from("zsy"),
        age: 31,
        rating: 95,
    };
    write_info(&info);
}
