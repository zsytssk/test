import { createProgram } from '../utils';
import * as fragmentShaderSource from './fragment.glsl';
import * as vertexShaderSource from './vertex.glsl';

export function testDraw(gl: WebGLRenderingContext) {
    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    drawScene();

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}
