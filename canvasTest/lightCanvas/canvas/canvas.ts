import { Engine } from '../render/render';
import { m3 } from '../utils/m3';
import { drawGraphics } from './drawGraphic';
import { drawText } from './drawText';
import { drawTexture } from './drawTexture';

const engine: Engine = {
    clear,
    setAlpha,
    setTransform,
    reset,
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

export function clear(x: number, y: number, width: number, height: number) {
    ctx.clearRect(0, 0, width, height);
}
export function setAlpha(alpha: number) {
    ctx.globalAlpha = alpha;
}
export function setTransform(matrix: number[]) {
    matrix = m3.toM2(matrix);
    ctx.setTransform(...(matrix as Number6));
}
export function reset() {
    ctx.resetTransform();
    ctx.globalAlpha = 1;
}
