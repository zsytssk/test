import { draw, getProgramInfo } from './utils';

export function drawPoly(gl: WebGLRenderingContext, params) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const inner = [];
    for (let i = 0; i < points.length; i += 2) {
        const triangle = [points[i], points[i + 1]];
        drawTriangle(x, y, []);
        inner.push();
    }
}

function drawTriangle(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const rotation = 0;
    const scale = [1, 1];
    const [, , points, fillColor, lineColor, lineWidth] = params;
    const position = [...points];
    const program_info = getProgramInfo(gl);
    if (fillColor) {
        const color = [...fillColor];
        const count = 3;
        draw(gl, program_info, {
            position,
            color,
            translation,
            rotation,
            scale,
            count,
        });
    }
}
