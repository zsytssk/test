import * as React from 'react';
import { Container } from './container';

const { Provider, Consumer } = React.createContext('panel');
type State = {
  move_panel_id: string;
  source_container: Container;
  target_container: Container;
};
export class PanelContextProvider extends React.Component<any, State> {
  public state = {} as State;
  public getMovePanel() {
    return;
  }
  public setMovePanel(panel_id, container: Container) {
    this.state.move_panel_id = panel_id;
    this.state.source_container = container;
    return;
  }
  public setTargetContainer(container: Container) {
    this.state.target_container = container;
  }
  public getTargetContainer() {
    return this.state.target_container;
  }
  public movePanel() {
    const source_container = this.state.source_container;
    const target_container = this.state.target_container;
    const move_panel_id = this.state.move_panel_id;

    if (!source_container || !move_panel_id || !target_container) {
      return;
    }

    const panel = source_container.getPanel(move_panel_id);
    source_container.removePanel(move_panel_id);
    target_container.addPanel(panel, true);
    // target_container.addPanel(panel);
    // target_container.setCur(move_panel_id);
    this.reset();
  }
  public reset() {
    this.setState({});
  }
  public render() {
    return <Provider value={this}>{this.props.children}</Provider>;
  }
}

// tslint:disable-next-line:variable-name
export const PanelContextConsumer = Consumer;
