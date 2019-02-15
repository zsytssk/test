import { getProgramInfo } from './glslUtil';

export const m3 = {
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

type DrawInfo = {
    position: number[];
    color: number[];
    matrix: number[];
    count?: number;
};
export function drawShape(gl: WebGLRenderingContext, draw_info: DrawInfo) {
    const { position, color, matrix, count } = draw_info;
    const program_info = getProgramInfo(gl, 'shape');

    program_info.set('a_position', {
        value: new Float32Array([...position]),
    });

    // Compute the matrices
    let matrix_gl = m3.projection(
        gl.canvas.clientWidth,
        gl.canvas.clientHeight,
    );

    matrix_gl = m3.multiply(matrix_gl, matrix);
    program_info.set('u_matrix', matrix_gl);
    program_info.set('u_color', color);

    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    gl.drawArrays(primitiveType, offset, count || 3);
}
export function drawTexture(gl: WebGLRenderingContext, draw_info: DrawInfo) {
    const { position, color, matrix, count } = draw_info;
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
            ...position,
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
    let matrix_gl = m3.projection(
        gl.canvas.clientWidth,
        gl.canvas.clientHeight,
    );

    matrix_gl = m3.multiply(matrix_gl, matrix);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix_gl);
    gl.uniform4fv(colorLocation, color);

    // draw
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    gl.drawArrays(primitiveType, offset, count || 3);
}

export function getPolygonPoints(r: number, n: number) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const degree = (Math.PI * 2 * i) / n;
        const x = Math.cos(degree) * r;
        const y = Math.sin(degree) * r;
        points.push(x, y);
    }
    return points;
}
