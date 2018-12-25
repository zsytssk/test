import { NodeData } from '../dom/node';
import { degreeToAngle } from '../utils/utils';

export class Node {
    public x: number = 0;
    public y: number = 0;
    public width = 0;
    public height = 0;
    public alpha = 1;
    public scaleX = 1;
    public scaleY = 1;
    public pivotX = 0;
    public pivotY = 0;
    public rotation = 0;
    public visible = true;
    public children = [] as Node[];
    protected parent: Node;
    public name: string;
    public is_top = false;
    public data: NodeData;
    public addChild(child: Node) {
        const { children } = this;
        children.push(child);
        child.parent = this;
    }
    public addChildren(child_list: Node[]) {
        const { children } = this;
        for (const item of child_list) {
            children.push(item);
            item.parent = this;
        }
    }
    /** 删除child */
    public removeChild(child: Node) {
        const { children } = this;
        const idx = children.indexOf(child);
        if (idx === -1) {
            return;
        }
        children.splice(idx, 1);
    }
    public removeChildren() {
        for (let len = this.children.length, i = len - 1; i >= 0; i--) {
            this.children[i].destroy();
        }
        this.children = [];
    }
    public getChildAt(idx: number): Node {
        const { children } = this;
        if (idx >= children.length) {
            return;
        }
        return children[idx];
    }
    public getChildByName(name: string): Node {
        const { children } = this;
        for (const child of children) {
            if (child.name === name) {
                return child;
            }
        }
        return;
    }
    /** 获得ctrl子元素的个数 */
    public get numChildren(): number {
        return this.children.length;
    }
    public destroy() {
        const { parent, children } = this;
        if (parent) {
            parent.removeChild(this);
            this.parent = null;
        }

        for (let len = children.length, i = len - 1; i >= 0; i--) {
            children[i].destroy();
        }
        this.children = [];
    }
    public calcTransform() {
        const { x, y, rotation, scaleX, scaleY } = this;
        const m = [1, 0, 0, 1, 0, 0] as [
            number,
            number,
            number,
            number,
            number,
            number
        ];

        m[4] += m[0] * x + m[2] * y;
        m[5] += m[1] * x + m[3] * y;

        // rotate
        const rad = degreeToAngle(rotation);
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        const m11 = m[0] * c + m[2] * s;
        const m12 = m[1] * c + m[3] * s;
        const m21 = m[0] * -s + m[2] * c;
        const m22 = m[1] * -s + m[3] * c;
        m[0] = m11;
        m[1] = m12;
        m[2] = m21;
        m[3] = m22;

        // scale
        m[0] *= scaleX;
        m[1] *= scaleX;
        m[2] *= scaleY;
        m[3] *= scaleY;

        return m;
    }
}
