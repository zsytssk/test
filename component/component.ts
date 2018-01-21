type Comps = Component[];

interface ClassConstructor<T> extends Function {
  new (...any): T;
  prototype: T;
}

export class ComponentWrap {
  private components = [] as Comps;
  constructor(comps?: Component[]) {
    if (comps) {
      this.addComponents(comps);
    }
  }
  public getComponent<T extends Component>(creator: ClassConstructor<T>): T {
    const components = this.components;
    for (const item of components) {
      if (item instanceof creator) {
        return item;
      }
    }
  }
  public addComponents(comps: Component[]) {
    this.components = this.components.concat(comps);
    for (const comps_item of comps) {
      comps_item.bindWrap(this);
    }
  }
}
export class Component {
  protected wrap: ComponentWrap;
  public bindWrap(wrap: ComponentWrap) {
    this.wrap = wrap;
  }
}
