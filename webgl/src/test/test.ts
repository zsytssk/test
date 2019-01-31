import { drawRect } from './rect';
import { getProgramInfo, draw } from './utils';

export function testDraw(gl: WebGLRenderingContext) {
    drawScene();

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // drawLine(gl, [100, 100, 200, 200, [0, 0, 0, 1], 1]);
        // drawRect(gl, [100, 100, 200, 200, [1, 0, 0, 1]]);
        drawTriangle(gl, [
            100,
            100,
            [200, 200, 100, 100, 100, 200],
            [1, 0, 0, 1],
        ]);
        requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene);
}

function drawPoly(gl: WebGLRenderingContext, params) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const inner = [];
    for (let i = 0; i < points.length; i += 2) {
        const triangle = [points[i],points[i+1],];
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
