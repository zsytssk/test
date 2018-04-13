import * as React from 'react';
import { default as styled } from 'styled-components';

// tslint:disable-next-line:variable-name
const Div = styled.div`
  padding: 0 5px;
  height: 100%;
  line-height: 35px;
  float: left;
  background: rgb(59, 66, 82);
  border-left-color: rgba(59, 66, 82, 0);
  box-shadow: rgba(136, 192, 208, 0) 0px -1px inset;
  cursor: pointer;
  margin-right: 1px;
  & > * {
    cursor: pointer;
    user-select: none;
    margin-right: 5px;
  }

  & > i {
    vertical-align: middle;
    font-size: 14px;
  }
  & > .icon {
    color: #e22;
  }
  & > .close {
    visibility: hidden;
  }
  &:hover > .close {
    visibility: visible;
  }
`;

type TabProps = {
  title: string;
};
export class Tab extends React.Component<TabProps, any> {
  public render() {
    return (
      <Div>
        <i className="icon material-icons">insert_drive_file</i>
        <label>{this.props.title}</label>
        <i className="close material-icons">close</i>
      </Div>
    );
  }
}
