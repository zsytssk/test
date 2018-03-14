import * as React from "react";
import { ListModel, ItemModel } from "./model";
import { BaseComponent } from "./component/base";

type Props = {
  model: ItemModel;
  key: string;
};
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
    this.listen(["change", "removeItem"]);
  }
  render() {
    let model = this.props.model;
    return (
      <div className="item" style={{ margin: "10px 0" }}>
        {model.value}
        <input
          type="text"
          ref={node => (this.inputNode = node)}
          style={{ margin: "0 10px", width: "50px" }}
        />
        <button onClick={this.changeValue}>change</button>
        <button onClick={this.removeModel} style={{ marginLeft: "-1px" }}>
          -
        </button>
      </div>
    );
  }
}
