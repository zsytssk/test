import * as React from 'react';
import { default as styled } from 'styled-components';
import { PanelInfo } from '../main';
import { Content } from './content';
import { Panel } from './panel';
import { Tab } from './tab';

const w_h = window.innerHeight;
const w_w = window.innerWidth;

type State = {
  cur_id?: string;
  drag_status?: boolean;
  contains: PanelInfo[];
};

type Props = {
  width: number;
  left: number;
  all_panel: PanelInfo[];
  contains: PanelInfo[];
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

    if (id === cur_id) {
      const index = contains.findIndex(item => item.id === id);
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
  public addPanel = (id: string) => {
    let { contains } = this.state;
    const panel_item = this.props.all_panel.find(item => item.id === id);

    const is_contained = contains.find(item => item.id === id);
    if (is_contained) {
      return;
    }
    contains = [...contains, { ...panel_item }];

    this.setState({
      ...this.state,
      contains,
    });
    return true;
  }; // tslint:disable-line:semicolon
  public setCur = (id: string) => {
    this.setState({ ...this.state, cur_id: id });
  }; // tslint:disable-line:semicolon
  public render() {
    const { cur_id, contains } = this.state;
    const { all_panel, width, left, ...other } = this.props;
    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      position: absolute;
      height: ${w_h}px;
      width: ${width}px;
      left: ${left}px;

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
      <Div {...other}>
        <div className="header tabs title">
          {contains.map(contain => {
            const { content, ...props } = contain;
            return (
              <Tab
                removePanel={this.removePanel}
                setCur={this.setCur}
                key={contain.id}
                {...props}
              />
            );
          })}
        </div>
        <Content className="con-container" addPanel={this.addPanel}>
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
