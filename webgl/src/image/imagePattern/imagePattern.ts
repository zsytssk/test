// https://codepen.io/pen/?&editable=true&editors=101
// WebGL - Triangle with position for color
// from https://webglfundamentals.org/webgl/webgl-2d-triangle-with-position-for-color.html

'use strict';

import { createProgram, loadImage } from '../../../doc/utils1';
import * as fragmentShaderSource from './ImageFragment.glsl';
import * as vertexShaderSource from './ImageVertex.glsl';

export async function drawImagePattern(gl: WebGLRenderingContext) {
    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    const image = await loadImage('/dist/image/f-texture.png');

    // look up where the vertex data needs to go.
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');
    const textureLocation = gl.getUniformLocation(program, 'u_texture');

    // Create a buffer to put three 2d clip space points in
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // // Set a rectangle the same size as the image.
    // setRectangle(gl, 0, 0, image.width * 2, image.height * 2);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            -0.5,
            -0.5,
            0.5,
            -0.5,
            -0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            0.5,
            -0.5,
            0.5,
        ]),
        gl.STATIC_DRAW,
    );

    // provide texture coordinates for the rectangle.
    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-3, -1, 2, -1, -3, 4, -3, 4, 2, -1, 2, 4]),
        gl.STATIC_DRAW,
    );

    // Create a texture.
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set the parameters so we can render any size image.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Upload the image into the texture.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);
    }

    {
        // Turn on the position attribute
        gl.enableVertexAttribArray(positionLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 3; // 2 components per iteration
        const type = gl.FLOAT; // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionLocation,
            size,
            type,
            normalize,
            stride,
            offset,
        );
    }

    {
        // Turn on the teccord attribute
        gl.enableVertexAttribArray(texcoordLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 2; // 2 components per iteration
        const type = gl.FLOAT; // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0; // start at the beginning of the buffer
        gl.vertexAttribPointer(
            texcoordLocation,
            size,
            type,
            normalize,
            stride,
            offset,
        );

        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Set the parameters so we can render any size image.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        const projectionMatrix = m4.orthographic(
            0,
            gl.canvas.clientWidth,
            gl.canvas.clientHeight,
            0,
            -1,
            1,
        );
        let matrix = m4.translate(
            projectionMatrix,
            gl.canvas.width / 2,
            gl.canvas.height / 2,
            0,
        );
        matrix = m4.scale(matrix, 80 * 2.5, 80 * 2.5, 1);
        matrix = m4.translate(matrix, 0.5, 0.5, 0);
        gl.uniform1i(textureLocation, 0);
        // Set the matrix.
        gl.uniformMatrix4fv(matrixLocation, false, matrix);
    }

    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function setRectangle(gl, x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
        gl.STATIC_DRAW,
    );
}
