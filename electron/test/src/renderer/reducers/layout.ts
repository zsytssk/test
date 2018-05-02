import { fromJS } from 'immutable';
import { ADD_PANEL, GROUP_CONTAINER, REMOVE_PANEL } from '../actions/actions';
import { ImmutableType } from '../test';
import { generateRandomString } from '../util';
import { loadState } from '../utils/localStorage';

const default_data =
  // loadState().layout_data ||
  {
    children: [
      {
        children: [
          { id: 'panel1', title: 'panel1', content: 'content1' },
          { id: 'panel2', title: 'panel2', content: 'content2' },
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
  const new_children = children.delete(panel_index);
  if (new_children.size === 0) {
    let new_state = state.deleteIn(con_map);
    const group_map = con_map.splice(0, con_map.length - 2);

    /** container 的容器group也是空的 直接清除 */
    const group = new_state.getIn(group_map);
    if (group && group.get('children').size === 0) {
      new_state = new_state.deleteIn(group_map);
    }
    return new_state;
  } else {
    return state.setIn(con_map.concat(['children']), new_children);
  }
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
