import { ADD_PANEL, REMOVE_PANEL } from '../actions/actions';

const default_data = {
  children: [
    {
      panels: [
        { id: 'panel1', title: 'panel1', content: 'content1' },
        { id: 'panel2', title: 'panel2', content: 'content2' },
        { id: 'panel3', title: 'panel3', content: 'content3' },
      ],
    },
    {
      panels: [
        { id: 'panel4', title: 'panel4', content: 'content4' },
        { id: 'panel5', title: 'panel5', content: 'content5' },
        { id: 'panel6', title: 'panel6', content: 'content6' },
      ],
    },
  ],
  direction: 'vertical',
} as GroupData;

export function layoutReducer(state = default_data, action) {
  switch (action.type) {
    case REMOVE_PANEL:
      return removePanel(state, action.payload.container, action.payload.panel);
    case ADD_PANEL:
      return addPanel(state, action.payload.container, action.payload.panel);
  }
  return state;
}

function removePanel(
  state: GroupData,
  container: ContainerData,
  panel: PanelData,
) {
  const containers = state.children as ContainerData[];
  const container_index = containers.indexOf(container);
  if (container_index === -1) {
    return;
  }
  const panel_index = container.panels.indexOf(panel);
  if (panel_index === -1) {
    return;
  }
  container.panels.splice(panel_index, 1);

  return state;
}
function addPanel(state, container, panel) {
  const containers = state.children as ContainerData[];
  const container_index = containers.indexOf(container);
  if (container_index === -1) {
    return;
  }
  const panel_index = container.panels.indexOf(panel);
  if (panel_index !== -1) {
    return;
  }
  container.panels.push(panel);

  return state;
}
