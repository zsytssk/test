import { combineReducers } from 'redux';

import { layoutReducer } from './layout';

export const reducer = combineReducers({
  layout_data: layoutReducer,
});
