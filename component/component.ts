type Comps = ComponentWrap[];

export class ComponentWrap {
  private components = [] as Comps;
  constructor(comps?: ComponentWrap[]) {
    if (comps) {
      this.components = comps;
    }
  }
  public getComponents<T>(creator: any): ComponentWrap {
    let components = this.components;
    for (let i = 0; i < components.length; i++) {
      let item = components[i];
      if (item instanceof creator) {
        return item;
      }
    }
  }
  public addComponents(comps: ComponentWrap[]) {
    this.components = this.components.concat(comps);
  }
}
export class Component {
  wrap: ComponentWrap;
  public bindWrap(wrap: ComponentWrap) {
    this.wrap = wrap;
  }
}
