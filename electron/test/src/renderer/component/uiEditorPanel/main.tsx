import * as React from 'react';
import { default as styled } from 'styled-components';
import { Panel, WrapDom } from '../panel/panel';

type State = {};

// tslint:disable-next-line:variable-name
const Canvas = styled.canvas`
  width: 500px;
  height: 300px;
  background: red;
`;

export class UiEditorPanel extends Panel<State> {
  public state = {} as State;
  public componentDidMount() {}
  public render() {
    return (
      <WrapDom>
        <Canvas />
      </WrapDom>
    );
  }
}
