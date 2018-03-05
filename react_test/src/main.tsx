// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");
const content = "Hello World";

const element = <div className="container">{content}</div>;
render(element, rootElement);
