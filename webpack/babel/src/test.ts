export function test() {
  console.log(new A());
}

class A {
  x: number = 3;
  constructor() {
    this.x = 1;
  }
}
