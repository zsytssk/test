import * as React from 'react';
import { default as styled } from 'styled-components';
import { Container } from './container';
import { PanelContextConsumer, PanelContextProvider } from './context';
import { Sash } from './sash';

type State = {
  direction: GroupDirection;
  contains: ContainerData[] | GroupData[];
};

type Props = {
  layoutDirection: GroupDirection;
  layoutChildren: ContainerData[] | GroupData[];
  width: number;
  height: number;
  top: number;
  left: number;
};

// tslint:disable-next-line:variable-name

export class Group extends React.Component<Props, State> {
  public state = {
    contains: [],
    direction: 'horizontal',
  } as State;
  public componentDidMount() {
    const direction = this.props.layoutDirection || 'horizontal';
    const contains = this.props.layoutChildren;
    this.setState({ direction, contains });
  }
  public async groupContainer(
    data: ContainerData,
    direction,
    panel_data: PanelData,
  ) {
    const contains = this.state.contains as ContainerData[];
    const index = contains.findIndex(item => item === data);
    if (index === -1) {
      return;
    }
    const new_contains = [];

    /** 新创建的container的数据 */
    const new_container = {
      panels: [],
    };
    const group_container = {
      contains: [data, new_container],
      direction,
    };
    new_contains.push(group_container);
    const other_container = contains.find(item => item !== data);
    if (other_container) {
      new_contains.push(other_container);
    }

    await this.setState({
      ...this.state,
      contains: new_contains,
    });

    return new_container;
  }
  public render() {
    const { direction, contains } = this.state;
    const { width, height, top, left } = this.props;

    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      position: absolute;
      height: ${height}px;
      width: ${width}px;
      left: ${left}px;
      top: ${top}px;
    `;

    const num_childs = contains.length;
    const sash_nums = num_childs - 1;
    const sash_size = 5;

    let child_w;
    let child_h;
    let sash_w;
    let sash_h;
    if (direction === 'horizontal') {
      child_w = (width - sash_nums * sash_size) / num_childs;
      child_h = height;
      sash_w = 5;
      sash_h = height;
    } else {
      child_w = width;
      child_h = (height - sash_nums * sash_size) / num_childs;
      sash_w = width;
      sash_h = 5;
    }

    return (
      <Div>
        {Array(num_childs)
          .fill('*')
          .map((item, index) => {
            const child = contains[index];
            let child_left;
            let child_top;
            let sash_top;
            let sash_left;
            if (direction === 'horizontal') {
              child_left = index * (child_w + sash_size);
              child_top = 0;
              sash_left = (index + 1) * (child_w + sash_size) - sash_size;
              sash_top = 0;
            } else {
              child_top = index * (child_h + sash_size);
              child_left = 0;
              sash_top = (index + 1) * (child_h + sash_size) - sash_size;
              sash_left = 0;
            }

            return (
              <React.Fragment key={index}>
                {(child as ContainerData).panels ? (
                  <PanelContextConsumer>
                    {(panel_manager: PanelContextProvider) => {
                      return (
                        <Container
                          width={child_w}
                          height={child_h}
                          left={child_left}
                          top={child_top}
                          contains={(child as ContainerData).panels}
                          panel_manager={panel_manager}
                        />
                      );
                    }}
                  </PanelContextConsumer>
                ) : (
                  <Group
                    layoutDirection={(child as GroupData).direction}
                    layoutChildren={(child as GroupData).children}
                    width={child_w}
                    height={child_h}
                    left={child_left}
                    top={child_top}
                  />
                )}
                {index < num_childs - 1 && (
                  <Sash
                    width={sash_w}
                    height={sash_h}
                    top={sash_top}
                    left={sash_left}
                  />
                )}
              </React.Fragment>
            );
          })}
      </Div>
    );
  }
}
