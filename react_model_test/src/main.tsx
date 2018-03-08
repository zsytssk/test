// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";

const State = [
  { id: 0, value: "zero" },
  { id: 1, value: "one" },
  { id: 2, value: "tow" },
  { id: 3, value: "three" },
  { id: 4, value: "four" }
];

const rootElement = document.getElementById("root");
class List extends React.Component<any, any> {
  render() {
    const state = this.props.state;
    return (
      <div className="list">
        {state.map(item => {
          return <Item key={item.id} children={item.value} />;
        })}
      </div>
    );
  }
}
class Item extends React.Component<any, any> {
  render() {
    return <div className="item" {...this.props} />;
  }
}

const element = <List state={State} />;
render(element, rootElement);
