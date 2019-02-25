import { drawPoly } from '../engine/drawShape';
import { getPolygonPoints, m3 } from '../utils/utils';

export function testDraw(gl: WebGLRenderingContext) {
    const translation = [300, 300];
    const scale = [1, 1];
    let rotation = 0;
    const alpha = 0.5;
    const pivot = [0, 0];

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function drawScene() {
        rotation += 0.01;
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        let matrix1 = m3.translate(
            m3.identity(),
            translation[0],
            translation[1],
        );
        matrix1 = m3.rotate(matrix1, rotation);
        matrix1 = m3.scale(matrix1, scale[0], scale[1]);
        matrix1 = m3.translate(matrix1, -pivot[0], -pivot[1]);

        let matrix2 = m3.translate(
            m3.identity(),
            translation[0] + 100,
            translation[1],
        );
        matrix2 = m3.rotate(matrix2, rotation);
        matrix2 = m3.scale(matrix2, scale[0], scale[1]);
        matrix2 = m3.translate(matrix2, -pivot[0], -pivot[1]);
        const points = getPolygonPoints(100, 10);
        drawPoly(gl, [264, 166, points, [1, 0, 0, 1]], {
            matrix: matrix1,
            alpha,
        });
        drawPoly(gl, [264, 166, points, [0, 1, 1, 1]], {
            matrix: matrix2,
            alpha,
        });

        requestAnimationFrame(drawScene);
    }
    drawScene();
}
