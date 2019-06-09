import * as React from "react";
import { ListModel } from "./model";
import { createRandomString } from "./model/utils";
import { BaseComponent } from "./component/base";

type Props = {
  model: ListModel;
};
export class ListForm extends BaseComponent<Props, any> {
  addItem = event => {
    event.preventDefault();
    const value = this.inputNode.value;
    if (value === "") {
      return;
    }

    this.props.model.addItem({
      id: createRandomString(),
      value: this.inputNode.value
    });

    this.inputNode.value = "";
  };
  inputNode: HTMLInputElement;
  render() {
    return (
      <form onSubmit={this.addItem}>
        <input type="text" ref={node => (this.inputNode = node)} />{" "}
        <input type="submit" />
      </form>
    );
  }
}
