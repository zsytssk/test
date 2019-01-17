import { Image } from '../api/image';
import { Node } from '../api/node';
import { Text } from '../api/text';
import { drawGraphics } from './drawGraphic';
import { drawText } from './drawText';

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
        drawTexture(ctx, node as Image);
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

export function drawTexture(ctx: CanvasRenderingContext2D, img: Image) {
    const { texture } = img;

    const { width, height, image } = texture;
    ctx.drawImage(image, 0, 0, width, height);
}
