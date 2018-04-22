import * as React from 'react';
import { default as styled } from 'styled-components';
import { Content } from './content';
import { PanelContextProvider } from './context';
import { Panel } from './panel';
import { Tab } from './tab';

type State = {
  cur_id?: string;
  drag_status?: boolean;
  contains: PanelData[];
};

type Props = {
  width: number;
  height: number;
  left: number;
  top: number;
  contains: PanelData[];
  panel_manager: PanelContextProvider;
};
export class Container extends React.Component<Props, State> {
  public state = { contains: [] } as State;
  public componentDidMount() {
    const contains = this.props.contains.map(item => {
      return { ...item };
    });
    const cur_id = contains[0].id;
    this.setState({ cur_id, contains });
  }
  public removePanel = (id: string) => {
    let { cur_id, contains } = this.state;

    const index = contains.findIndex(item => item.id === id);
    if (index === -1) {
      return;
    }
    if (id === cur_id) {
      if (index < contains.length - 1) {
        cur_id = contains[index + 1].id;
      } else {
        cur_id = contains[index - 1] ? contains[index - 1].id : '';
      }
    }

    contains = contains.filter(item => item.id !== id);
    this.setState({
      ...this.state,
      contains,
      cur_id,
    });
  }; // tslint:disable-line:semicolon
  public addPanel = (data: PanelData, is_cur?: boolean) => {
    const { contains } = this.state;
    const is_contained = contains.find(item => item.id === data.id);
    if (is_contained) {
      return;
    }
    const end_state = {} as {
      contains: PanelData[];
      cur_id: string;
    };
    end_state.contains = [...contains, data];

    if (is_cur) {
      end_state.cur_id = data.id;
    }
    this.setState({
      ...this.state,
      ...end_state,
    });

    return true;
  }; // tslint:disable-line:semicolon
  public setCur = (id: string) => {
    this.setState({ ...this.state, cur_id: id });
  }; // tslint:disable-line:semicolon
  public getPanel = (id: string) => {
    const { contains } = this.state;
    const panel_item = contains.find(item => item.id === id);
    if (!panel_item) {
      return;
    }
    return panel_item;
  }; // tslint:disable-line:semicolon
  public startDragPanel = (id: string) => {
    this.props.panel_manager.setMovePanel(id, this);
  }; // tslint:disable-line:semicolon
  public setDropPanel = () => {
    this.props.panel_manager.setTargetContainer(this);
  }; // tslint:disable-line:semicolon
  public endDragPanel = (id: string) => {
    this.props.panel_manager.movePanel();
  }; // tslint:disable-line:semicolon
  public render() {
    const { cur_id, contains } = this.state;
    const { width, height, top, left } = this.props;

    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      position: absolute;
      top: ${top}px;
      left: ${left}px;
      height: ${height}px;
      width: ${width}px;

      & > .header.tabs {
        background-color: #2e3440;
        color: #c8c8c8;
        height: 35px;
        line-height: 35px;
      }
      & > .con-container {
        height: calc(100% - 35px);
      }
    `;

    if (!contains.length) {
      return '';
    }
    return (
      <Div>
        <div className="header tabs title">
          {contains.map(contain => {
            const { content, ...props } = contain;
            return (
              <Tab
                removePanel={this.removePanel}
                startDragPanel={this.startDragPanel}
                endDragPanel={this.endDragPanel}
                setCur={this.setCur}
                key={contain.id}
                {...props}
              />
            );
          })}
        </div>
        <Content className="con-container" setDropPanel={this.setDropPanel}>
          {contains.map(contain => {
            if (contain.id !== cur_id) {
              return;
            }
            return <Panel key={contain.id} {...contain} />;
          })}
        </Content>
      </Div>
    );
  }
}
