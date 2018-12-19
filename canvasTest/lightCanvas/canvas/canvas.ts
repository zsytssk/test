import { Image } from '../api/image';
import { Node } from '../api/node';
import { getRes } from '../utils/load';

export let ctx: CanvasRenderingContext2D;
export function draw(node: Node, canvas?: HTMLCanvasElement) {
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    ctx.save();
    const transform = node.calcTransform();
    ctx.transform(...transform);
    if (node instanceof Image) {
        drawImage(node as Image);
    }
    for (const item of node.children) {
        draw(item);
    }
    ctx.restore();
}

export function drawImage(img: Image) {
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
