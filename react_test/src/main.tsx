// import * as React from "react";
import * as React from "react";
import { render } from "react-dom";

const rootElement = document.getElementById("root");

class NameForm extends React.Component<any, any> {
  componentDidMount() {
    console.log(this);
  }
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.inputNode.value);
  };
  inputNode: HTMLInputElement;
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="">
          name:
          <input
            type="text"
            name="username"
            ref={node => (this.inputNode = node)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const element = <NameForm />;
render(element, rootElement);
