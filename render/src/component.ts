export abstract class BaseCtrl {
    public readonly name: string;
    private parent: BaseCtrl;
    private children = [] as BaseCtrl[];
    private node;
    public render() {
        return '';
    }
    public getRenderNode() {
        this.node = this.render();
    }
    public draw() {
        this.getRenderNode();
        const child_list = this.children;
        const draw = [];
        draw.push(this.node);
        for (const child of child_list) {
            draw.push(child.draw());
        }
        return draw;
    }
    /**  添加childCtrl  */
    public addChild(childCtrl: BaseCtrl | string) {
        const child_list = this.children;
        if (typeof childCtrl === 'string') {
            childCtrl = new StrCtrl(childCtrl);
        }

        // 如果只有一个元素, 不需要这些只需要下面的操作
        child_list.push(childCtrl);
        childCtrl.parent = this;
    }
    /**  删除childCtrl  */
    public removeChild(childCtrl: BaseCtrl) {
        const child_index = this.children.indexOf(childCtrl);
        if (child_index === -1) {
            return;
        }
        this.children.splice(child_index, 1);
    }
    public removeChildren() {
        for (let len = this.children.length, i = len - 1; i >= 0; i--) {
            this.children[i].destroy();
        }
        this.children = [];
    }

    public getChildAt(index: number): BaseCtrl {
        if (index >= this.children.length) {
            return null;
        }
        return this.children[index];
    }
    public getChildByName(name: string): BaseCtrl {
        for (const child of this.children) {
            if (child.name === name) {
                return child;
            }
        }
        return null;
    }
    /**  获得ctrl子元素的个数  */
    public get numChildren(): number {
        return this.children.length;
    }
    /**  取消所有的事件绑定 从父类Ctrl中删除自己 删除model 删除link */
    public destroy() {
        this.removeChildren();

        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
    }
}

class StrCtrl extends BaseCtrl {
    constructor(private str) {
        super();
    }
    public render() {
        return this.str;
    }
}
