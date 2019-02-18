import { initEngine } from '../canvas/canvas';
import { Graphics } from '../node/graphics';
import { Image } from '../node/image';
import { Node } from '../node/node';
import { Stage } from '../node/stage';
import { Text } from '../node/text';
import { Texture } from '../node/texture';

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
        renderNode(stage);
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

function renderNode(node: Node) {
    engine.save();
    if (node.is_top) {
        const { canvas_width, canvas_height } = node as Stage;
        engine.clear(0, 0, canvas_width, canvas_height);
    }
    if (!node.visible) {
        return;
    }
    const { matrix, alpha, graphics } = node;
    if (alpha !== 1) {
        engine.setAlpha(alpha);
    }
    engine.transform(matrix);
    if (graphics) {
        engine.drawGraphics(graphics);
    }
    if (node.type === 'Image') {
        const { textures } = node as Image;
        for (const texture of textures) {
            engine.drawTexture(texture);
        }
    } else if (node.type === 'Text') {
        engine.drawText(node as Text);
    }

    for (const item of node.children) {
        renderNode(item);
    }

    engine.restore();
}
