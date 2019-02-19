import { createTexture, drawTexture } from '../engine/drawTexture';
import { loadImage, m3 } from '../utils/utils';

export function testTexture(gl: WebGLRenderingContext) {
    const translation = [0, 0];
    const scale = [1, 1];
    let rotation = 0;
    const pivot = [120, 90];

    let texture_info1;
    loadImage('/dist/image/star.jpg').then(image => {
        texture_info1 = createTexture(gl, image);
    });

    function drawScene() {
        // rotation += 0.01;
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        const num = 2;
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                let matrix = m3.translate(
                    m3.identity(),
                    translation[0] + i * 300,
                    translation[1] + j * 300,
                );
                matrix = m3.rotate(matrix, rotation);
                matrix = m3.scale(matrix, scale[0], scale[1]);
                matrix = m3.translate(matrix, -pivot[0], -pivot[1]);

                if (texture_info1) {
                    drawTexture(gl, {
                        ...texture_info1,
                        matrix,
                    });
                }
            }
        }
        requestAnimationFrame(drawScene);
    }
    drawScene();
}
