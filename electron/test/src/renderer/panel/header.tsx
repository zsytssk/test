import * as React from 'react';
import { default as styled } from 'styled-components';

// tslint:disable-next-line:variable-name
const Div = styled.div`
  background-color: #252525;
  color: #c8c8c8;
  padding: 0 5px;
  height: 25px;
  line-height: 25px;
`;

export class Header extends React.Component {
  public render() {
    return (
      <Div>
        <label>header</label>
      </Div>
    );
  }
}
