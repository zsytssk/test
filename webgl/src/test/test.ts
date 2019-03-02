import { createTexture, drawTexture } from '../engine/drawTexture';
import { loadImage, m3 } from '../utils/utils';

export function testDraw(gl: WebGLRenderingContext) {
    const translation = [100, 100];
    const scale = [1, 1];
    let rotation = 0;
    const alpha = 0.9;
    const pivot = [90, 90];

    let texture_info1;
    loadImage('/dist/image/f-texture.png').then(image => {
        texture_info1 = createTexture(gl, image);
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        const num = 5;
        let matrix = m3.translate(
            m3.identity(),
            translation[0],
            translation[1],
        );
        matrix = m3.rotate(matrix, rotation);
        matrix = m3.scale(matrix, scale[0], scale[1]);
        matrix = m3.translate(matrix, -pivot[0], -pivot[1]);

        if (texture_info1) {
            drawTexture(gl, {
                ...texture_info1,
                matrix,
                alpha,
            });
        }
        requestAnimationFrame(drawScene);
    }
    drawScene();
}
