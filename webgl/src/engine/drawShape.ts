import { m3 } from '../utils/utils';
import { getProgramInfo } from './glslUtil';

export function drawPoly(gl: WebGLRenderingContext, params, matrix: number[]) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const inner = [];
    for (let i = 0; i < points.length - 3; i += 4) {
        if (i === 0) {
            inner.push(getPointIndex(points, i), getPointIndex(points, i + 1));
        }
        // prettier-ignore
        if (i >= points.length) {
            i = i - points.length;
        }
        const triangle = [
            getPointIndex(points, i),
            getPointIndex(points, i + 1),
            getPointIndex(points, i + 2),
            getPointIndex(points, i + 3),
            getPointIndex(points, i + 4),
            getPointIndex(points, i + 5),
        ];
        drawTriangle(gl, [x, y, triangle, fillColor], matrix);
        inner.push(getPointIndex(points, i + 4), getPointIndex(points, i + 5));
        // drawTriangle(gl, [100, 100, [0, 0, 30, 10, 60, 0], [1, 0, 0, 1]]);

        // inner.push();
        // return;
    }
    if (inner.length === 6) {
        drawTriangle(
            gl,
            [x, y, inner, fillColor, lineColor, lineWidth],
            matrix,
        );
    } else if (inner.length > 6) {
        drawPoly(gl, [x, y, inner, fillColor, lineColor, lineWidth], matrix);
    }
}
function getPointIndex(points, index) {
    if (index >= points.length) {
        index = index - points.length;
    }
    return points[index];
}

export function drawTriangle(
    gl: WebGLRenderingContext,
    params,
    matrix: number[],
) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const position = [];
    for (let i = 0; i < points.length; i += 2) {
        position.push(points[i], points[i + 1]);
    }
    if (fillColor) {
        const color = [...fillColor];
        const count = 3;
        drawShape(gl, {
            position,
            color,
            count,
            matrix,
        });
    }
}

export function drawArc(gl: WebGLRenderingContext, params, matrix: number[]) {
    const [x, y, radius, sAngle, eAngle, fillColor] = params;

    const points = [];
    const num = 100;
    const dist_angle = (eAngle - sAngle) / num;
    for (let i = 0; i < num + 1; i++) {
        const angle = sAngle + dist_angle * i;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        points.push(px + x, py + y);
        drawTriangle(gl, [x, y, [x, y, px, py], fillColor], matrix);
    }
    for (let i = 0; i < points.length - 3; i += 2) {
        const p = [
            x,
            y,
            points[i],
            points[i + 1],
            points[i + 2],
            points[i + 3],
        ];
        drawTriangle(gl, [x, y, p, fillColor], matrix);
    }
}

type ShapeInfo = {
    position: number[];
    color: number[];
    matrix: number[];
    count?: number;
};
export function drawShape(gl: WebGLRenderingContext, draw_info: ShapeInfo) {
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
