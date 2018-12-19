import { Image } from '../api/image';
import { Node } from '../api/node';
import { getRes } from '../utils/load';
import { angleTodegree as angleToDegree, degreeToAngle } from '../utils/utils';

export let ctx: CanvasRenderingContext2D;
export function draw(node: Node, canvas?: HTMLCanvasElement) {
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    ctx.save();
    if (node instanceof Image) {
        drawImage(node as Image);
    }
    for (const item of node.children) {
        draw(item);
    }
    ctx.restore();
}

export function drawImage(img: Image) {
    const { skin, x, y } = img;
    const img_ele = getRes(skin);
    if (img_ele) {
        const { pivotX, pivotY } = img;
        let { width, height, rotation } = img;
        if (!width && !height) {
            width = img_ele.width;
            height = img_ele.height;
        }
        rotation = degreeToAngle(rotation);
        ctx.rotate(rotation);
        ctx.translate(pivotX, pivotY);
        ctx.drawImage(img_ele, x, y, width, height);
        ctx.restore();
    }
}
