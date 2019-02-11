import { Node } from '../node/node';
import { Stage } from '../node/stage';
import { Event, EventType } from './event';
import { convertPosClientToStage } from './watchCanvas';

export function triggerPosEvent(type: EventType, pos: Point) {
    const stage_pos = convertPosClientToStage(pos);
    const event = new Event(type, stage_pos);
    findPosEventTarget(event, Stage.instance);
}
export function triggerResizeEvent(type: EventType, data: {}) {
    Stage.instance.event(type, data);
}
function findPosEventTarget(event: Event, node: Node) {
    const { children } = node;
    const { length: len } = children;
    for (let i = len - 1; i >= 0; i--) {
        const { stageX: x, stageY: y } = event;
        const child = children[i];
        const is_trigger = findPosEventTarget(event, child);
        if (is_trigger) {
            return true;
        }
        if (pointInsideNode(child, { x, y })) {
            child.event(event.type, event);
            return true;
        }
    }
    return false;
}
function pointInsideNode(node: Node, point: Point) {
    const { width, height } = node.getBounds();
    const { x, y } = node.globalToLocal(point);
    return x >= 0 && y >= 0 && x < width && y < height;
}
