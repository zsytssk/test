import * as React from "react";
import { render } from "react-dom";
import { Stage, Text } from "./react-laya/lib/index";

import TestUI = ui.test.TestPageUI;

// Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(null, onLoaded));

class App extends React.Component<any, any> {
  handleClick =() => {
    console.log(1);
    this.text.text="hello world";
  }
  text:any;
  render() {
    return (
    <Stage width="500" height="500" click={this.handleClick}>
      <Text ref={node=> this.text = node} text="sdfsdfsdf" color = "#ffffff"/>
    </Stage>
    );
  }
}
onLoaded();
function onLoaded(): void {
  // //实例UI界面
  var renderelement = document.getElementById("Laya");
  let app = <App/>;
  render(app, renderelement);
}
