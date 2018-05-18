import * as React from 'react';
import { default as styled } from 'styled-components';
import iconArrowExpand from '../../images/icon-arrow-expand.png';
import iconArrow from '../../images/icon-arrow.png';
import iconFolderExpand from '../../images/icon-folder-expand.png';
import iconFolder from '../../images/icon-folder.png';

type Props = {
  data: AssetsPanelData;
};
type State = {
  expand: boolean;
};

// tslint:disable-next-line:variable-name
const Div = styled.div`
  height: 100%;
  width: 100%;
  color: #fff;
  padding: 0 5px;
  line-height: 25px;
  & > .wrap {
    padding-left: 20px;
    display: none;
  }
  &.expand > .wrap {
    padding-left: 20px;
    display: block;
  }
  & i[class^='icon'] {
    display: inline-block;
    background-size: contain;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -1px;
  }
  .icon-folder {
    width: 14px;
    height: 12px;
    background-image: url(${iconFolder});
  }
  &.expand > .name > .icon-folder {
    background-image: url(${iconFolderExpand});
  }
  .icon-arrow {
    width: 7px;
    height: 8px;
    background-image: url(${iconArrow});
  }
  &.expand > .name > .icon-arrow {
    background-image: url(${iconArrowExpand});
  }
`;

export class Item extends React.Component<Props, State> {
  public state = {} as State;
  //   public static getDerivedStateFromProps(nextProps: Props, prevState: State) {}
  public toggle = () {
    this.setState({
      expand: !this.state.expand,
    });
  }
  public render() {
    const expand = this.state.expand;
    const asset_data = this.props.data;
    const children = asset_data.children;
    return (
      <Div onClick={this.toggle} className={expand ? `expand` : ''}>
        <div className="name">
          {asset_data.type === 'folder' && <i className={`icon-arrow`} />}
          <i className={`icon-${asset_data.type}`} />
          {asset_data.name}
        </div>
        <div className="wrap">
          {children &&
            children.map((item, index) => {
              return <Item key={index} data={item} />;
            })}
        </div>
      </Div>
    );
  }
}
