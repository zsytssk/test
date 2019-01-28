import { getProgramInfo, m3 } from './utils';

export function drawTriangle(gl, points: number[][]) {
    let data = [];
    points.forEach(item => {
        data = data.concat(item);
    });
    gl.bufferData(
        gl.ARRAY_BUFFER,
        // prettier-ignore
        new Float32Array(data),
        gl.STATIC_DRAW,
    );
}
export function drawLine(gl: WebGLRenderingContext, params) {
    const [fromX, fromY, toX, toY, lineColor, lineWidth] = params;
}

export function drawRect(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const angleInRadians = 0;
    const scale = [1, 0.5];
    const color = [Math.random(), Math.random(), Math.random(), 1];

    const [x, y, width, height, fillColor, lineColor, lineWidth] = params;

    const {
        program,
        positionLocation,
        positionBuffer,
        matrixLocation,
        colorLocation,
    } = getProgramInfo(gl);

    gl.useProgram(program);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

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
        positionLocation,
        size,
        type,
        normalize,
        stride,
        offset,
    );

    // Compute the matrices
    let matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, translation[0], translation[1]);
    matrix = m3.rotate(matrix, angleInRadians);
    matrix = m3.scale(matrix, scale[0], scale[1]);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    gl.uniform4fv(colorLocation, color);

    // draw
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

function bindRectPoints() {}
