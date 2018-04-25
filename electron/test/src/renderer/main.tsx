import * as React from 'react';
import * as ReactDom from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ConnectApp as App } from './component/app';
import { connect } from './ipc';
import { reducer } from './reducers/index';

const container = document.getElementById('app');
const store = createStore(reducer);

connect();
render(
  <Provider store={store}>
    <App />
  </Provider>,
  container,
);
