import * as React from 'react';
import { default as styled } from 'styled-components';
import { ImmutableType } from '../../test';

type Props = {
  panel: ImmutableType<PanelData>;
};

// tslint:disable-next-line:variable-name
const Div = styled.div`
  width: 100%;
  color: #fff;
  padding: 0 10px 0 20px;
  line-height: 25px;
  position: relative;
`;

export function WrapDom(props) {
  return <Div {...props} />;
}

export class Panel<P> extends React.Component<Props, any> {
  public render(): any {
    const { panel } = this.props;
    return <Div>{panel.get('content')}</Div>;
  }
}
