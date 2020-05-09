import React from 'react';
import { getState } from './stateManger';

export function State1() {
	const [state] = getState();

	return (
		<button onClick={state.setTest}>
			count:{state?.count}|test:{state?.test?.x}
		</button>
	);
}
