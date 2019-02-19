import { createProgram } from '../../doc/utils1';
import * as fragmentShaderSource from './fragment.glsl';
import { createTextTexture, TextureData } from './textUtils';
import * as vertexShaderSource from './vertex.glsl';

export function drawText(gl: WebGLRenderingContext) {
    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const textureLocation = gl.getUniformLocation(program, 'u_texture');

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // prettier-ignore
    const positions = [
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // provide texture coordinates for the rectangle.
    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        // prettier-ignore
        new Float32Array([
            0, 0,
            0, 1,
            1, 0,
            1, 0,
            0, 1,
            1, 1,
        ]),
        gl.STATIC_DRAW,
    );

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        // gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        const texture = createTextTexture(gl, {
            text: 'hello',
            width: 500,
            height: 300,
        });

        drawTexture(texture, 0, 0);

        requestAnimationFrame(drawScene);
    }
    drawScene();

    function drawTexture(textureData: TextureData, dstX: number, dstY: number) {
        const {
            texture: tex,
            width: texWidth,
            height: texHeight,
        } = textureData;
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        gl.enableVertexAttribArray(texcoordLocation);
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        let matrix = m4.orthographic(
            0,
            gl.canvas.width,
            gl.canvas.height,
            0,
            -1,
            1,
        );
        matrix = m4.translate(matrix, dstX, dstY, 0);

        matrix = m4.scale(matrix, texWidth, texHeight, 1);

        gl.uniformMatrix4fv(matrixLocation, false, matrix);
        gl.uniform1i(textureLocation, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
}
