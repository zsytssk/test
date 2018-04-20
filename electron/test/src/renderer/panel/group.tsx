import * as React from 'react';
import { default as styled } from 'styled-components';
import { Container } from './container';

const w_h = window.innerHeight;
const w_w = window.innerWidth;

type State = {};

type Props = {
  layoutDirection: GroupDirection;
  layoutChildren: ContainerData[] | GroupData[];
  wrapDirection?: GroupDirection;
  wrapRadio?: number;
};

// tslint:disable-next-line:variable-name

export class Group extends React.Component<Props, State> {
  public render() {
    const { layoutDirection, layoutChildren } = this.props;
    let { wrapDirection, wrapRadio } = this.props;

    wrapDirection = wrapDirection || 'horizontal';
    wrapRadio = wrapRadio || 1;

    const w = wrapDirection === 'horizontal' ? wrapRadio * 100 + '%' : '100%';
    const h = wrapDirection === 'horizontal' ? '100%' : wrapRadio * 100 + '%';

    // tslint:disable-next-line:variable-name
    const Div = styled.div`
      position: absolute;
      height: ${h};
      width: ${w};
    `;

    return (
      <Div>
        {layoutChildren.map((item, index) => {
          if (isContainerData(item)) {
            return (
              <Container
                key={index}
                wrapDirection={layoutDirection}
                wrapRadio={(item as ContainerData).wrap_radio}
                contains={(item as ContainerData).panels}
                all_panel={(item as ContainerData).panels}
              />
            );
          } else {
            return (
              <Group
                key={index}
                layoutDirection={layoutDirection}
                layoutChildren={item.children}
                wrapRadio={item.wrap_radio}
              />
            );
          }
        })}
      </Div>
    );
  }
}

function isContainerData(
  data: ContainerData | GroupData,
): data is ContainerData {
  return (data as ContainerData).panels !== undefined;
}
