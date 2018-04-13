import * as React from 'react';
import { default as styled } from 'styled-components';

type PanelProps = {
  title: string;
  content: string;
};
// tslint:disable-next-line:variable-name
const Div = styled.div`
  color: #fff;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
`;
export class Panel extends React.Component<PanelProps, any> {
  public render() {
    return <Div>{this.props.content}</Div>;
  }
}
