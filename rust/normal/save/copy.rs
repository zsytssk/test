use std::fs::{self, create_dir_all};
use std::io::{Error, ErrorKind};
use std::path::{Path, PathBuf};

use std::sync::mpsc::{self, TryRecvError};
use std::sync::Arc;
use std::thread;

pub enum CopyErr {
    io_err(Error),
    string_err(String),
}

pub type CopyResult = Result<(), CopyErr>;

pub fn run(src: String, dist: String) -> CopyResult {
    let src_path = Path::new(src.as_str()).to_path_buf();
    let dist_path = Path::new(dist.as_str()).to_path_buf();

    return copy(src_path, dist_path);
}

fn copy(src: PathBuf, dist: PathBuf) -> CopyResult {
    if !src.exists() {
        let err_msg = format!("{:?} dont exists", src);
        return Err(CopyErr::string_err(err_msg));
    }

    let metadata = fs::metadata(&src).unwrap();
    if metadata.is_file() {
        fs::copy(src, dist);
        return Ok(());
    }

    if !dist.exists() {
        match create_dir_all(&dist) {
            Ok(val) => val,
            Err(e) => {
                return Err(CopyErr::io_err(e));
            }
        };
    }

    let items = match fs::read_dir(src) {
        Ok(val) => val,
        Err(e) => {
            return Err(CopyErr::io_err(e));
        }
    };

    let arc_dist = Arc::new(dist);
    let mut thread_handles = vec![];
    for entry in items {
        if let Ok(entry) = entry {
            let arc_entry = Arc::new(entry);
            let clone_entry = Arc::clone(&arc_entry);
            let clone_dist = Arc::clone(&arc_dist);

            let handler = thread::spawn(move || {
                let metadata = fs::metadata(clone_entry.path()).unwrap();
                if metadata.is_dir() {
                    copy(clone_entry.path(), clone_dist.join(clone_entry.file_name()));
                    return;
                }
                fs::copy(clone_entry.path(), clone_dist.join(clone_entry.file_name()));
            });

            thread_handles.push(handler);
        }
    }

    for handle in thread_handles {
        handle.join();
    }

    Ok(())
}
