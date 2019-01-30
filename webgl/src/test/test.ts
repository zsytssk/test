import { drawLine, drawRect } from './shape';

export function testDraw(gl: WebGLRenderingContext) {
    drawScene();

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // drawLine(gl, [100, 100, 200, 200, [0, 0, 0, 1], 1]);
        drawRect(gl, [100, 100, 200, 200, , [1, 0, 0, 1], 2]);
        requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene);
}
