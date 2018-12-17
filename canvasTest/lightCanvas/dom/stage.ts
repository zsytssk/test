import { Data } from '../../dop/data';
import { LcNode, NodeType } from './node';

export class Stage extends Data implements LcNode {
    public is_top = true;
    public type = 'stage' as NodeType;
    public width: number = 0;
    public height: number = 0;
    public x: number = 0;
    public y: number = 0;
    public alpha: number = 1;
}
