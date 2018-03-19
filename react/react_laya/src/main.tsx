import * as React from "react";
import { render } from "react-dom";
import { Stage, Text, Image } from "./react-laya/lib/index";

import TestUI = ui.test.TestPageUI;

class App extends React.Component<any, any> {
  state = {
    text: "default",
    img: "",
    rotate: 0
  };
  interval: any;
  handleClick = () => {
    this.setState({
      text: "hello world"
    });
  };
  clickImage = event => {
    event.stopPropagation();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.setState({
        rotate: this.state.rotate + 10
      });
    }, 16);
  };
  text: any;
  componentDidMount() {
    Laya.loader.load(
      "res/atlas/comp.atlas",
      Laya.Handler.create(null, () => {
        this.setState({
          img: "comp/image.png"
        });
      })
    );
  }
  render() {
    let state = this.state;
    return (
      <Stage width="500" height="500" onClick={this.handleClick}>
        <Text
          ref={node => (this.text = node)}
          text={this.state.text}
          color="#ffffff"
        />
        <Image
          x={200}
          y={200}
          anchorX={0.5}
          anchorY={0.5}
          skin={this.state.img}
          rotation={this.state.rotate}
          onClick={this.clickImage}
        />
      </Stage>
    );
  }
}
function onLoaded(): void {
  // //实例UI界面
  var renderelement = document.getElementById("Laya");
  let app = <App />;
  render(app, renderelement);
}

onLoaded();
