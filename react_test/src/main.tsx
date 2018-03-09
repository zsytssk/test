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

class UserCompany extends React.Component<any, any> {
  state = { company: undefined, loaded: false };
  componentDidMount() {
    Axios({
      url: "https://api.github.com/graphql",
      method: "post",
      data: {
        query: `{
          user(login: "${this.props.username}") {
            company
          }
        }`
      },
      headers: {
        Authorization: `bearer 31aa2cf609b3e12548638d88adc7714d6a6220ac`
      }
    }).then(
      response => {
        this.setState({
          loaded: true,
          company: response.data.data.user.company
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    return this.state.loaded ? this.state.company || "UNknow" : "...";
  }
}
const username = "zsytssk";
const element = (
  <div>
    {`@${username} works at `}
    <UserCompany username={username} />
  </div>
);
render(element, rootElement);
