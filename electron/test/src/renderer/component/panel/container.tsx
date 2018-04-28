import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { addPanel, removePanel } from '../../actions/actions';
import { ImmutableType } from '../../test';
import { Content, DragStatus } from './content';
import { PanelContextProvider } from './context';
import { Panel } from './panel';
import { Tab } from './tab';

type State = {
  cur_id?: string;
  drag_status?: boolean;
  panels: ImmutableType<PanelData[]>;
};

type Props = {
  width: number;
  height: number;
  left: number;
  top: number;
  panel_manager: PanelContextProvider;
  layoutData: ImmutableType<ContainerData>;
  index: number;
  groupContainer: (...any) => any;
  removePanel: (...any) => any;
  addPanel: (...any) => any;
};
export class Container extends React.Component<Props, State> {
  public state = { panels: [] as any } as State;
  // tslint:disable-next-line:variable-name
  public static getDerivedStateFromProps(nextProps, _prevState) {
    const panels = nextProps.layoutData.get('panels');
    const cur_id = _prevState.cur_id || panels.get(0).id;
    return { cur_id, panels };
  }
  public removePanel = (id: string) => {
    const { panels } = this.state;
    this.props.removePanel(
      this.props.layoutData,
      panels.find(item => item.id === id),
    );
  }; // tslint:disable-line:semicolon
  public addPanel = (data: PanelData, is_cur?: boolean) => {
    const { panels } = this.state;
    this.props.addPanel(this.props.layoutData, data);
  }; // tslint:disable-line:semicolon
  public setCur = (id: string) => {
    this.setState({ ...this.state, cur_id: id });
  }; // tslint:disable-line:semicolon
  public getPanel = (id: string) => {
    const { panels } = this.state;
    const panel_item = panels.find(item => item.id === id);
    if (!panel_item) {
      return;
    }
    return panel_item;
  }; // tslint:disable-line:semicolon
  public startDragPanel = (id: string) => {
    this.props.panel_manager.setMovePanel(id, this);
  }; // tslint:disable-line:semicolon
  public setDropPanel = (drag_status: DragStatus) => {
    this.props.panel_manager.setTargetContainer(this, drag_status);
  }; // tslint:disable-line:semicolon
  public endDragPanel = () => {
    this.props.panel_manager.movePanel();
  }; // tslint:disable-line:semicolon
  public groupContainer = (direction, panel_data: PanelData) => {
    this.props.groupContainer(this.props.index, direction, panel_data);
  }; // tslint:disable-line:semicolon
  public render() {
    const { cur_id, panels } = this.state;
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

    if (!panels.size) {
      return '';
    }
    return (
      <Div>
        <div className="header tabs title">
          {panels.map(panel => {
            return (
              <Tab
                removePanel={this.removePanel}
                startDragPanel={this.startDragPanel}
                endDragPanel={this.endDragPanel}
                setCur={this.setCur}
                key={panel.get('id')}
                panel={panel}
              />
            );
          })}
        </div>
        <Content className="con-container" setDropPanel={this.setDropPanel}>
          {panels.map(panel => {
            if (panel.get('id') !== cur_id) {
              return;
            }
            return <Panel key={panel.id} panel={panel} />;
          })}
        </Content>
      </Div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removePanel: (container, panel) => {
      dispatch(removePanel(container, panel));
    },
    addPanel: (container, panel) => {
      dispatch(addPanel(container, panel));
    },
  };
};

// tslint:disable-next-line:variable-name
export const ConnectContainer = connect(undefined, mapDispatchToProps)(
  Container,
);
