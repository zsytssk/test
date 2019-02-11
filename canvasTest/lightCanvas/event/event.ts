import { Node } from '../node/node';
export type EventType = 'click' | 'resize';
export class Event {
    public type: EventType;
    public stop_pop = false;
    public stageX: number;
    public stageY: number;
    public target: Node;
    public currentTarget: Node;
    constructor(type: EventType, pos: Point) {
        this.type = type;
        this.stageX = pos.x;
        this.stageY = pos.y;
    }
    public stopPropagation() {
        this.stop_pop = true;
    }
}
