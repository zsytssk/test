import { Point } from 'paper';
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
    const translation = [0, 0];
    const angleInRadians = 0;
    const scale = [1, 1];

    const [fromX, fromY, toX, toY, lineColor, lineWidth] = params;
    const color = [...lineColor];

    const v = new Point(toX - fromX, toY - fromY);
    const pv = v.rotate(Math.PI);
    const ps = pv.normalize().multiply(lineWidth / 2);
    console.log(pv, ps);
    const sp1 = [fromX - ps.x, fromY - ps.y];
    const sp2 = [toX - ps.x, toY - ps.y];
    const ep1 = [fromX + ps.x, fromY + ps.y];
    const ep2 = [toX + ps.x, toY + ps.y];
    console.log(sp1, sp2, ep1, ep2);

    const {
        program,
        positionLocation,
        positionBuffer,
        matrixLocation,
        colorLocation,
    } = getProgramInfo(gl);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // prettier-ignore
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            sp1[0], sp1[1],
            sp2[0], sp2[1],
            ep1[0], ep1[1],
            ep1[0], ep1[1],
            ep2[0], ep2[1],
            sp2[0], sp2[1],
        ]),
        gl.STATIC_DRAW,
    );

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
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

export function drawRect(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const angleInRadians = 0.3;
    const scale = [1, 1];

    const [x, y, width, height, fillColor, lineColor, lineWidth] = params;
    const color = [...fillColor];

    const {
        program,
        positionLocation,
        positionBuffer,
        matrixLocation,
        colorLocation,
    } = getProgramInfo(gl);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    setRectangle(gl, x, y, width, height);

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
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
}

// Fill the buffer with the values that define a rectangle.
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
