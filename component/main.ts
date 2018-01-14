import { BaseEvent } from "./event";
import { Component } from "./component";
import { createRandomString } from "./utils";

class Person extends Component {
  children = [];
  constructor() {
    super();
    this.addComponents([new BaseEvent()]);
  }
  kidCount() {
    return this.children.length;
  }
}
class Test {
  private id = createRandomString();
  test() {
    console.log("test");
  }
}

class Man extends Person {
  constructor() {
    super();
    this.addComponents([new Test()]);
  }
}

let a = new Man();
let b = new Man();

type abc = typeof Man;
console.log(a.getComponents(BaseEvent));
console.log(b.getComponents(BaseEvent));
debugger;
