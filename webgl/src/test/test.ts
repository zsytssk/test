import { createProgram } from '../utils';

import * as fragmentShaderSource from './fragment.glsl';
import * as vertexShaderSource from './vertex.glsl';

export function testDraw(gl: WebGLRenderingContext) {
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
    const transitionUniformLocation = gl.getUniformLocation(
        program,
        'u_translation',
    );
    const rotationUniformLocation = gl.getUniformLocation(
        program,
        'u_rotation',
    );
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const transition = [200, 200];
    const angle = 0;
    const degree = (angle * Math.PI) / 180;
    const rotation = [Math.sin(degree), Math.cos(degree)];
    const color = [0, 0, 1, 1];
    setCharacterF(gl);
    drawScene();

    function drawScene() {
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

        // setRectAngle(gl, 0, 0, width, height);

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

        gl.uniform2fv(transitionUniformLocation, transition);
        gl.uniform2fv(rotationUniformLocation, rotation);
        // set the resolution
        gl.uniform2f(
            resolutionUniformLocation,
            gl.canvas.width,
            gl.canvas.height,
        );
        gl.uniform4fv(colorLocation, color);

        // draw
        const primitiveType = gl.TRIANGLES;
        offset = 0;
        const count = 18;
        gl.drawArrays(primitiveType, offset, count);
    }
}

function setRectAngle(gl, x, y, width, height) {
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

// Fill the buffer with the values that define a letter 'F'.
function setCharacterF(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        // prettier-ignore
        new Float32Array([
            // left column
            0, 0, 30, 0, 0, 150, 0, 150, 30, 0, 30, 150,
            // top rung
            30, 0, 100, 0, 30, 30, 30, 30, 100, 0, 100, 30,
            // middle rung
            30, 60, 67, 60, 30, 90, 30, 90, 67, 60, 67, 90,
        ]),
        gl.STATIC_DRAW,
    );
}
