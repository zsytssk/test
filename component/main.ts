import { Component, ComponentWrap } from './component';
import { log } from './utils';

class Person extends ComponentWrap {
  private children = [];
  constructor() {
    super();
    this.addComponents([]);
  }
  protected kidCount() {
    return this.children.length;
  }
}

class Test extends Component {
  public test() {
    const wrap = this.wrap;
    wrap.trigger('click', { msg: 'this is a test1' });
  }
}

class Man extends Person {
  constructor() {
    super();
    this.addComponents([new Test()]);
  }
  public init() {
    this.on(
      'click',
      data => {
        log(data);
      },
      true,
    );
  }
}
