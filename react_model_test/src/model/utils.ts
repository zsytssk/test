export function createRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

export function isFunc(func: FuncVoid): boolean {
  return func && typeof func === "function";
}
export function callFunc(func: FuncVoid) {
  if (!isFunc(func)) {
    return;
  }
  func();
}
export function log(arg) {
  // tslint:disable-next-line:no-console
  console.log(arg);
}
