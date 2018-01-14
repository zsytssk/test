export function createRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
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
