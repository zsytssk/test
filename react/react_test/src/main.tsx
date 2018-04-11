// import * as React from "react";
import * as React from "react";

import { render } from "react-dom";
import { default as Axios } from "axios";

let ThemeContext = React.createContext("light");

type AppState = {
  count: number;
  changeCount: () => void;
};
class App extends React.Component<any, AppState> {
  changeCount = () => {
    this.setState({ ...this.state, count: this.state.count + 1 });
  };
  state = { count: 1, changeCount: this.changeCount };
  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Item />
      </ThemeContext.Provider>
    );
  }
}

class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function Item() {
  return (
    <ThemeContext.Consumer>
      {(value: AppState) => (
        <button onClick={value.changeCount}>{value.count}</button>
      )}
    </ThemeContext.Consumer>
  );
}

const rootElement = document.getElementById("root");
const element = <App />;
render(element, rootElement);
