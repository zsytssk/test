import { initEngine } from '../canvas/canvas';
import { Graphics } from '../node/graphics';
import { Node } from '../node/node';
import { Text } from '../node/text';
import { Texture } from '../node/texture';
import { renderNode } from './data';

export type Engine = {
    save(): void;
    restore(): void;
    clear(x: number, y: number, width: number, height: number): void;
    setAlpha(alpha: number): void;
    transform(matrix: number[]): void;
    drawTexture(texture: Texture): void;
    drawGraphics(graphics: Graphics): void;
    drawText(txt: Text): void;
};

let engine: Engine;
let requestId;
let renderStage;
export function render(canvas: HTMLCanvasElement, stage: Node, tick: FuncVoid) {
    if (!engine) {
        engine = initEngine(canvas);
    }
    renderStage = () => {
        renderNode(engine, stage);
        tick();
        requestId = requestAnimationFrame(renderStage);
    };
    requestId = requestAnimationFrame(renderStage);
}
export function stopRender() {
    cancelAnimationFrame(requestId);
}
export function startRender() {
    renderStage();
}
