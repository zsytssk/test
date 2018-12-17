export type NodeType = 'image' | 'stage' | 'box' | 'label';

export interface LcNode {
    is_top: boolean;
    width: number;
    height: number;
    type: NodeType;
    x: number;
    y: number;
    alpha: number;
    children: LcNode[];
}
