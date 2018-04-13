import * as React from 'react';
import { default as styled } from 'styled-components';
import { Panel } from './panel';
import { Tab } from './tab';

// tslint:disable-next-line:variable-name
const Div = styled.div`
  & > .header.tabs {
    background-color: #2e3440;
    color: #c8c8c8;
    height: 35px;
    line-height: 35px;
  }
  & > container {
    height: calc(100% - 35px);
  }
`;

export class Container extends React.Component {
  public render() {
    const panels = this.props.children;
    return (
      <Div>
        <div className="header tabs title">
          {panels.map((item, index) => {
            return <Tab key={index} title={item.props.title} />;
          })}
        </div>
        <div className="con-container">{this.props.children}</div>
      </Div>
    );
  }
}
