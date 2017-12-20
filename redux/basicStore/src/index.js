import React from 'react';
import {
    render
} from 'react-dom';
import {
    compose,
    createStore
} from 'redux';
import {
    Provider
} from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';

let store = createStore(todoApp, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : noop => noop
));
window.store = store;
let rootElement = document.getElementById('root');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)