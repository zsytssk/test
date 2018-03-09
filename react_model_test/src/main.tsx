// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";
import { BaseModel } from "./model/baseModel";

const State = [
  { id: 0, value: "zero" },
  { id: 1, value: "one" },
  { id: 2, value: "tow" },
  { id: 3, value: "three" },
  { id: 4, value: "four" }
];

const rootElement = document.getElementById("root");
type ItemInfo = {
  id: number;
  value: string;
};
class ListModel extends BaseModel {
  public list: ItemModel[] = [];
  public addItem(item_info: ItemInfo) {
    this.list.push(new ItemModel(item_info.id, item_info.value, this));
    this.trigger("addItem");
  }
  public removeItem(id: number) {
    const list = this.list;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id == id) {
        list.splice(i, 1);
      }
    }
    this.trigger("removeItem");
  }
}
class ItemModel extends BaseModel {
  constructor(
    public id: number,
    public value: string,
    private list: ListModel
  ) {
    super();
  }
  destroy() {
    this.list.removeItem(this.id);
  }
}

type ListProps = {
  model: ListModel;
};
type ListState = {
  num: number;
};

class List extends React.Component<ListProps, ListState> {
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
      <div className="list">
        num: {this.state.num}
        {model.list.map(item => {
          return <Item key={item.id} model={item} />;
        })}
      </div>
    );
  }
}

type ItemProps = {
  model: ItemModel;
  key: number;
};
class Item extends React.Component<ItemProps, any> {
  handleClick = () => {
    this.props.model.destroy();
  };
  render() {
    let model = this.props.model;
    return (
      <div className="item" onClick={this.handleClick}>
        {model.value}
      </div>
    );
  }
}

let listModel = new ListModel();

for (let state_item of State) {
  listModel.addItem(state_item);
}
const element = <List model={listModel} />;
render(element, rootElement);
