import { Event } from '../event/event';
import { m3 } from '../utils/m3';
import { degreeToAngle, watch } from '../utils/utils';
import { EventDispatcher } from './eventDispatcher';
import { Graphics } from './graphics';

export type NodeType = 'Image' | 'Node' | 'Text';
export class Node extends EventDispatcher {
    public name: string;
    @watch('calcTransform')
    public x: number = 0;
    @watch('calcTransform')
    public y: number = 0;
    public centerX: number;
    public centerY: number;
    public width: number;
    public height: number;
    public alpha = 1;
    @watch('calcTransform')
    public scaleX = 1;
    @watch('calcTransform')
    public scaleY = 1;
    @watch('calcTransform')
    public pivotX = 0;
    @watch('calcTransform')
    public pivotY = 0;
    @watch('calcTransform')
    public rotation = 0;
    public visible = true;
    public graphics: Graphics;
    public children = [] as Node[];
    protected parent: Node;
    public is_top = false;
    public matrix: number[] = [1, 0, 0, 1, 0, 0];
    public type: NodeType = 'Node';
    constructor() {
        super();
        this.on('added', () => {
            this.rePos();
            this.calcTransform();
        });
    }
    public addChild(child: Node) {
        const { children } = this;
        if (children.indexOf(child) !== -1) {
            return;
        }
        children.push(child);
        child.parent = this;
        child.event('added');
    }
    public addChildAt(child: Node, index: number) {
        const { children } = this;
        const ori_index = children.indexOf(child);
        children.splice(index, ori_index, child);
        child.parent = this;
        child.event('added');
    }
    public addChildren(...child_list: Node[]) {
        for (const item of child_list) {
            this.addChild(item);
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
        child.event('removed');
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
        super.destroy();
    }
    public calcTransform() {
        const { x, y, rotation, scaleX, scaleY, pivotX, pivotY } = this;
        const rad = degreeToAngle(rotation);
        let matrix = m3.translate(m3.identity(), x, y);
        matrix = m3.rotate(matrix, rad);
        matrix = m3.scale(matrix, scaleX, scaleY);
        matrix = m3.translate(matrix, -pivotX, -pivotY);

        this.matrix = m3.toM2(matrix);
        return matrix;
    }
    public globalToLocal(p: Point) {
        const { pivotX, pivotY, is_top } = this;
        if (is_top) {
            return p;
        }
        const out = this.parent.globalToLocal(p);
        // 从 laya 抄来的代码
        const [m0, m1, m2, m3, m4, m5] = this.matrix;
        const n = m0 * m3 - m1 * m2;
        const a2 = m3 / n;
        const b2 = -m1 / n;
        const c2 = -m2 / n;
        const d2 = m0 / n;
        const tx2 = (m2 * m5 - m3 * m4) / n;
        const ty2 = -(m0 * m5 - m1 * m4) / n;
        const x = a2 * out.x + c2 * out.y + tx2;
        const y = b2 * out.x + d2 * out.y + ty2;

        return {
            x: x + pivotX,
            y: y + pivotY,
        };
    }
    public localToGlobal(p: Point) {
        const { x, y, pivotX, pivotY, is_top } = this;
        if (is_top) {
            return p;
        }
        const parent_pos = {
            x: x + p.x - pivotX,
            y: y + p.y - pivotY,
        };
        return this.parent.localToGlobal(parent_pos);
    }
    /**
     * 触发自己绑定的事件evnt_name的绑定函数
     * @param event_name 事件名称
     * @param data 传过去的数据
     */
    public event(type: string, data?: {} | Event) {
        super.event(type, data);

        /** 事件冒泡 */
        if (data instanceof Event) {
            if (!data.stop_pop && this.parent) {
                this.parent.event(type, data);
            }
        }
    }
    public getBounds() {
        const { x, y, height, width } = this;
        return { x, y, height, width };
    }
    protected rePos() {
        const { centerX, centerY, pivotX, pivotY } = this;
        if (!this.parent) {
            return;
        }
        const { width: pw, height: ph } = this.parent.getBounds();
        const { width, height } = this.getBounds();
        if (!isNaN(Number(centerX))) {
            this.x = (pw - width) / 2 + centerX - pivotX;
        }
        if (!isNaN(Number(centerY))) {
            this.y = (ph - height) / 2 + centerY - pivotY;
        }
    }
}
