import * as React from 'react';
import { default as styled } from 'styled-components';
import { getNodeOffset } from '../../util';

type Props = {
  index: number;
  width: number;
  height: number;
  left: number;
  top: number;
  mouseDown: (...any) => void;
};

type State = {
  index: number;
  width: number;
  height: number;
  left: number;
  top: number;
};

export class Sash extends React.Component<Props, State> {
  public state = {} as State;
  // tslint:disable-next-line:variable-name
  public static getDerivedStateFromProps(nextProps: Props, _prevState: State) {
    const { left, width, top, height, index } = nextProps;
    return { left, width, top, height, index };
  }
  private mouseDown = evt => {
    this.props.mouseDown(evt, this.state.index);
  };
  public render() {
    const { left, width, top, height, ...other } = this.state;
    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      cursor: ${left > top ? 'ew-resize' : 'ns-resize'};
      height: ${height}px;
      width: ${width}px;
      background-color: red;
      top: ${top}px;
      position: absolute;
      left: ${left}px;
      z-index: 10;
    `;
    return <Div {...other} onMouseDown={this.mouseDown} />;
  }
}
