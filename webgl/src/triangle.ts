// https://codepen.io/pen/?&editable=true&editors=101
// WebGL - Triangle with position for color
// from https://webglfundamentals.org/webgl/webgl-2d-triangle-with-position-for-color.html

'use strict';

import { createProgram } from './utils';

export function drawTriangle(gl: WebGLRenderingContext) {
    // Get the strings for our GLSL shaders
    const vertexShaderSource = `
        attribute vec2 a_position;

        uniform vec2 u_resolution;

        void main() {
        // convert the rectangle from pixels to 0.0 to 1.0
        vec2 zeroToOne = a_position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;

        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `;

    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position',
    );

    // look up uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(
        program,
        'u_resolution',
    );
    const colorUniformLocation = gl.getUniformLocation(program, 'u_color');

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [0, 0, 200, 0, 0, 200];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2; // 2 components per iteration
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset,
    );

    // set the resolution
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform4f(colorUniformLocation, 0, 0, 0, 0.5);

    // draw
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
}
