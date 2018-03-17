// import * as React from "react";
import * as React from "react";

import { render } from "react-dom";
import { default as Axios } from "axios";

const State = [
  { id: 0, value: "zero" },
  { id: 1, value: "one" },
  { id: 2, value: "tow" },
  { id: 3, value: "three" },
  { id: 4, value: "four" }
];

const rootElement = document.getElementById("root");
class ErrorBoundary extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }
  render() {
    return [<p key="first">ReactJS </p>, <li key="first">ReactJS </li>];
  }
}
const element = (
  <div>
    <ErrorBoundary>
      <div />
    </ErrorBoundary>
  </div>
);
render(element, rootElement);
