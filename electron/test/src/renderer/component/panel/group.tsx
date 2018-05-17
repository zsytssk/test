import { List } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { groupContainer, splitRadio } from '../../actions/actions';
import { ImmutableType } from '../../test';
import { ConnectContainer as Container } from './container';
import { PanelContextConsumer, PanelContextProvider } from './context';
import { Sash } from './sash';

const sash_size = 5;

type State = {
  direction: GroupDirection;
  contains: ImmutableType<ContainerData[]> | ImmutableType<GroupData[]>;
  split_radio: ImmutableType<number[]>;
};

type Props = {
  layoutData: ImmutableType<GroupData>;
  width: number;
  height: number;
  top: number;
  left: number;
  groupContainer: (...args) => any;
  splitRadio: (...args) => any;
};

export class Group extends React.Component<Props, State> {
  public state = {
    contains: [] as any,
    direction: 'horizontal',
    split_radio: List([]),
  } as State;
  private onDragSashIndex = -1;
  private dragPos = { x: 0, y: 0 };
  private distPos = { x: 0, y: 0 };
  public mouseDown = (evt, index: number) => {
    this.onDragSashIndex = index;
    this.dragPos = {
      x: evt.pageX,
      y: evt.pageY,
    };
  };
  // public shouldComponentUpdate() {
  //   return false;
  // }
  private mouseMove = evt => {
    const drag_index = this.onDragSashIndex;
    if (drag_index === -1) {
      return;
    }
    evt.preventDefault();

    const direction = this.state.direction;
    const contains = this.state.contains;

    this.distPos = {
      x: evt.pageX - this.dragPos.x,
      y: evt.pageY - this.dragPos.y,
    };
    this.dragPos = {
      x: evt.pageX,
      y: evt.pageY,
    };
    let change_size;
    let content_size;
    if (direction === 'horizontal') {
      change_size = this.distPos.x;
      content_size = this.props.width;
    } else {
      content_size = this.props.height;
      change_size = this.distPos.y;
    }

    let split_radio = this.state.split_radio;
    let drag_radio = split_radio.get(drag_index);
    let drag_pos =
      drag_radio * (content_size - (contains.size - 1) * sash_size);

    drag_pos = drag_pos + change_size;

    drag_radio = drag_pos / (content_size - (contains.size - 1) * sash_size);

    split_radio = split_radio.set(drag_index, drag_radio);

    this.setState({
      ...this.state,
      split_radio,
    });
  };
  private mouseEnd = evt => {
    const drag_index = this.onDragSashIndex;
    if (drag_index === -1) {
      return;
    }

    this.props.splitRadio(this.props.layoutData, this.state.split_radio);
    this.onDragSashIndex = -1;
  };
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const direction = nextProps.layoutData.get('direction');
    const children = nextProps.layoutData.get('children');

    let split_radio = nextProps.layoutData.get('split_radio') || List([]);
    if (split_radio.size === 0) {
      const arr = [];
      for (let i = 0; i < children.size; i++) {
        arr.push((i + 1) / children.size);
      }
      split_radio = List(arr);
    }
    return { direction, contains: children, split_radio };
  }
  public groupContainer = async (
    container: ImmutableType<ContainerData[]>,
    direction,
    panel_data: PanelData,
  ) => {
    this.props.groupContainer(
      this.props.layoutData,
      container,
      direction,
      panel_data,
    );
  };
  public render() {
    const { direction, contains, split_radio } = this.state;
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

    let sash_w;
    let sash_h;
    if (direction === 'horizontal') {
      sash_w = sash_size;
      sash_h = height;
    } else {
      sash_w = width;
      sash_h = sash_size;
    }

    return (
      <Div
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseEnd}
        onMouseOut={this.mouseEnd}
      >
        {Array(num_childs)
          .fill('*')
          .map((item, index) => {
            const item_radio = index > 0 ? split_radio.get(index - 1) : 0;
            const sash_radio = split_radio.get(index);
            const child = contains.get(index);
            let child_left;
            let child_top;
            let child_w;
            let child_h;
            let sash_top;
            let sash_left;
            if (direction === 'horizontal') {
              child_left =
                index > 0 ? item_radio * width + sash_size : item_radio * width;
              child_top = 0;
              sash_left = sash_radio * width;
              sash_top = 0;
              child_w = sash_left - child_left;
              child_h = height;
            } else {
              child_top =
                index > 0
                  ? item_radio * height + sash_size
                  : item_radio * height;
              child_left = 0;
              sash_top = sash_radio * height;
              sash_left = 0;
              child_h = sash_top - child_top;
              child_w = width;
            }

            return (
              <React.Fragment key={index}>
                {(child as ImmutableType<ContainerData>).get('type') ===
                'group' ? (
                  <ConnectGroup
                    layoutData={child as ImmutableType<GroupData>}
                    width={child_w}
                    height={child_h}
                    left={child_left}
                    top={child_top}
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
                    mouseDown={this.mouseDown}
                    index={index}
                  />
                )}
              </React.Fragment>
            );
          })}
      </Div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    groupContainer: (...args) => {
      dispatch(groupContainer(...args));
    },
    splitRadio: (group, split_radio) => {
      dispatch(splitRadio(group, split_radio));
    },
  };
};

// tslint:disable-next-line:variable-name
export const ConnectGroup = connect(undefined, mapDispatchToProps)(Group);
