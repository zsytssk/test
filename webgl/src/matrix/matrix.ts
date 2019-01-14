import { createProgram } from '../utils';

import * as fragmentShaderSource from './fragment.glsl';
import * as vertexShaderSource from './vertex.glsl';

export function drawMatrix(gl: WebGLRenderingContext) {
    // Link the two shaders into a program
    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);

    // look up where the vertex data needs to go.
    const positionAttributeLocation = gl.getAttribLocation(
        program,
        'a_position',
    );
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const colorLocation = gl.getUniformLocation(program, 'u_color');

    // Create a buffer and put three 2d clip space points in it
    const positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const translation = [100, 150];
    let angleInRadians = 0;
    const scale = [1, 1];
    const color = [Math.random(), Math.random(), Math.random(), 1];

    // Put geometry data into buffer
    setCharacterF(gl);
    drawScene();

    // Setup a ui.
    webglLessonsUI.setupSlider('#x', {
        value: translation[0],
        slide: updatePosition(0),
        max: gl.canvas.width,
    });
    webglLessonsUI.setupSlider('#y', {
        value: translation[1],
        slide: updatePosition(1),
        max: gl.canvas.height,
    });
    webglLessonsUI.setupSlider('#angle', { slide: updateAngle, max: 360 });
    webglLessonsUI.setupSlider('#scaleX', {
        value: scale[0],
        slide: updateScale(0),
        min: -5,
        max: 5,
        step: 0.01,
        precision: 2,
    });
    webglLessonsUI.setupSlider('#scaleY', {
        value: scale[1],
        slide: updateScale(1),
        min: -5,
        max: 5,
        step: 0.01,
        precision: 2,
    });

    function updatePosition(index) {
        return (event, ui) => {
            translation[index] = ui.value;
            drawScene();
        };
    }

    function updateAngle(event, ui) {
        let angleInDegrees = 360 - ui.value;
        angleInRadians = (angleInDegrees * Math.PI) / 180;
        drawScene();
    }

    function updateScale(index) {
        return (event, ui) => {
            scale[index] = ui.value;
            drawScene();
        };
    }

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

        // Compute the matrices
        let matrix = m3.projection(
            gl.canvas.clientWidth,
            gl.canvas.clientHeight,
        );
        matrix = m3.translate(matrix, translation[0], translation[1]);
        matrix = m3.rotate(matrix, angleInRadians);
        matrix = m3.scale(matrix, scale[0], scale[1]);

        // Set the matrix.
        gl.uniformMatrix3fv(matrixLocation, false, matrix);
        gl.uniform4fv(colorLocation, color);

        // draw
        const primitiveType = gl.TRIANGLES;
        offset = 0;
        const count = 18;
        gl.drawArrays(primitiveType, offset, count);
    }
}
const m3 = {
    projection(width, height) {
        // Note: This matrix flips the Y axis so that 0 is at the top.
        return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
    },

    identity() {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    },

    translation(tx, ty) {
        return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },

    rotation(angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, -s, 0, s, c, 0, 0, 0, 1];
    },

    scaling(sx, sy) {
        return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },

    multiply(a, b) {
        const a00 = a[0 * 3 + 0];
        const a01 = a[0 * 3 + 1];
        const a02 = a[0 * 3 + 2];
        const a10 = a[1 * 3 + 0];
        const a11 = a[1 * 3 + 1];
        const a12 = a[1 * 3 + 2];
        const a20 = a[2 * 3 + 0];
        const a21 = a[2 * 3 + 1];
        const a22 = a[2 * 3 + 2];
        const b00 = b[0 * 3 + 0];
        const b01 = b[0 * 3 + 1];
        const b02 = b[0 * 3 + 2];
        const b10 = b[1 * 3 + 0];
        const b11 = b[1 * 3 + 1];
        const b12 = b[1 * 3 + 2];
        const b20 = b[2 * 3 + 0];
        const b21 = b[2 * 3 + 1];
        const b22 = b[2 * 3 + 2];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
    },

    translate(m, tx, ty) {
        return m3.multiply(m, m3.translation(tx, ty));
    },

    rotate(m, angleInRadians) {
        return m3.multiply(m, m3.rotation(angleInRadians));
    },

    scale(m, sx, sy) {
        return m3.multiply(m, m3.scaling(sx, sy));
    },
};

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
