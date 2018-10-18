use std::fs;
use std::io::prelude::*;

struct Config {
    query: String,
    filename: String,
}

impl Config {
    fn new(query: String, filename: String) -> Config {
        Config { query, filename }
    }
}

pub fn search(args: &[String]) -> Result<&str, &'static str> {
    if args.len() != 3 {
        return Err("args len not fit!");
    }

    let query = args[1].clone();
    let filename = args[2].clone();

    let config = Config::new(query, filename);

    let contents =
        fs::read_to_string(config.filename).expect("Something went wrong reading the file");

    println!("{}", contents);

    return Ok("123");
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn one_result() {
        let query = "duct";
        let contents = "sdfsdfdsfsds duct";
    }
}
