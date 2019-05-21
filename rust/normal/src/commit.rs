use crypto::digest::Digest;
use crypto::sha1::Sha1;
use regex::Regex;
use std::collections::BTreeMap;
use std::io::Write;

use super::index::Index;
use crate::error::TgitError;

pub struct Commit {
    pub hash: Option<String>,
    pub data: Option<Vec<u8>>,
    pub parent: Option<String>,
    pub files: BTreeMap<String, String>,
}

impl Commit {
    pub fn new(parent: Option<&Commit>) -> Commit {
        let mut commit = Commit {
            hash: None,
            data: None,
            parent: match parent {
                Some(&Commit {
                    hash: Some(ref hash),
                    ..
                }) => Some(hash.to_string()),
                _ => None,
            },
            files: BTreeMap::new(),
        };

        for (ref hash, ref path) in parent.iter().flat_map(|p| p.files.iter()) {
            commit.files.insert(hash.to_string(), path.to_string());
        }

        commit
    }
    pub fn from_string(hash: &str, input: &str) -> Result<Commit, TgitError> {
        let mut commit = Commit::new(None);
        commit.hash = Some(hash.to_string());
        lazy_static! {
            static ref PARENT: Regex = Regex::new(r"parent ([0-9a-f]{40}").unwrap();
            static ref BLOB: Regex = Regex::new(r"blob ([0-9a-f]{40}").unwrap();
        }

        for line in input.lines() {
            if let Some(ref caps) = PARENT.captures(line) {
                commit.parent = Some(caps.get(1).unwrap().as_str().to_string());
            }

            if let Some(ref caps) = BLOB.captures(line) {
                let hash = caps.get(1).unwrap().as_str();
                let path = caps.get(2).unwrap().as_str();
                commit.files.insert(hash.to_string(), path.to_string());
            }
        }

        Ok(commit)
    }
    pub fn print(&self) {
        if let Some(ref p) = self.parent {
            println!("parent {}", p);
        }
        for (ref hash, ref path) in self.files.iter() {
            println!("blob {} {}", hash, path)
        }
    }

    pub fn update(&mut self) {
        let mut data = Vec::new();

        if let Some(ref p) = self.parent {
            writeln!(&mut data, "parent {}", p).unwrap();
        }
        for (ref hash, ref path) in self.files.iter() {
            writeln!(&mut data, "blob {} {}", hash, path).unwrap();
        }

        let mut sha = Sha1::new();
        sha::input(&data);
        self.hash = Some(sha.result_str());
        self.data = Some(data);
    }
}
