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

pub fn search(args: &[String]) -> Result<Vec<String>, &str> {
    if args.len() != 3 {
        return Err("args len not fit!");
    }

    let query = args[1].clone();
    let filename = args[2].clone();

    let config = Config::new(query, filename);

    let contents =
        fs::read_to_string(config.filename).expect("Something went wrong reading the file");

    let mut results = Vec::new();
    for line in contents.lines() {
        if line.contains(&config.query) {
            results.push(line.to_string());
        }
    }

    return Ok(results);
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
