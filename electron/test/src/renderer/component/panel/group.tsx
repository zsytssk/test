import * as React from 'react';
import { default as styled } from 'styled-components';
import { ImmutableType } from '../../test';
import { ConnectContainer as Container } from './container';
import { PanelContextConsumer, PanelContextProvider } from './context';
import { Sash } from './sash';

type State = {
  direction: GroupDirection;
  contains: ImmutableType<ContainerData[]> | ImmutableType<GroupData[]>;
};

type Props = {
  layoutData: ImmutableType<GroupData>;
  width: number;
  height: number;
  top: number;
  left: number;
  index?: number;
};

// tslint:disable-next-line:variable-name
export class Group extends React.Component<Props, State> {
  public state = {
    contains: [] as any,
    direction: 'horizontal',
  } as State;
  // tslint:disable-next-line:variable-name
  public static getDerivedStateFromProps(nextProps: Props, _prevState: State) {
    const direction = nextProps.layoutData.get('direction');
    const children = nextProps.layoutData.get('children');
    return { direction, contains: children };
  }
  public groupContainer = async (
    index: number,
    direction,
    panel_data: PanelData,
  ) => {
    const contains = this.state.contains as ImmutableType<ContainerData[]>;
    const data = contains[index];
    let wrap_direction = 'horizontal';
    if (direction === 'top' || direction === 'bottom') {
      wrap_direction = 'vertical';
    }
    if (index === -1) {
      return;
    }
    const wrap_contains = [];

    /** 新创建的container的数据 */
    const new_container = {
      panels: [panel_data],
    };

    let new_contains = [];
    if (direction === 'left' || direction === 'top') {
      new_contains = [new_container, data];
    } else {
      new_contains = [data, new_container];
    }
    const group_container = {
      children: new_contains,
      direction: wrap_direction,
    };
    wrap_contains[index] = group_container;
    // tslint:disable-next-line:variable-name
    const other_container = contains.find((_item, i) => i !== index);
    if (other_container) {
      // tslint:disable-next-line:variable-name
      const other_index = contains.findIndex((_item, i) => i !== index);
      wrap_contains[other_index] = {
        children: [other_container],
      };
    }

    await this.setState({
      ...this.state,
      contains: wrap_contains,
    });

    return new_container;
  };
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

    const num_childs = contains.size;
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
            const child = contains.get(index);
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
                {(child as ImmutableType<ContainerData>).get('type') ===
                'group' ? (
                  <Group
                    layoutData={child as ImmutableType<GroupData>}
                    width={child_w}
                    height={child_h}
                    left={child_left}
                    top={child_top}
                    index={index}
                  />
                ) : (
                  <PanelContextConsumer>
                    {(panel_manager: PanelContextProvider) => {
                      return (
                        <Container
                          width={child_w}
                          height={child_h}
                          left={child_left}
                          top={child_top}
                          index={index}
                          groupContainer={this.groupContainer}
                          layoutData={child as ImmutableType<ContainerData>}
                          panel_manager={panel_manager}
                        />
                      );
                    }}
                  </PanelContextConsumer>
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
