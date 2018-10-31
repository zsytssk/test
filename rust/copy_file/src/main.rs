extern crate mylib;

use std::ffi::OsStr;
use std::path::Path;

use mylib::*;

fn main() {
    copy(
        "C:/Users/zhangshiyang/Desktop/test/src",
        "C:/Users/zhangshiyang/Desktop/test/dist",
    );
    // let dist_path = Path::new("C:/Users/zhangshiyang/Desktop/test");
    // let src_path = Path::new("C:/Users/zhangshiyang/.vscode/extensions");
}
