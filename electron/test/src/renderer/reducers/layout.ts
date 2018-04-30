import { fromJS } from 'immutable';
import { ADD_PANEL, REMOVE_PANEL } from '../actions/actions';
import { ImmutableType } from '../test';
import { generateRandomString } from '../util';

const default_data = {
  children: [
    {
      children: [
        { id: 'panel1', title: 'panel1', content: 'content1' },
        { id: 'panel2', title: 'panel2', content: 'content2' },
        { id: 'panel3', title: 'panel3', content: 'content3' },
      ],
      id: generateRandomString(),
      type: 'container',
    },
    {
      children: [
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

  const panel_index = container.get('children').findIndex(item => {
    return item === panel;
  });
  if (panel_index === -1) {
    return state;
  }
  return state.deleteIn(con_map.concat(['children', panel_index]));
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
  container: ContainerData,
  direction,
  panel: PanelData,
) {}

function findConMap(state, container, map = []) {
  if (state === container) {
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
