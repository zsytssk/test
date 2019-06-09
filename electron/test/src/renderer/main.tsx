import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ConnectApp as App } from './component/app';
import { connect } from './ipc';
import { reducer } from './reducers/index';
import { test } from './test/test';
import { saveState } from './utils/localStorage';

const container = document.getElementById('app');
const store = createStore(reducer);

store.subscribe(() => {
  console.log(analysisState(store.getState()));
  saveState(store.getState());
});

function analysisState(ori_obj, path = []) {
  const okeys = ori_obj.keySeq().toArray();
  if (!okeys.length) {
    console.log(path);
  }
  for (const o_key of okeys) {
    if (o_key === 'id') {
      continue;
    }
    const ori_item = ori_obj.get(o_key);
    const item_path = path.concat();
    if (isPrim(ori_item)) {
      console.log(item_path.concat([ori_item]));
      continue;
    }
    item_path.push(o_key);
    analysisState(ori_item, item_path);
  }
}

/** 原始类型, null 没有做处理 */
export function isPrim(value) {
  // return false;
  const value_type = typeof value;
  return value_type !== 'function' && value_type !== 'object';
}

connect();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);

test();
