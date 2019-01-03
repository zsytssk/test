// https://codepen.io/pen/?&editable=true&editors=101
// WebGL - Triangle with position for color
// from https://webglfundamentals.org/webgl/webgl-2d-triangle-with-position-for-color.html

'use strict';

import { createProgram } from './utils';

export function drawTriangle(gl: WebGLRenderingContext) {
    // Get the strings for our GLSL shaders
    const vertexShaderSource = `
        attribute vec2 a_position;

        varying vec4 v_color;

        void main() {
            // Multiply the position by the matrix.
            gl_Position = vec4(vec3(a_position, 1).xy, 0, 1);

            // Convert from clipspace to colorspace.
            // Clipspace goes -1.0 to +1.0
            // Colorspace goes from 0.0 to 1.0
            v_color = gl_Position * 0.5 + 0.5;
        }
    `;
    const fragmentShaderSource = `
        precision mediump float;

        varying vec4 v_color;

        void main() {
            gl_FragColor = v_color;
        }
    `;

    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position',
    );

    // Create a buffer.
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Set Geometry.
    setGeometry(gl);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
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

    // Compute the matrix
    // let matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    // matrix = m3.translate(matrix, translation[0], translation[1]);
    // matrix = m3.rotate(matrix, angleInRadians);
    // matrix = m3.scale(matrix, scale[0], scale[1]);

    // // Set the matrix.
    // gl.uniformMatrix3fv(matrixLocation, false, matrix);

    // Draw the geometry.
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

// Fill the buffer with the values that define a triangle.
// Note, will put the values in whatever buffer is currently
// bound to the ARRAY_BUFFER bind point
function setGeometry(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, -100, 150, 125, -175, 100]),
        gl.STATIC_DRAW,
    );
}
