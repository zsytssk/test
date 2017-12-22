import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'

const myMiddleware1 = store => next => action => {
  console.log('prev state1', store.getState());
  let result = next(action);
  console.log('next state1', store.getState());
  return result;
}
const myMiddleware2 = store => next => action => {
  console.log('prev state2', store.getState());
  let result = next(action);
  console.log('next state2', store.getState());
  return result;
}

const middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(myMiddleware1, myMiddleware2);
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)


store.subscribe(() => {
  let next_state = store.getState();
  console.log(next_state);
});

window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
