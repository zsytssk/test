import * as React from "react";
import { BaseModel } from "../model/baseModel";

export interface BaseProps {
  model: BaseModel;
  parent?: BaseComponent<BaseProps, any>;
}
export class BaseComponent<P extends BaseProps, T> extends React.Component<
  P,
  T
  > {
  childs: BaseComponent<any, any>[] = [];
  componentDidMount() {
    const model = this.props.model;
    let parent = this.props.parent;
    if (!parent) {
      return;
    }
    parent.addChild(this);
  }
  listen = (events: string[], fun) => {
    for (let event of events) {
      this.props.model.on(event, fun);
    }
  }
  componentWillUnmount() {
    this.props.parent.removeChild(this);
  }
  addChild(child: BaseComponent<BaseProps, any>) {
    this.childs.push(child);
  }
  removeChild(child: BaseComponent<BaseProps, any>) {
    let index = this.childs.indexOf(child);
    if (index == -1) {
      return;
    }
    this.childs.splice(index, 1);
  }
}
