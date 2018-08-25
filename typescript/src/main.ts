function testable(Class): typeof Class {
  return (...args) => {
    console.log(args);
    return new Class(...args);
  };
}

@testable
class MyTestableClass {
  dd = 1;
  constructor(...args) {
    console.log(args);
  }
  // ...
}

const a = new MyTestableClass(1, 2, 3);
console.log(a.dd);
