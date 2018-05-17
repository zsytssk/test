import * as React from 'react';
import { Panel, WrapDom } from '../panel/panel';
import { getAssets } from './getAssets';
import { Item } from './item';

type State = {
  data: AssetsPanelData;
};

export class AssetsFolderPanel extends Panel<State> {
  public state = {} as State;
  public componentDidMount() {
    getAssets().then(data => {
      this.setState({
        data,
      });
    });
  }
  public render() {
    const data = this.state.data;
    if (!data) {
      return '';
    }
    return (
      <WrapDom>
        <Item data={data} />
      </WrapDom>
    );
  }
}
