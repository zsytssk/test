// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");

function Message({ message }) {
  return <div>{message ? message : "no message"}</div>;
}

const element = <Message message={null} />;
render(element, rootElement);
