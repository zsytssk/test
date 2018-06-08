import { TestClass1 } from './class1';

export class TestClass2 {
  private test: TestClass1;
  constructor(x: number, y: number) {
    this.test = new TestClass1();
    this.test.setXY(x, y);
  }
}
