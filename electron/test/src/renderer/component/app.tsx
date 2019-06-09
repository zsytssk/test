import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { ImmutableType } from '../test';
import { PanelContextProvider } from './panel/context';
import { ConnectGroup } from './panel/group';

const { Component } = React;

const client_width = window.innerWidth;
const client_height = window.innerHeight;

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: ${client_height}px;
`;

type Props = {
  layout_data: ImmutableType<GroupData>;
};

export class App extends Component<Props, any> {
  public render() {
    const { layout_data } = this.props;

    return (
      <Div>
        <PanelContextProvider>
          <ConnectGroup
            width={client_width}
            height={client_height}
            left={0}
            top={0}
            layoutData={layout_data}
          />
        </PanelContextProvider>
      </Div>
    );
  }
}

const mapStateToProps = (state: ImmutableType<StoreState>) => {
  const layout_data = state.get('layout_data');

  return {
    layout_data,
  };
};

// tslint:disable-next-line:variable-name
export const ConnectApp = connect(mapStateToProps)(App);
