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
export function log(...args) {
  // tslint:disable-next-line:no-console
  console.log.apply(console, args);
}

export function extend(sub_class, super_class, name_sapce?) {
  for (const p in super_class) {
    if (super_class.hasOwnProperty(p)) {
      sub_class[p] = super_class[p];
    }
  }

  function __() {
    this.constructor = sub_class;
  }
  if (typeof sub_class === 'function' && typeof super_class === 'function') {
    sub_class.prototype =
      super_class === null
        ? Object.create(super_class)
        : ((__.prototype = super_class.prototype), new __());
  }

  if (name_sapce) {
    const arr_space = name_sapce.split('.');
    nameMap(arr_space, null, sub_class);
  }
  return sub_class;
}

export function nameMap(arr_space, obj, end_obj) {
  if (!obj) {
    obj = window;
  }
  if (arr_space.length === 1) {
    return (obj[arr_space[0]] = end_obj);
  }
  if (!obj[arr_space[0]]) {
    obj[arr_space[0]] = {};
  }
  return nameMap(arr_space.slice(1), obj[arr_space[0]], end_obj);
}
