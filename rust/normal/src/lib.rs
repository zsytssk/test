use std::error::Error;
use std::fs;
use std::io::prelude::*;

struct Config {
    query: String,
    filename: String,
    case_sensitive: bool,
}

impl Config {
    fn new(query: String, filename: String, case_sensitive: bool) -> Config {
        Config {
            query,
            filename,
            case_sensitive,
        }
    }
}
pub fn run(
    query: String,
    filename: String,
    case_sensitive: bool,
) -> Result<Vec<String>, std::io::Error> {
    let config = Config::new(query, filename, case_sensitive);
    let contents = match fs::read_to_string(config.filename) {
        Ok(val) => val,
        Err(e) => return Err(e),
    };

    let results = if config.case_sensitive {
        search(&config.query, &contents)
    } else {
        search_insensetive(&config.query, &contents)
    };

    let results: Vec<String> = results.iter().map(|s| s.to_string()).collect();

    return Ok(results);
}

fn search<'a>(query: &'a str, contents: &'a str) -> Vec<&'a str> {
    let mut results = Vec::new();

    for line in contents.lines() {
        if line.contains(query) {
            results.push(line);
        }
    }

    return results;
}

fn search_insensetive<'a>(query: &'a str, contents: &'a str) -> Vec<&'a str> {
    let query = query.to_lowercase();

    let mut results = Vec::new();
    for line in contents.lines() {
        if line.to_lowercase().contains(&query) {
            results.push(line);
        }
    }

    return results;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn case_sensitive() {
        let query = "hello".to_string();
        let filename = "./hello.txt".to_string();
        let result = search(query, filename).unwrap();
        assert_eq!(result, vec!["hello world"])
    }
    #[test]
    fn case_insensitive() {
        let query = "hello".to_string();
        let filename = "./hello.txt".to_string();
        let result = search_insensetive(query, filename).unwrap();
        assert_eq!(result, vec!["hello world", "Hello zsy"])
    }
}
