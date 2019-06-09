import { combineReducers } from 'redux-immutable';

import { layoutReducer } from './layout';

export const reducer = combineReducers({
  layout_data: layoutReducer,
});
