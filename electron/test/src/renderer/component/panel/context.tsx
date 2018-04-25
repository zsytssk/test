import * as React from 'react';
import { Container } from './container';
import { DragStatus } from './content';

const { Provider, Consumer } = React.createContext('panel');
type State = {
  move_panel_id: string;
  drag_status: DragStatus;
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
  public setTargetContainer(container: Container, drag_status: DragStatus) {
    this.setState({
      drag_status,
      target_container: container,
    });
  }
  public getTargetContainer() {
    return this.state.target_container;
  }
  public movePanel() {
    const {
      source_container,
      target_container,
      move_panel_id,
      drag_status,
    } = this.state;
    if (!source_container || !move_panel_id || !target_container) {
      return;
    }
    if (source_container === target_container) {
      if (!drag_status || drag_status === 'full') {
        return;
      }
    }

    const panel = source_container.getPanel(move_panel_id);
    source_container.removePanel(move_panel_id);
    if (drag_status == 'full') {
      target_container.addPanel(panel, true);
    } else {
      target_container.groupContainer(drag_status, panel);
    }
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
