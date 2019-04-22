extern crate lib;
use lib::get_img_buffer;

fn main() {
    let data = get_img_buffer("test.jpg");
    data.save("test1.jpg").unwrap();
}
