var worker = new Worker("./test/wasm_worker.js");

fetch('./test/rust_wasm_webpack.wasm').then(response =>
    response.arrayBuffer()
).then(bytes =>
    WebAssembly.compile(bytes)
).then(mod => {
    return worker.postMessage(mod)
});