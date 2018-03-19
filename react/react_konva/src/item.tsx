import * as React from "react";
import { ListModel, ItemModel } from "./model";
import { BaseComponent, BaseProps } from "./component/base";
import { List } from "./main";
import { Stage, Layer, Rect, Text } from 'react-konva';

interface Props extends BaseProps {
  model: ItemModel;
  parent: List;
  x: number,
  y: number,
}
type State = {
  value: string;
};

export class Item extends BaseComponent<Props, State> {
  state = {} as State;

  inputNode: HTMLInputElement;
  removeModel = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    this.props.model.destroy();
  };
  changeValue = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    let model = this.props.model;
    let value = this.inputNode.value;
    if (!value) {
      return;
    }
    model.changeValue(value);
    this.inputNode.value = "";
  };
  componentDidMount() {
    const model = this.props.model;
    model.on("change", value => {
      this.forceUpdate();
    });
    super.componentDidMount();
  }
  handleClick = () => {
    this.props.model.destroy();
  };
  render() {
    let model = this.props.model;
    return (
      <Rect
            x={this.props.x}
            y={this.props.y}
            width={50}
            height={50}
            fill='green'
            shadowBlur={5}
            onClick={this.handleClick}
          />
    );
  }
}
