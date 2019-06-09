import * as React from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text } from "react-konva";
import * as Konva from "konva";

import { ListModel, ItemModel } from "./model";
import { BaseComponent, BaseProps } from "./component/base";
import { Item } from "./item";

interface Props extends BaseProps {
  model: ListModel;
}
type ListState = {
  num: number;
};
export class List extends BaseComponent<Props, ListState> {
  updateState = () => {
    this.setState({
      num: this.props.model.list.length
    });
  };
  componentDidMount() {
    const model = this.props.model;
    this.listen(["addItem", "removeItem"], () => {
      this.updateState();
    });
  }
  render() {
    const model = this.props.model;
    return (
      <Layer ref={node => console.log(node)}>
        <Text text="Try click on rect" />
        {model.list.map((item, index) => {
          return (
            <Item
              x={100 * index}
              y={20}
              key={item.id}
              model={item}
              parent={this}
            />
          );
        })}
      </Layer>
    );
  }
}

let listModel = new ListModel();
listModel.addItem({ id: "1", value: "1" });
listModel.addItem({ id: "2", value: "2" });
listModel.addItem({ id: "3", value: "3" });

class App extends React.Component {
  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <List model={listModel} />
      </Stage>
    );
  }
}
render(<App />, document.getElementById("root"));
