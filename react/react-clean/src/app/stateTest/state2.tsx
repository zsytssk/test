import React from 'react';
import { getState } from './stateManger';

export function State2() {
	const [state, setState] = getState();
	return (
		<button onClick={state?.setCount}>
			count:{state?.count}|test:{state?.test?.x}
		</button>
	);
}
