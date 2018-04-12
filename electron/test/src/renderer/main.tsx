import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Header } from './header';
import { emitToMain } from './ipc';
import { Panel } from './panel/main';
import { log } from './util';

const container = document.getElementById('app');
const { Component } = React;

class App extends Component {
  private getData = () => {
    emitToMain('test-getFolder').then(data => {
      log(data);
    });
  };
  public render() {
    return (
      <div>
        <Header />
        <Panel />
      </div>
    );
  }
}

ReactDom.render(<App />, container);
