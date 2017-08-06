import {
    combineReducers
}
    from 'redux';
import {
    ADD_TODO,
    COMPLETE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
}
    from './actions';

const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

let todos_cmd = {
    ADD_TODO: (state, action) => {
        return [
            ...state,
            {
                text: action.text,
                completed: false
            }
        ];
    },
    COMPLETE_TODO: (state, action) => {
        return [
            ...state.slice(0, action.index),
            Object.assign({},
                state[action.index], {
                    completed: true
                }),
            ...state.slice(action.index + 1)
        ];
    }
}

function todos(state = [], action) {
    if (todos_cmd[action.type]) {
        return todos_cmd[action.type](state, action);
    }
    return state;
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
});

export default todoApp;