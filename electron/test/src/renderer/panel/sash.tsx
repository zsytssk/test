import * as React from 'react';
import { default as styled } from 'styled-components';

type Props = {
  width: number;
  height: number;
  left: number;
  top: number;
};

export class Sash extends React.Component<Props, any> {
  public render() {
    const { left, width, top, height, ...other } = this.props;
    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      cursor: ${left > top ? 'ew-resize' : 'ns-resize'};
      height: ${height}px;
      width: ${width}px;
      background-color: red;
      top: ${top}px;
      position: absolute;
      left: ${left}px;
    `;
    return <Div {...other} />;
  }
}
