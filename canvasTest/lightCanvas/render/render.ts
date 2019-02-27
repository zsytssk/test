// import { initEngine } from '../canvas/canvas';
import { Node } from '../node/node';
import { initEngine } from '../webgl/webgl';
import { TextureData } from './genData/getImage';
import {
    getNodeData,
    GraphicsData,
    ImageData,
    NodeData,
    StageData,
    TextData,
} from './genData/getNodeData';

export type Engine = {
    clear(x: number, y: number, width: number, height: number): void;
    setAlpha(alpha: number): void;
    setTransform(matrix: number[]): void;
    reset(): void;
    drawTexture(texture: TextureData): void;
    drawGraphics(graphics: GraphicsData): void;
    drawText(txt: TextData): void;
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

export function renderNode(node: Node) {
    /** 获取一维数组的数据 */
    const data_arr = getNodeData(node);
    renderData(data_arr);
}

/** 渲染数据 */
function renderData(data_arr: NodeData[]) {
    for (const item of data_arr) {
        const { type, alpha, matrix, graphics } = item as NodeData;
        if (type === 'Stage') {
            engine.reset();
            const { canvas_height, canvas_width } = item as StageData;
            engine.clear(0, 0, canvas_width, canvas_height);
        }
        if (alpha !== 1) {
            engine.setAlpha(alpha);
        }
        engine.setTransform(matrix);
        if (graphics) {
            engine.drawGraphics(graphics);
        }
        if (type === 'Image') {
            const { textures } = item as ImageData;
            for (const texture of textures) {
                engine.drawTexture(texture);
            }
        } else if (type === 'Text') {
            engine.drawText(item as TextData);
        }
    }
}
