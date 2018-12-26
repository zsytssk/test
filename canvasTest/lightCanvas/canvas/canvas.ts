import { Image } from '../api/image';
import { Node } from '../api/node';
import { Text } from '../api/text';
import { getRes } from '../utils/load';
import { drawText } from './drawText';
import { drawGraphics } from './drawGraphic';

let ctx: CanvasRenderingContext2D;
export function draw(node: Node, canvas?: HTMLCanvasElement) {
    if (canvas) {
        ctx = canvas.getContext('2d');
        initCtx(ctx);
    }
    if (node.is_top) {
        const { width, height } = node;
        ctx.clearRect(0, 0, width, height);
    }
    ctx.save();
    const { pivotX, pivotY, alpha, graphics } = node;
    ctx.globalAlpha *= alpha;
    const transform = node.calcTransform();
    ctx.transform(...transform);
    ctx.translate(-pivotX, -pivotY);
    if (graphics) {
        drawGraphics(ctx, graphics);
    }
    if (node instanceof Image) {
        drawImage(ctx, node as Image);
    }
    if (node instanceof Text) {
        drawText(ctx, node as Text);
    }
    for (const item of node.children) {
        draw(item);
    }
    ctx.restore();
}

/** 初始化ctx */
export function initCtx(ctx: CanvasRenderingContext2D) {}

export function drawImage(ctx: CanvasRenderingContext2D, img: Image) {
    const { skin } = img;
    const img_ele = getRes(skin);
    if (img_ele) {
        let { width, height } = img;
        if (!width && !height) {
            width = img_ele.width;
            height = img_ele.height;
        }
        ctx.drawImage(img_ele, 0, 0, width, height);
    }
}
