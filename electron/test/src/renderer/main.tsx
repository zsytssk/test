import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Header } from './header';
import { initEvent } from './ipc';
import { Container } from './panel/container';
import { Panel } from './panel/panel';

const container = document.getElementById('app');
const { Component } = React;

const TEST_STATE = [
  { title: 'panel1', content: 'content1' },
  { title: 'panel2', content: 'content2' },
];

class App extends Component {
  public render() {
    return (
      <div>
        <Header />
        <Container>
          {TEST_STATE.map((item, index) => {
            return (
              <Panel key={index} title={item.title} content={item.content} />
            );
          })}
        </Container>
      </div>
    );
  }
}

initEvent();
ReactDom.render(<App />, container);
