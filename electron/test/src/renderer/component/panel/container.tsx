import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { addPanel, removePanel } from '../../actions/actions';
import { Content, DragStatus } from './content';
import { PanelContextProvider } from './context';
import { Panel } from './panel';
import { Tab } from './tab';

type State = {
  cur_id?: string;
  drag_status?: boolean;
  panels: PanelData[];
};

type Props = {
  width: number;
  height: number;
  left: number;
  top: number;
  panel_manager: PanelContextProvider;
  layoutData: ContainerData;
  index: number;
  groupContainer: (...any) => any;
  removePanel: (...any) => any;
};
export class Container extends React.Component<Props, State> {
  public state = { panels: [] } as State;
  public componentDidMount() {
    const { panels } = this.props.layoutData;
    const cur_id = panels[0].id;
    this.setState({ cur_id, panels });
  }
  public removePanel = (id: string) => {
    let { cur_id, panels } = this.state;

    this.props.removePanel(
      this.props.layoutData,
      panels.find(item => item.id === id),
    );
    // const index = panels.findIndex(item => item.id === id);
    // if (index === -1) {
    //   return;
    // }
    // if (id === cur_id) {
    //   if (index < panels.length - 1) {
    //     cur_id = panels[index + 1].id;
    //   } else {
    //     cur_id = panels[index - 1] ? panels[index - 1].id : '';
    //   }
    // }

    // panels = panels.filter(item => item.id !== id);
    // this.setState({
    //   ...this.state,
    //   cur_id,
    //   panels,
    // });
  }; // tslint:disable-line:semicolon
  public addPanel = (data: PanelData, is_cur?: boolean) => {
    const { panels } = this.state;
    const is_contained = panels.find(item => item.id === data.id);
    if (is_contained) {
      return;
    }
    const end_state = {} as {
      panels: PanelData[];
      cur_id: string;
    };
    end_state.panels = [...panels, data];

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

    if (!panels.length) {
      return '';
    }
    return (
      <Div>
        <div className="header tabs title">
          {panels.map(contain => {
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
          {panels.map(contain => {
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

const mapDispatchToProps = dispatch => {
  return {
    removePanel: (container, panel) => {
      dispatch(removePanel(container, panel));
    },
  };
};

// tslint:disable-next-line:variable-name
export const ConnectContainer = connect(undefined, mapDispatchToProps)(
  Container,
);
