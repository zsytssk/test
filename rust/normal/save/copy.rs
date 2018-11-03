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

    for entry in items {
        if let Ok(entry) = entry {
            let clone_dist = Arc::new(dist_path).clone();
            let arc_entry = Arc::new(entry);
            let clone_entry = arc_entry.clone();

            thread::spawn(move || {
                let metadata = fs::metadata(clone_entry.path()).unwrap();
                if metadata.is_dir() {
                    copy(
                        clone_entry.path().to_str().unwrap().to_string(),
                        clone_dist
                            .join(clone_entry.file_name())
                            .to_str()
                            .unwrap()
                            .to_string(),
                    );
                }
                fs::copy(clone_entry.path(), dist_path.join(clone_entry.file_name()));
            });
        }
    }
    Ok(())
}
