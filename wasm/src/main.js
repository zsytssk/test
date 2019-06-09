// var worker = new Worker("wasm_worker.js");

// import('../src/lib.rs').then(response =>
//   response.arrayBuffer()
// ).then(bytes =>
//   WebAssembly.compile(bytes)
// ).then(mod =>
//   worker.postMessage(mod)
// );