import { EventCom } from '../eventCom';
import { useState, useEffect } from 'react';

class StateModel extends EventCom {
	public count = 0;
	public changeIndex = 0;
	public test = { x: 1 };
	public setCount = () => {
		this.count++;
		this.changeIndex++;
		this.emit('change');
	};
	public setTest = () => {
		this.test.x++;
		this.emit('change');
		this.changeIndex++;
	};
}

let state = new StateModel();
export function getState() {
	const [_state, setState] = useState(state);
	const [changeIndex, setChangeIndex] = useState(state?.changeIndex);

	useEffect(() => {
		const fn = () => {
			setState(state);
			setChangeIndex(state.changeIndex);
		};
		state.on('change', fn);
		return () => state.off('change', fn);
	}, []);

	return [_state, changeIndex] as [StateModel, number];
}
