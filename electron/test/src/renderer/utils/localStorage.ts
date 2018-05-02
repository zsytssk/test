export const loadState = () => {
  const state = localStorage.getItem('state');
  if (!state) {
    return;
  }
  return JSON.parse(state);
};
export const saveState = state => {
  state = JSON.stringify(state);
  localStorage.setItem('state', state);
};
