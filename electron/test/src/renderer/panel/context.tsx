import * as React from 'react';
import { Tab } from './tab';

const { Provider, Consumer } = React.createContext('panel');
type State = {
  onDragTab: Tab;
};
class PanelContextComponent extends React.Component<any, State> {
  private state = {} as State;
  public render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}
