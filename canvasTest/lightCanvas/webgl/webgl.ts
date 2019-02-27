import { TextureData } from '../render/genData/getImage';
import { GraphicsData, TextData } from '../render/genData/getNodeData';
import { Engine } from '../render/render';
import { m3 } from '../utils/m3';
import { createTexture, drawTexture as GlDrawTexture } from './drawTexture';

const engine: Engine = {
    clear,
    setAlpha,
    setTransform,
    reset,
    drawTexture,
    drawGraphics,
    drawText,
};

let gl: WebGLRenderingContext;
export function initEngine(canvas: HTMLCanvasElement) {
    gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    return engine;
}
export function clear(x: number, y: number, width: number, height: number) {
    gl.viewport(0, 0, width, height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

let globalAlpha = 1;
export function setAlpha(alpha: number) {
    globalAlpha = alpha;
}
let globalMatrix;
export function setTransform(matrix: number[]) {
    globalMatrix = matrix;
}
export function reset() {
    globalMatrix = m3.identity();
    globalAlpha = 1;
}

function drawTexture(texture_source: TextureData) {
    const { image, width, height } = texture_source;
    const { texture } = createTexture(gl, image);
    GlDrawTexture(gl, {
        texture,
        width,
        height,
        matrix: globalMatrix,
        alpha: globalAlpha,
    });
}

function drawGraphics(graphics_source: GraphicsData) {}
function drawText(text_source: TextData) {}
