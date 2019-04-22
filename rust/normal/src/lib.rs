extern crate image;
extern crate tokio;
use image::{load_from_memory_with_format, DynamicImage, ImageFormat};
use std::sync::{Arc, Mutex};
use tokio::prelude::{AsyncRead, Future};

pub fn get_img_buffer(path: &str) -> DynamicImage {
    let img_data = Arc::new(Mutex::new(vec![]));
    let data_clone = Arc::clone(&img_data);
    let task = tokio::fs::read(path.to_owned())
        .map(move |data| {
            let mut data_ref = data_clone.lock().unwrap();
            *data_ref = data;
        })
        .map_err(|e| {
            eprintln!("IO error: {:?}", e);
        });
    tokio::run(task);

    let data_clone = Arc::clone(&img_data);
    let data = data_clone.lock().unwrap();
    load_from_memory_with_format(&data, ImageFormat::JPEG).unwrap()
}
