// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");
type State = {
  lapse: number;
  running: boolean;
};
class StopWatch extends React.Component<State, State> {
  timer: number;
  state = { lapse: 0, running: false };
  handleRunClick = () => {
    const startTime = Date.now() - this.state.lapse;
    this.setState(state => {
      if (!state.running) {
        this.timer = setInterval(() => {
          this.setState({ lapse: Date.now() - startTime });
        }, 1);
      } else {
        clearInterval(this.timer);
      }
      return { running: !state.running };
    });
  };
  handleClearClick = () => {
    clearInterval(this.timer);
    this.setState({ lapse: 0, running: false });
  };
  render() {
    const { lapse, running } = this.state;
    return (
      <div>
        <label>{`${lapse}ms`}</label>
        <button onClick={this.handleRunClick}>
          {running ? "stop" : "start"}
        </button>
        <button onClick={this.handleClearClick}>clear</button>
      </div>
    );
  }
}
const element = <StopWatch lapse={0} running={false} />;

render(element, rootElement);
