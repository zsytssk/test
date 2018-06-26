  import { fromJS } from 'immutable';
import {
  ADD_PANEL,
  GROUP_CONTAINER,
  REMOVE_PANEL,
  SPLIT_RADIO,
} from '../actions/actions';
import { ImmutableType } from '../test';
import { generateRandomString } from '../util';
import { loadState } from '../utils/localStorage';

const default_data =
  // loadState().layout_data ||
  {
    children: [
      {
        children: [
          {
            content: 'content2',
            id: 'panel2',
            title: 'panel2',
            type: 'canvas',
          },
          {
            content: 'content1',
            id: 'panel1',
            title: 'panel1',
            type: 'assets',
          },
          { id: 'panel3', title: 'panel3', content: 'content3' },
          { id: 'panel4', title: 'panel4', content: 'content4' },
          { id: 'panel5', title: 'panel5', content: 'content5' },
          { id: 'panel6', title: 'panel6', content: 'content6' },
        ],
        id: generateRandomString(),
        type: 'container',
      },
    ],
    direction: 'vertical',
    id: generateRandomString(),
    type: 'group',
  } as GroupData;

export function layoutReducer(state = fromJS(default_data), action) {
  switch (action.type) {
    case REMOVE_PANEL:
      return removePanel(state, action.payload.container, action.payload.panel);
    case ADD_PANEL:
      return addPanel(state, action.payload.container, action.payload.panel);
    case GROUP_CONTAINER:
      return groupContainer(
        state,
        action.payload.group,
        action.payload.container,
        action.payload.direction,
        action.payload.panel,
      );
    case SPLIT_RADIO:
      return splitRadio(
        state,
        action.payload.group,
        action.payload.split_radio,
      );
  }
  return state;
}

function removePanel(
  state: ImmutableType<GroupData>,
  container: ImmutableType<ContainerData>,
  panel: ImmutableType<PanelData>,
) {
  const con_map = findConMap(state, container);
  if (!con_map) {
    return state;
  }
  const children = container.get('children');

  const panel_index = children.findIndex(item => {
    return item === panel;
  });
  if (panel_index === -1) {
    return state;
  }

  /** 删除目标panel */
  state = state.deleteIn(con_map.concat(['children', panel_index]));

  /** 向上遍历, 如果有children为空就删除这个item */
  return removeSplitRadio(state, con_map);
}

function addPanel(
  state: ImmutableType<GroupData>,
  container: ImmutableType<ContainerData>,
  panel: ImmutableType<PanelData>,
) {
  const con_map = findConMap(state, container);
  if (!con_map) {
    return state;
  }

  const panel_index = container.get('children').findIndex(item => {
    return item === panel;
  });
  if (panel_index !== -1) {
    return state;
  }
  const abs_map = con_map.concat(['children']);
  return state.setIn(abs_map, container.get('children').push(panel));
}

function groupContainer(
  state: ImmutableType<GroupData>,
  group: ImmutableType<GroupData>,
  container: ImmutableType<ContainerData>,
  direction,
  panel: PanelData,
) {
  const group_map = findConMap(state, group);
  const origin_index = group
    .get('children')
    .findIndex(item => item === container);
  const other_container = group
    .get('children')
    .find(item => item !== container);
  let wrap_direction = 'horizontal';
  if (direction === 'top' || direction === 'bottom') {
    wrap_direction = 'vertical';
  }

  const wrap_contains = [];

  let new_contains;
  const new_container = {
    children: [panel],
    id: generateRandomString(),
    type: 'container',
  };
  if (direction === 'left' || direction === 'top') {
    new_contains = [new_container, container];
  } else {
    new_contains = [container, new_container];
  }
  const group_container = {
    children: new_contains,
    direction: wrap_direction,
    id: generateRandomString(),
    type: 'group',
  };
  wrap_contains[origin_index] = group_container;
  if (other_container) {
    // tslint:disable-next-line:variable-name
    const other_index = group
      .get('children')
      .findIndex((item, i) => item === other_container);
    wrap_contains[other_index] = {
      children: [other_container],
      id: generateRandomString(),
      type: 'group',
    };
  }

  const new_state = state.setIn(
    group_map.concat(['children']),
    fromJS(wrap_contains),
  );
  return new_state;
}

function splitRadio(
  state: ImmutableType<GroupData>,
  group: ImmutableType<GroupData>,
  split_radio: ImmutableType<number[]>,
) {
  const group_map = findConMap(state, group);
  const new_state = state.setIn(
    group_map.concat(['split_radio']),
    fromJS(split_radio),
  );

  return new_state;
}

/** 删除没有子类的空节点 */
function removeSplitRadio(state, address_map) {
  /** container 的容器group也是空的 直接清除 */
  const address_item = state.getIn(address_map);
  if (address_map.length <= 2) {
    return state;
  }
  const children = address_item.get('children');
  if (children.size !== 0) {
    return state;
  }

  state = state.deleteIn(address_map);

  const parent_map = address_map.slice(0, address_map.length - 2);
  const parent = state.getIn(parent_map);

  const cur_index = address_map[address_map.length - 2];
  let split_radio = parent.get('split_radio');
  split_radio = split_radio && split_radio.toJSON();
  if (split_radio && split_radio.length) {
    const con_radio = split_radio.splice(cur_index, 1)[0];
    if (split_radio.length) {
      if (cur_index > 0) {
        split_radio[cur_index - 1] = con_radio;
      }
    }
    state = state.setIn(
      parent_map.concat(['split_radio']),
      fromJS(split_radio),
    );
  }
  return removeSplitRadio(state, parent_map);
}

function findConMap(state, container, map = []) {
  if (state.get('id') === container.get('id')) {
    return map;
  }

  const children = state.get('children');
  if (!children) {
    return;
  }

  const keys = children.keySeq();
  map.push('children');
  for (const key of keys) {
    const has_map = findConMap(children.get(key), container, [...map, key]);
    if (!has_map) {
      continue;
    }
    return has_map;
  }
  return;
}
