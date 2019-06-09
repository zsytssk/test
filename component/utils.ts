export function createRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

export function isFunc(func: () => void): boolean {
  return func && typeof func === 'function';
}
export function callFunc(func: () => void) {
  if (!isFunc(func)) {
    return;
  }
  func();
}
export function log(arg) {
  // tslint:disable-next-line:no-console
  console.log(arg);
}
