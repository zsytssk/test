import { BaseEvent } from "./event";

@addCO(BaseEvent)
class Person {
  children = [];
  constructor() {}
  kidCount() {
    return this.children.length;
  }
  getComponent(i) {}
}

type Comps = {
  create: any;
  instance?: any;
}[];

function addCO(co_class) {
  return function(target) {
    let components = [] as Comps;
    components.push({
      create: co_class
    });

    target.initCO = function() {
      this._components = components;
      this.getComp = getComponent;
      initComponent();
    };

    function getComponent(create) {
      for (let i = 0; i < components.length; i++) {
        let item = components[i];
        console.log(item.create == create);
        if (item.create == create) {
          if (!item.instance) {
            item.instance = new item.create();
          }
          return item.instance;
        }
      }
    }
    function initComponent() {
      for (let i = 0; i < components.length; i++) {
        let item = components[i];
        if (!item.instance) {
          item.instance = new item.create();
        }
      }
    }
  };
}

let a = new Person();
debugger;
console.log(a.getComponent(BaseEvent));
