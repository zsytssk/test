import { createElement } from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");

const element = createElement("div", {
  className: "container",
  children: "Hello World"
});
render(element, rootElement);
