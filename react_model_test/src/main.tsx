// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";
import { ListModel, ItemModel } from "./model";

import { BaseComponent } from "./component/base";
import { Item } from "./item";
import { ListForm } from "./form";
const rootElement = document.getElementById("root");

type ListProps = {
  model: ListModel;
};

type ListState = {
  num: number;
};

class List extends BaseComponent<ListProps, ListState> {
  state = {
    num: this.props.model.list.length
  } as ListState;
  updateState = () => {
    this.setState({
      num: this.props.model.list.length
    });
  };
  componentDidMount() {
    const model = this.props.model;
    model.on("addItem", () => {
      this.updateState();
    });
    model.on("removeItem", () => {
      this.updateState();
    });
  }

  render() {
    const model = this.props.model;
    return (
      <div>
        num: {this.state.num}
        <ListForm model={model} />
        <div className="list">
          {model.list.map(item => {
            return <Item key={item.id} model={item} />;
          })}
        </div>
      </div>
    );
  }
}

let listModel = new ListModel();

const element = <List model={listModel} />;
render(element, rootElement);
