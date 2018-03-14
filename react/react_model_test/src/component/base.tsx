import * as React from "react";
import { BaseModel } from "../model/baseModel";

type Props = {
  model: BaseModel;
};
export class BaseComponent<P extends Props, T> extends React.Component<P, T> {
  private bind_models = [] as FuncVoid[];
  componentWillUnmount() {
    for (let off of this.bind_models) {
      off();
    }
    this.bind_models = [];
  }
  listen = (events: string[], listener?: FuncVoid) => {
    const model = this.props.model;
    if (!listener) {
      listener = () => {
        this.forceUpdate();
      };
    }
    for (let event of events) {
      let { off } = model.on(event, listener);
      this.bind_models.push(off);
    }
  };
}
