import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { PanelContextProvider } from './panel/context';
import { Group } from './panel/group';

const { Component } = React;

const client_width = window.innerWidth;
const client_height = window.innerHeight;

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: ${client_height}px;
`;

type Props = {
  layout_data: GroupData;
};

export class App extends Component<Props, any> {
  public render() {
    const { layout_data } = this.props;

    return (
      <Div>
        <PanelContextProvider>
          <Group
            width={client_width}
            height={client_height}
            left={0}
            top={0}
            layoutChildren={layout_data.children}
            layoutDirection={layout_data.direction}
          />
        </PanelContextProvider>
      </Div>
    );
  }
}

const mapStateToProps = (state: StoreState) => {
  const { layout_data } = state;

  return {
    layout_data,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectApp = connect(mapStateToProps)(App);
