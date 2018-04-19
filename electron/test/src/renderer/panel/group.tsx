import * as React from 'react';
import { default as styled } from 'styled-components';
import { Container } from './container';

const w_h = window.innerHeight;
const w_w = window.innerWidth;

type State = {};

type Props = {
  layoutDirection: GroupDirection;
  layoutChildren: ContainerData[] | GroupDirection[];
  wrapDirection?: GroupDirection;
  wrapRadio?: number;
};

// tslint:disable-next-line:variable-name

export class Group extends React.Component<Props, State> {
  public render() {
    let {
      wrapRadio,
      wrapDirection,
      layoutChildren,
      layoutDirection,
    } = this.props;

    wrapDirection = wrapDirection || 'horizontal';
    wrapRadio = wrapRadio || 1;

    const w = wrapDirection === 'horizontal' ? wrapRadio * 100 + '%' : '100%';
    const h = wrapDirection === 'horizontal' ? '100%' : wrapRadio * 100 + '%';

    const Div = styled.div`
      position: absolute;
      height: ${h}px;
      width: ${w};
    `;
    return <Div />;
  }
}
