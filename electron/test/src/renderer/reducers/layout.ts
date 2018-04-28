import { fromJS } from 'immutable';
import { ADD_PANEL, REMOVE_PANEL } from '../actions/actions';
import { ImmutableType } from '../test';
import { generateRandomString } from '../util';

const default_data = {
  id: generateRandomString(),
  children: [
    {
      id: generateRandomString(),
      panels: [
        { id: 'panel1', title: 'panel1', content: 'content1' },
        { id: 'panel2', title: 'panel2', content: 'content2' },
        { id: 'panel3', title: 'panel3', content: 'content3' },
      ],
    },
    {
      id: generateRandomString(),
      panels: [
        { id: 'panel4', title: 'panel4', content: 'content4' },
        { id: 'panel5', title: 'panel5', content: 'content5' },
        { id: 'panel6', title: 'panel6', content: 'content6' },
      ],
    },
  ],
  direction: 'vertical',
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
  container: ContainerData,
  panel: PanelData,
) {
  const containers = state.get('children') as ImmutableType<ContainerData[]>;
  const container_index = containers.findIndex((item, index) => {
    return item.get('id') === container.id;
  });
  if (container_index === -1) {
    return state;
  }
  const panel_index = container.panels.indexOf(panel);
  if (panel_index === -1) {
    return state;
  }
  const new_panels = containers
    .get(container_index)
    .get('panels')
    .delete(panel_index);
  return state.setIn(['children', container_index, 'panels'], new_panels);
}
function addPanel(
  state: ImmutableType<GroupData>,
  container: ContainerData,
  panel: PanelData,
) {
  const containers = state.get('children');
  const container_index = containers.findIndex((item, index) => {
    return item.get('id') === container.id;
  });
  if (container_index === -1) {
    return state;
  }
  const panel_index = container.panels.indexOf(panel);
  if (panel_index !== -1) {
    return state;
  }
  const new_panels = containers
    .get(container_index)
    .get('panels')
    .push(panel);

  return state.setIn(['children', container_index, 'panels'], new_panels);
}
