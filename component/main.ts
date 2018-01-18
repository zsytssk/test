import { Component, ComponentWrap } from './component';
import { BaseEvent } from './event';
import { createRandomString, log } from './utils';

class Person extends ComponentWrap {
  private children = [];
  constructor() {
    super();
    this.addComponents([new BaseEvent()]);
  }
  protected kidCount() {
    return this.children.length;
  }
}

class Test extends Component {
  public test() {
    const event_com = this.wrap.getComponent(BaseEvent) as BaseEvent;
    event_com.trigger('click', { msg: 'this is a test1' });
  }
}

class Man extends Person {
  constructor() {
    super();
    this.addComponents([new BaseEvent(), new Test()]);
  }
  public init() {
    const event_cmp = this.getComponent(BaseEvent) as BaseEvent;
    event_cmp.on(
      'click',
      data => {
        log(data);
      },
      true,
    );
  }
  public bindOtherEvent(other: Man) {
    const this_event_cmp = this.getComponent(BaseEvent) as BaseEvent;
    const other_event_cmp = other.getComponent(BaseEvent) as BaseEvent;
    this_event_cmp.bindOtherEvent(
      other_event_cmp,
      'click',
      data => {
        log(data);
      },
      true,
    );
  }
}

const a = new Man();
const b = new Man();
a.init();

a.bindOtherEvent(b);
(b.getComponent(Test) as Test).test();
(b.getComponent(Test) as Test).test();
