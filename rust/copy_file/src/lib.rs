use std::fs::{self, create_dir_all};
use std::io::{Error, ErrorKind};
use std::path::Path;

use std::sync::mpsc::{self, TryRecvError};
use std::thread;

pub enum CopyErr {
    io_err(Error),
    string_err(String),
}

pub type CopyResult = Result<(), CopyErr>;

pub fn copy(src: String, dist: String) -> CopyResult {
    let src_path = Path::new(src.as_str());
    let dist_path = Path::new(dist.as_str());

    if !src_path.exists() {
        let err_msg = format!("{:?} dont exists", src);
        return Err(CopyErr::string_err(err_msg));
    }

    if !dist_path.exists() {
        match create_dir_all(&dist_path) {
            Ok(val) => val,
            Err(e) => {
                return Err(CopyErr::io_err(e));
            }
        };
    }

    let items = match fs::read_dir(src_path) {
        Ok(val) => val,
        Err(e) => {
            return Err(CopyErr::io_err(e));
        }
    };

    let (tx, rx) = mpsc::channel();

    let handle = thread::spawn(move || {
        let handler = |entry: fs::DirEntry| {
            let metadata = fs::metadata(entry.path()).unwrap();
            if metadata.is_dir() {
                copy(
                    entry.path().to_str().unwrap().to_string(),
                    dist_path
                        .join(entry.file_name())
                        .to_str()
                        .unwrap()
                        .to_string(),
                );
            }
            fs::copy(entry.path(), dist_path.join(entry.file_name()));
        };

        loop {
            println!("Got: {:?}", rx.recv().unwrap());
        }
    });

    for entry in items {
        if let Ok(entry) = entry {
            tx.send(entry).unwrap();
        }
    }

    Ok(())
}
