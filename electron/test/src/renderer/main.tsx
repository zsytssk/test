import * as React from 'react';
import * as ReactDom from 'react-dom';
import { default as styled } from 'styled-components';
import { initEvent } from './ipc';
import { PanelContextProvider } from './panel/context';
import { Group } from './panel/group';

const container = document.getElementById('app');
const { Component } = React;

const layout_data = {
  groups: [
    {
      children: [
        {
          panels: [
            { id: 'panel1', title: 'panel1', content: 'content1' },
            { id: 'panel2', title: 'panel2', content: 'content2' },
            { id: 'panel3', title: 'panel3', content: 'content3' },
          ],
        },
        {
          panels: [
            { id: 'panel4', title: 'panel4', content: 'content4' },
            { id: 'panel5', title: 'panel5', content: 'content5' },
            { id: 'panel6', title: 'panel6', content: 'content6' },
          ],
        },
      ],
      direction: 'vertical',
    },
  ],
} as LayoutData;

const client_width = window.innerWidth;
const client_height = window.innerHeight;

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: ${client_height}px;
`;

class App extends Component {
  public render() {
    const group_data = layout_data.groups[0];

    return (
      <Div>
        <PanelContextProvider>
          <Group
            width={client_width}
            height={client_height}
            left={0}
            top={0}
            layoutChildren={group_data.children}
            layoutDirection={group_data.direction}
          />
        </PanelContextProvider>
      </Div>
    );
  }
}

initEvent();
ReactDom.render(<App />, container);
