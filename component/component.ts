type Comps = any[];

export class Component {
  private components = [] as Comps;
  constructor(comps?: any[]) {
    if (comps) {
      this.components = comps;
    }
  }
  public getComponents<T>(creator: typeof T): T {
    let components = this.components;
    for (let i = 0; i < components.length; i++) {
      let item = components[i];
      if (item instanceof creator) {
        return item;
      }
    }
  }
  public addComponents(comps: any[]) {
    this.components = this.components.concat(comps);
  }
}
