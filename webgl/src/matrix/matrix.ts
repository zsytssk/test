import { draw, getPolygonPoints, getProgramInfo } from './utils';

export function drawMatrix(gl: WebGLRenderingContext) {
    const translation = [300, 300];
    const scale = [1, 1];
    let rotation = 0;

    function drawScene() {
        rotation += 0.01;
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        const points = getPolygonPoints(100, 10);
        const pivot = [0, 0];
        drawPoly(gl, [0, 0, points, [1, 0, 0, 1]], {
            translation,
            scale,
            rotation,
            pivot,
        });
        requestAnimationFrame(drawScene);
    }
    drawScene();
    requestAnimationFrame(drawScene);
}
type Transform = {
    translation: number[];
    scale: number[];
    pivot: number[];
    rotation: number;
};
function drawPoly(gl: WebGLRenderingContext, params, transform: Transform) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const inner = [];
    for (let i = 0; i < points.length - 3; i += 4) {
        if (i == 0) {
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
        drawTriangle(gl, [x, y, triangle, fillColor], transform);
        inner.push(getPointIndex(points, i + 4), getPointIndex(points, i + 5));
        // drawTriangle(gl, [100, 100, [0, 0, 30, 10, 60, 0], [1, 0, 0, 1]]);

        // inner.push();
        // return;
    }
    if (inner.length === 6) {
        drawTriangle(
            gl,
            [x, y, inner, fillColor, lineColor, lineWidth],
            transform,
        );
    } else if (inner.length > 6) {
        drawPoly(gl, [x, y, inner, fillColor, lineColor, lineWidth], transform);
    }
}
function getPointIndex(points, index) {
    if (index >= points.length) {
        index = index - points.length;
    }
    return points[index];
}

function drawTriangle(gl: WebGLRenderingContext, params, transform: Transform) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const position = [];
    for (let i = 0; i < points.length; i += 2) {
        position.push(points[i], points[i + 1]);
    }
    const program_info = getProgramInfo(gl);
    const { translation, scale, rotation, pivot } = transform;
    if (fillColor) {
        const color = [...fillColor];
        const count = 3;
        draw(gl, program_info, {
            position,
            color,
            translation,
            rotation,
            scale,
            pivot,
            count,
        });
    }
}

function drawArc(gl: WebGLRenderingContext, params, transform: Transform) {
    const [x, y, radius, sAngle, eAngle, fillColor] = params;

    const points = [];
    const num = 100;
    const dist_angle = (eAngle - sAngle) / num;
    for (let i = 0; i < num + 1; i++) {
        const angle = sAngle + dist_angle * i;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        points.push(px + x, py + y);
        drawTriangle(gl, [x, y, [x, y, px, py], fillColor], transform);
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
        drawTriangle(gl, [x, y, p, fillColor], transform);
    }
}
