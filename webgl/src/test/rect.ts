import { drawLine } from './line';
import { draw, getProgramInfo } from './utils';

export function drawRect(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const rotation = 0;
    const scale = [1, 1];

    const [x, y, width, height, fillColor, lineColor, lineWidth] = params;

    const program_info = getProgramInfo(gl);
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    // prettier-ignore
    const position = [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
    if (fillColor) {
        const color = [...fillColor];
        const count = 6;
        draw(gl, program_info, {
            position,
            color,
            translation,
            rotation,
            scale,
            count,
        });
    }
    if (lineColor) {
        drawLine(gl, [x1, y1, x2, y1, lineColor, lineWidth], 'bottom');
        drawLine(gl, [x2, y1, x2, y2, lineColor, lineWidth], 'bottom');
        drawLine(gl, [x2, y2, x1, y2, lineColor, lineWidth], 'bottom');
        drawLine(gl, [x1, y2, x1, y1, lineColor, lineWidth], 'bottom');
    }
}
