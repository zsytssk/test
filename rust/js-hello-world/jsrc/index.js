import { greet, wasmBooted } from "../src/lib.rs";

wasmBooted.then(() => {
  greet("world");
});
