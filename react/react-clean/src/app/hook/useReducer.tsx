import React, { useReducer } from 'react';

const initialState = { count: 0 };
type Action = { type: 'increment' | 'decrement' };

function init(state: typeof initialState) {
    return { count: state.count + 88 };
}

function reducer(state: typeof initialState, action: Action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

export const UseReducerFc = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init);

    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    );
};
