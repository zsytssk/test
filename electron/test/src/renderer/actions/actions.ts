export const REMOVE_PANEL = 'remove_panel';
export const ADD_PANEL = 'add_panel';
export const SET_CUR_PANEL = 'set_cur_panel';
export const MOVE_PANEL = 'move_panel';

export function removePanel(container, panel) {
  return {
    type: REMOVE_PANEL,
    payload: {
      container,
      panel,
    },
  };
}
export function addPanel(container, panel) {
  return {
    type: ADD_PANEL,
    payload: {
      container,
      panel,
    },
  };
}
export function setCurPanel(container, panel) {
  return {
    type: SET_CUR_PANEL,
    payload: {
      container,
      panel,
    },
  };
}
export function movePanel(target, source, panel) {
  return {
    type: MOVE_PANEL,
    payload: {
      target,
      source,
      panel,
    },
  };
}
