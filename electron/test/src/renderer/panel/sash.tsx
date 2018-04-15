import * as React from 'react';
import { default as styled } from 'styled-components';

type Props = {
  left: number;
};

export class Sash extends React.Component<Props, any> {
  public render() {
    const { left, ...other } = this.props;
    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      cursor: ew-resize;
      height: 100%;
      width: 5px;
      background-color: red;
      top: 0px;
      position: absolute;
      left: ${left}px;
    `;
    return <Div {...other} />;
  }
}
