import * as React from 'react';
import { connect } from 'react-redux';
import { default as styled } from 'styled-components';
import { groupContainer } from '../../actions/actions';
import { ImmutableType } from '../../test';
import { ConnectContainer as Container } from './container';
import { PanelContextConsumer, PanelContextProvider } from './context';
import { Sash } from './sash';

type State = {
  direction: GroupDirection;
  contains: ImmutableType<ContainerData[]> | ImmutableType<GroupData[]>;
  split_pos: number;
};

type Props = {
  layoutData: ImmutableType<GroupData>;
  width: number;
  height: number;
  top: number;
  left: number;
  groupContainer: (...args) => any;
};

export class Group extends React.Component<Props, State> {
  public state = {
    contains: [] as any,
    direction: 'horizontal',
  } as State;
  private onDragSash = false;
  private dragPos = { x: 0, y: 0 };
  private distPos = { x: 0, y: 0 };
  public mouseDown = evt => {
    this.onDragSash = true;
    this.dragPos = {
      x: evt.pageX,
      y: evt.pageY,
    };
  };
  private mouseMove = evt => {
    if (!this.onDragSash) {
      return;
    }
    evt.preventDefault();
    this.distPos = {
      x: evt.pageX - this.dragPos.x,
      y: evt.pageY - this.dragPos.y,
    };
    this.dragPos = {
      x: evt.pageX,
      y: evt.pageY,
    };
    let { top } = this.state;
    top += this.distPos.y;
    console.log(top);
    this.setState({
      ...this.state,
      top,
    });
  };
  private mouseEnd = evt => {
    this.onDragSash = false;
  };
  public static getDerivedStateFromProps(nextProps: Props, _prevState: State) {
    const direction = nextProps.layoutData.get('direction');
    const children = nextProps.layoutData.get('children');
    return { direction, contains: children };
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
      <Div
        onMouseMove={this.mouseMove}
        onMouseUp={this.mouseEnd}
        onMouseOut={this.mouseEnd}
      >
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
  };
};

// tslint:disable-next-line:variable-name
export const ConnectGroup = connect(undefined, mapDispatchToProps)(Group);
