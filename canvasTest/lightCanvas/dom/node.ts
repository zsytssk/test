export type NodeType = 'image' | 'stage' | 'box' | 'label';

export class NodeData {
    public transform: number[];
    public type: NodeType;
    public children: NodeData[];
    public setTransform(transform: number[]) {
        this.transform = transform;
    }
}
