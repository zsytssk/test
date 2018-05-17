import * as React from 'react';
import { default as styled } from 'styled-components';
import { ImmutableType } from '../../test';

type Props = {
  data: AssetsPanelData;
};
type State = {};

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: 100%;
  width: 100%;
  color: #fff;
  padding: 0 5px;
  line-height: 25px;
`;

export class Item extends React.Component<Props, State> {
  //   public static getDerivedStateFromProps(nextProps: Props, prevState: State) {}
  public render() {
    const asset_data = this.props.data;
    const children = asset_data.children;
    return (
      <Div>
        {asset_data.name}
        {children &&
          children.map((item, index) => {
            return <Item key={index} data={item} />;
          })}
      </Div>
    );
  }
}
