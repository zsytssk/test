import * as React from 'react';
import { render } from 'react-dom';
import { Header } from './header';
import { Panel } from './panel';

const conainer = document.getElementById('app');

class App extends React.Component {
  public render() {
    return (
      <div>
        <Header />
        <Panel />
      </div>
    );
  }
}

render(<App />, conainer);
