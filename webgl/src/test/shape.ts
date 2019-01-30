import { Point } from 'paper';
import { getProgramInfo, m3, ProgramInfo } from './utils';

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
type LineType = 'top' | 'middle' | 'bottom';
export function drawLine(
    gl: WebGLRenderingContext,
    params,
    type: LineType = 'middle',
) {
    const translation = [0, 0];
    const rotation = 0;
    const scale = [1, 1];

    const [fromX, fromY, toX, toY, lineColor, lineWidth] = params;

    const v = new Point(toX - fromX, toY - fromY);
    const pv = v.rotate(90);
    const ps = pv.normalize().multiply(lineWidth / 2);

    let sp1;
    let sp2;
    let ep1;
    let ep2;
    if (type === 'middle') {
        sp1 = [fromX - ps.x, fromY - ps.y];
        sp2 = [toX - ps.x, toY - ps.y];
        ep1 = [fromX + ps.x, fromY + ps.y];
        ep2 = [toX + ps.x, toY + ps.y];
    }
    if (type === 'top') {
        sp1 = [fromX - ps.x * 2, fromY - ps.y * 2];
        sp2 = [toX - ps.x * 2, toY - ps.y * 2];
        ep1 = [fromX, fromY];
        ep2 = [toX, toY];
    }
    if (type === 'bottom') {
        sp1 = [fromX, fromY];
        sp2 = [toX, toY];
        ep1 = [fromX + ps.x * 2, fromY + ps.y * 2];
        ep2 = [toX + ps.x * 2, toY + ps.y * 2];
    }

    const program_info = getProgramInfo(gl);

    // prettier-ignore
    const position = [
        sp1[0], sp1[1],
        sp2[0], sp2[1],
        ep1[0], ep1[1],
        ep1[0], ep1[1],
        ep2[0], ep2[1],
        sp2[0], sp2[1],
    ];
    const color = [...lineColor];
    const count = 6;
    draw(gl, program_info, {
        position,
        color,
        translation,
        rotation,
        scale,
        count,
    });
}
export function drawRect(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const rotation = 0;
    const scale = [1, 1];

    const [x, y, width, height, fillColor, lineColor, lineWidth] = params;

    const program_info = getProgramInfo(gl);
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;

    // prettier-ignore
    const position = [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
    if (fillColor) {
        const color = [...fillColor];
        const count = 6;
        draw(gl, program_info, {
            position,
            color,
            translation,
            rotation,
            scale,
            count,
        });
    }
    drawLine(gl, [x1, y1, x2, y1, lineColor, lineWidth], 'bottom');
    drawLine(gl, [x2, y1, x2, y2, lineColor, lineWidth], 'bottom');
    drawLine(gl, [x2, y2, x1, y2, lineColor, lineWidth], 'bottom');
    drawLine(gl, [x1, y2, x1, y1, lineColor, lineWidth], 'bottom');
}

type DrawInfo = {
    position: number[];
    color: number[];
    translation: number[];
    rotation: number;
    scale: number[];
    count?: number;
};
function draw(
    gl: WebGLRenderingContext,
    program_info: ProgramInfo,
    draw_info: DrawInfo,
) {
    const {
        program,
        positionLocation,
        positionBuffer,
        matrixLocation,
        colorLocation,
    } = program_info;
    const { position, color, translation, rotation, scale, count } = draw_info;
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
    let matrix = m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
    matrix = m3.translate(matrix, translation[0], translation[1]);
    matrix = m3.rotate(matrix, rotation);
    matrix = m3.scale(matrix, scale[0], scale[1]);

    // Set the matrix.
    gl.uniformMatrix3fv(matrixLocation, false, matrix);
    gl.uniform4fv(colorLocation, color);

    // draw
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    gl.drawArrays(primitiveType, offset, count || 5);
}
