import * as React from "react";
import { render } from "react-dom";
import { initState } from "./react-laya";

import TestUI = ui.test.TestPageUI;

initState({ width: 600, height: 500 });
Laya.loader.load("res/atlas/comp.atlas", Laya.Handler.create(null, onLoaded));

class TestComponent extends React.Component<any, any> {
  render() {
    return <div />;
  }
}

function onLoaded(): void {
  // //实例UI界面
  var renderelement = document.getElementById("layaContainer");
  let App = <TestComponent className="yes" />;
  render(App, renderelement);
}
