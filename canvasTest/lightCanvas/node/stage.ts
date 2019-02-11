import { ResizeInfo } from '../event/watchResize';
import { Engine } from '../render/render';
import { setProps } from '../utils/utils';
import { Node } from './node';

let stage: Stage;
export class Stage extends Node {
    public is_top = true;
    public canvas_height: number;
    public canvas_width: number;
    public canvas_is_rotate: boolean = false;
    public canvas_scale: number;
    constructor() {
        super();
        stage = this;
        this.on('resize', this.onResize.bind(this));
    }
    private onResize(data: ResizeInfo) {
        const { canvas_width, canvas_height } = data;
        const { width, height } = this;

        this.x = Math.round((canvas_width - width) / 2);
        this.y = Math.round((canvas_height - height) / 2);

        setProps(this as Stage, {
            ...data,
        });
    }
    /** @returns {Stage} */
    static get instance() {
        if (!stage) {
            stage = new this();
        }
        return stage;
    }
    public destroy() {
        super.destroy();
        stage = undefined;
    }
}
