import * as React from "react";
import { render } from "react-dom";
import { Stage, Text, Image, Button } from "./react-laya/lib/index";

class App extends React.Component<any, any> {
  state = {
    text: "default",
    img: "",
    rotate: 0,
    button: ""
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
          img: "comp/image.png",
          button: "comp/button.png"
        });
      })
    );
  }
  render() {
    let state = this.state;
    return (
      <Stage width="500" height="500" onClick={this.handleClick}>
        <Test
          skin={this.state.img}
          clickImage={this.clickImage}
          rotate={this.state.rotate}
        />
      </Stage>
    );
  }
}

type TestProps = {
  skin: string;
  rotate?: number;
  clickImage?: (any) => void;
};

class Test extends React.Component<TestProps, any> {
  componentDidMount() {
    console.log(this);
  }
  render() {
    return (
      <Image
        x={200}
        y={200}
        anchorX={0.5}
        anchorY={0.5}
        skin={this.props.skin}
        rotation={this.props.rotate}
        onClick={this.props.clickImage}
      />
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
