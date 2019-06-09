export function createRandomString() {
  return Math.random()
    .toString()
    .replace("0.", "");
}

export function isFunc(func: Function): boolean {
  return func && typeof func == "function";
}
export function callFunc(func: Function) {
  if (!isFunc(func)) {
    return;
  }
  func();
}

export function log(arg) {
  console.log(arg);
}
