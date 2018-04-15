import * as React from 'react';
import { default as styled } from 'styled-components';

type Props = {
  id: string;
  title: string;
  content: string;
};

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: 100%;
  width: 100%;
  color: #fff;
  padding: 0 5px;
  line-height: 25px;
`;
export class Panel extends React.Component<Props, any> {
  public render() {
    const { content, ...other } = this.props;
    return <Div {...other}>{content}</Div>;
  }
}
