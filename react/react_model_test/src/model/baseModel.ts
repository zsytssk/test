import { BaseEvent } from "./event";

/**
 * 所有的Model的基类, 上面绑定基本对相应的ctrl绑定取消绑定的处理
 * @class BaseModel
 * @extends {BaseEvent}
 */
export class BaseModel extends BaseEvent {
  name: string = "base_model";
  constructor() {
    super();
  }
  public init() {}
  /**去除所有的事件, 取消绑定ctrl*/
  public destroy() {
    this.trigger("destroy");

    super.destroy();
  }
  /**redux中显示model的数据数据 */
  public getState() {
    return;
  }
  /**触发redux更新状态的事件 */
  public getActionInfo() {
    return {};
  }
}
