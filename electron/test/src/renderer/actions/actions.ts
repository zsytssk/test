export const REMOVE_PANEL = 'remove_panel';
export const ADD_PANEL = 'add_panel';
export const SET_CUR_PANEL = 'set_cur_panel';
export const MOVE_PANEL = 'move_panel';
export const GROUP_CONTAINER = 'group_container';
export const SPLIT_RADIO = 'split_radio';

export function removePanel(container, panel) {
  return {
    payload: {
      container,
      panel,
    },
    type: REMOVE_PANEL,
  };
}
export function addPanel(container, panel) {
  return {
    payload: {
      container,
      panel,
    },
    type: ADD_PANEL,
  };
}
export function setCurPanel(container, panel) {
  return {
    payload: {
      container,
      panel,
    },
    type: SET_CUR_PANEL,
  };
}
export function movePanel(target, source, panel) {
  return {
    payload: {
      panel,
      source,
      target,
    },
    type: MOVE_PANEL,
  };
}
export function groupContainer(group, container, direction, panel) {
  return {
    payload: {
      container,
      direction,
      group,
      panel,
    },
    type: GROUP_CONTAINER,
  };
}
export function splitRadio(group, split_radio) {
  return {
    payload: {
      group,
      split_radio,
    },
    type: SPLIT_RADIO,
  };
}
