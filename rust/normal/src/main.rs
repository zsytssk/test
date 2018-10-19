// extern crate mylib;

// use std::process;

// use mylib::*;
// use std::env;

// fn main() {
//     let a = "sdsdf";
//     let args: Vec<String> = env::args().collect();

//     match search(&args) {
//         Ok(val) => println!("{:?}", val),
//         Err(e) => {
//             println!("{:?}", e);
//         }
//     }
// }

// invalid

// invalid
// invalid
fn copy_to_new_vec<'a>(vec: &Vec<String>, othervec: &'a mut Vec<String>) -> &'a mut Vec<String> {
    othervec.push(vec.get(1).unwrap().to_string());
    return othervec;
}

fn main() {
    let vec = vec![String::from("hello"), String::from("world")];
    let newvec = copy_to_new_vec(&vec, &mut Vec::new());
    newvec.get(1);
}
