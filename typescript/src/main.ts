import { BaseEvent } from "./event";

function inject(comp) {
  return function(Class): typeof Class {
    return (...args) => {
      const a = new Class(...args);
      comp(a);
      return a;
    };
  };
}

class ClassB {
  target: BaseEvent;
  constructor(target: BaseEvent) {
    this.target = target;

    this.init();
  }
  private init() {
    const { target } = this;
    target.on("destroy", () => {
      this.unBindCtrl();
    });

    this.bindCtrl();
  }
  private bindCtrl() {
    const { target } = this;
    target.on("destroy", () => {
      this.unBindCtrl();
    });
  }
  private unBindCtrl() {}
}

interface B {
  bindCtrl(): void;
}

@inject(ClassB)
class CtrlA extends BaseEvent {
  dd = 1;
  components = [];
  constructor(...args) {
    super();
    console.log(args);
  }
  // ...
}

const a = new CtrlA(1, 2, 3);
console.log(a);
