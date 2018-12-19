export class Node {
    public x: number = 0;
    public y: number = 0;
    public width = 0;
    public height = 0;
    public alpha = 1;
    public pivotX = 0;
    public pivotY = 0;
    public rotation = 0;
    public children = [] as Node[];
    protected parent: Node;
    public name: string;
    public is_top = false;
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
}
