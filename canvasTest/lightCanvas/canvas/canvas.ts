import { drawGraphics } from './drawGraphic';
import { drawText } from './drawText';
import { drawTexture } from './drawTexture';

const engine = {
    save,
    restore,
    clear,
    setAlpha,
    transform,
    translate,
    drawTexture,
    drawGraphics,
    drawText,
};
export let ctx: CanvasRenderingContext2D;
export function initEngine(canvas?: HTMLCanvasElement) {
    if (canvas) {
        ctx = canvas.getContext('2d');
    }
    return engine;
}

export function save() {
    ctx.save();
}
export function restore() {
    ctx.restore();
}

export function clear(x: number, y: number, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
}
export function setAlpha(alpha: number) {
    ctx.globalAlpha *= alpha;
}
export function transform(matrix: number[]) {
    ctx.transform(...matrix);
}
