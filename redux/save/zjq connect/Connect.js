
import { uuid, getIn } from './util';


var subMap = {};
export default function Connect(path, component, bindState) {
	if (!component instanceof Laya.Node) console.warn("component unusable");
	if (!component.uuid) { component.uuid = uuid(); }
	if (!subMap[path]) {  subMap[path] = {}; } 
	subMap[path][component.uuid] = component;

	let _state = getIn(Connect.store, path);
	if (typeof bindState === "function") {
		component.bindState = bindState;
		bindState(_state); 
	}
	component.state = _state;
}

Connect.provider = function(store) {
	if (Connect.store) { console.warn("store be used"); }
	Connect.store = store;
	Connect.unsubscribe = store.subscribe(() => {
		Object.keys(subMap).forEach( path => {
			Object.keys(subMap[path]).forEach( uuid => {
				let component = subMap[path][uuid];
				let _state = getIn(Connect.store, path);
				if (!component||component.destroyed) return delete subMap[path][uuid];
				if (component.state !== _state) {
					if (typeof component.bindState === "function") component.bindState(_state, component.state);
					component.preState = component.state;
					component.state = _state;
				}
			});
		});
	});
};
