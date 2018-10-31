use std::ffi::OsStr;
use std::fs::{self, create_dir_all};
use std::io::{Error, ErrorKind};
use std::path::Path;

pub enum CopyErr {
    io_err(Error),
    string_err(String),
}

pub type CopyResult = Result<(), CopyErr>;

pub fn copy<'a>(src: &'a str, dist: &'a str) -> CopyResult {
    let src_path = Path::new(src);
    let dist_path = Path::new(dist);

    if !src_path.exists() {
        let err_msg = format!("{:?} dont exists", src);
        return Err(CopyErr::string_err(err_msg));
    }

    if !dist_path.exists() {
        create_dir_all(&dist_path);
    }

    let items = match fs::read_dir(src_path) {
        Ok(val) => val,
        Err(e) => {
            return Err(CopyErr::io_err(e));
        }
    };

    for entry in items {
        println!("{:?}", entry);
    }

    Ok(())
}
