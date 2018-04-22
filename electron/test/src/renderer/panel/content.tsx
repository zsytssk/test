import * as React from 'react';
import { default as styled } from 'styled-components';
import { getNodeOffset } from '../util';

export type DragStatus = 'full' | 'left' | 'right' | 'default';
type State = {
  drag_status: DragStatus;
};

// tslint:disable-next-line:variable-name
const Div = styled.div`
  position: relative;

  & > .dragSign {
    position: absolute;
    background-color: rgba(59, 66, 82, 0.6);
    height: 100%;
    width: 100%;
    visibility: hidden;
  }
  & > .dragSign.show {
    visibility: visible;
  }
  & > .dragSign.left {
    width: 50%;
  }
  & > .dragSign.right {
    width: 50%;
    right: 0;
  }
  & > * {
    pointer-events: none;
  }
`;
type Props = {
  setDropPanel: () => void;
  className: string;
};
export class Content extends React.Component<Props, State> {
  public state = {
    drag_status: 'default',
  } as State;
  private setDragStatus = (status: DragStatus) => {
    if (this.state.drag_status === status) {
      return;
    }
    this.setState({
      ...this.state,
      drag_status: status,
    });
  }; // tslint:disable-line:semicolon
  private drop = (evt: React.DragEvent<HTMLElement>) => {
    const type = evt.dataTransfer.types[0];
    const data = JSON.parse(evt.dataTransfer.getData('dragtab'));
    if (type !== 'dragtab') {
      return false;
    }
    this.props.setDropPanel();
    this.setDragStatus('default');
  }; // tslint:disable-line:semicolon
  private dragOver = (evt: React.DragEvent<HTMLElement>) => {
    evt.preventDefault();
    const offset = getNodeOffset(this.node);
    const x = evt.pageX - offset.left;
    const y = evt.pageY - offset.top;
    const w = this.node.offsetWidth;
    const h = this.node.offsetHeight;

    if (x < w / 4) {
      this.setDragStatus('left');
    } else if (x > w * 3 / 4) {
      this.setDragStatus('right');
    } else {
      this.setDragStatus('full');
    }
  }; // tslint:disable-line:semicolon
  private dragEnter = (evt: React.DragEvent<HTMLElement>) => {
    evt.preventDefault();
    const type = evt.dataTransfer.types[0];

    if (type !== 'dragtab') {
      return false;
    }
    this.setDragStatus('full');
  }; // tslint:disable-line:semicolon
  private dragLeave = (evt: React.DragEvent<HTMLElement>) => {
    evt.preventDefault();

    this.setDragStatus('default');
  }; // tslint:disable-line:semicolon
  private node: HTMLElement;
  public render() {
    const { children, ...other } = this.props;
    const { drag_status } = this.state;
    const show_class = drag_status !== 'default' ? 'show' : '';
    const position_class = drag_status || '';
    return (
      <Div
        innerRef={node => (this.node = node)}
        onDrop={this.drop}
        onDragOver={this.dragOver}
        onDragLeave={this.dragLeave}
        onDragEnter={this.dragEnter}
        {...other}
      >
        <div className={`dragSign ${show_class} ${position_class}`} />
        {this.props.children}
      </Div>
    );
  }
}
