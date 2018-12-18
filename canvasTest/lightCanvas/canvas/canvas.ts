import { Image } from '../dom/image';
import { LcNode } from '../dom/node';
import { drawImage } from './img';

export let ctx;
export function draw(node: LcNode, canvas?: HTMLCanvasElement) {
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    if (node.type === 'image') {
        drawImage(node as Image);
    }
}
