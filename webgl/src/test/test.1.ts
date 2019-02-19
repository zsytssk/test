import { drawText } from '../engine/drawText';
import { m3 } from '../utils/utils';

export function testDraw(gl: WebGLRenderingContext) {
    const translation = [100, 100];
    const scale = [1, 1];
    let rotation = 0;
    const pivot = [120, 90];

    function drawScene() {
        // rotation += 0.01;
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        let matrix = m3.translate(
            m3.identity(),
            translation[0],
            translation[1],
        );
        matrix = m3.rotate(matrix, rotation);
        matrix = m3.scale(matrix, scale[0], scale[1]);
        matrix = m3.translate(matrix, -pivot[0], -pivot[1]);
        drawText(
            gl,
            {
                text: 'hello',
                font: 'Sans-Serif',
                fontSize: 100,
                color: 'red',
                align: 'center',
                valign: 'middle',
                width: 100,
                height: 100,
            },
            matrix,
        );

        // requestAnimationFrame(drawScene);
    }
    drawScene();
}
