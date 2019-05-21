extern crate js_sys;

use wasm_bindgen::prelude::*;

extern "C" {

}

#[wasm_bindgen]
pub fn greet() {
    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");
    let header = document.get_element_by_id("greeting").unwrap();
    header.set_inner_html("hello");
    web_sys::console::log(&js_sys::Array::from(&JsValue::from_str("test")))
}