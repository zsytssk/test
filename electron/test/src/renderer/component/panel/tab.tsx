import * as React from 'react';
import { default as styled } from 'styled-components';
import { ImmutableType } from '../../test';
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

type Props = {
  panel: ImmutableType<PanelData>;
  setCur: (id: string) => void;
  removePanel: (id: string) => void;
  startDragPanel: (id: string) => void;
  endDragPanel: (id: string) => void;
};
export class Tab extends React.Component<Props, any> {
  private close = (event: React.FormEvent<HTMLElement>) => {
    event.stopPropagation();
    this.props.removePanel(this.props.panel.get('id'));
  }; // tslint:disable-line:semicolon
  private setCur = () => {
    this.props.setCur(this.props.panel.get('id'));
  }; // tslint:disable-line:semicolon
  private dragStart = (evt: React.DragEvent<HTMLElement>) => {
    const data = {
      id: this.props.panel.get('id'),
    };
    evt.dataTransfer.setData('dragtab', JSON.stringify(data));
    evt.dataTransfer.effectAllowed = 'move';
    this.props.startDragPanel(this.props.panel.get('id'));
  }; // tslint:disable-line:semicolon
  private dragEnd = (evt: React.DragEvent<HTMLElement>) => {
    const drop_effect = evt.dataTransfer.dropEffect;
    if (drop_effect === 'move') {
      this.props.endDragPanel(this.props.panel.get('id'));
    }
  }; // tslint:disable-line:semicolon
  public render() {
    return (
      <Div
        onClick={this.setCur}
        draggable={true}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
      >
        <i className="icon material-icons">insert_drive_file</i>
        <label>{this.props.panel.get('title')}</label>
        <i className="close material-icons" onClick={this.close}>
          close
        </i>
      </Div>
    );
  }
}
