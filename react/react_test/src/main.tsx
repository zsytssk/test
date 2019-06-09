// import * as React from "react";
import * as React from "react";

import { render } from "react-dom";

type AppState = {
  count: number;
  changeCount: () => void;
};
class App extends React.Component<any, AppState> {
  testRef = React.createRef();
  componentDidMount() {
    console.log(this.testRef.current);
  }
  change = () => {
    console.log(this.testRef.current);
  };
  render() {
    return (
      <div>
        <React.StrictMode>
          <div>
            {/* <MyComponent ref={this.testRef} change={this.onChange} /> */}
            <MyComponentWrapRef ref={this.testRef} change={this.change} />
          </div>
        </React.StrictMode>
      </div>
    );
  }
}

class MyComponent extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return <input type="text" onChange={this.props.change} />;
  }
}

function WrapRef(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}

const MyComponentWrapRef = WrapRef(MyComponent);

const rootElement = document.getElementById("root");
const element = <App />;
render(element, rootElement);
