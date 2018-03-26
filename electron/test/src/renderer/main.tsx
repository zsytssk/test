import { ipcRenderer } from 'electron';
import * as React from 'react';
import { render } from 'react-dom';
import { test } from './test';

const conainer = document.getElementById('app');

class App extends React.Component {
  public render() {
    return <div />;
  }
}

render(<App />, conainer);
