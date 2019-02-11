import { draw, getProgramInfo } from './utils';

export function testDraw(gl: WebGLRenderingContext) {
    drawScene();

    function drawScene() {
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // drawLine(gl, [100, 100, 200, 200, [0, 0, 0, 1], 1]);
        // drawRect(gl, [100, 100, 200, 200, [1, 0, 0, 1]]);
        // drawTriangle(gl, [
        //     100,
        //     100,
        //     [200, 200, 100, 100, 100, 200],
        //     [1, 0, 0, 1],
        // ]);
        drawPoly(gl, [
            264,
            166,
            [0, 0, 30, -10, 60, 0, 78.48, 57, 30, 93.48, -18.48, 57],
            [1, 0, 0, 1],
        ]);
        requestAnimationFrame(drawScene);
    }
    requestAnimationFrame(drawScene);
}

function drawPoly(gl: WebGLRenderingContext, params) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const inner = [];
    for (let i = 0; i < points.length; i += 4) {
        // prettier-ignore
        let end = false;
        if (i >= points.length) {
            i = i - points.length;
            end = true;
        }
        const triangle = [
            getPointIndex(points, i),
            getPointIndex(points, i + 1),
            getPointIndex(points, i + 2),
            getPointIndex(points, i + 3),
            getPointIndex(points, i + 4),
            getPointIndex(points, i + 5),
        ];
        drawTriangle(gl, [x, y, triangle, fillColor]);
        if (end) {
            break;
        }
        inner.push(getPointIndex(points, i + 4), getPointIndex(points, i + 5));
        // drawTriangle(gl, [100, 100, [0, 0, 30, 10, 60, 0], [1, 0, 0, 1]]);

        // inner.push();
        // return;
    }
    if (inner.length === 6) {
        drawTriangle(gl, [x, y, inner, fillColor, lineColor, lineWidth]);
    } else if (inner.length > 6) {
        drawPoly(gl, [x, y, inner, fillColor, lineColor, lineWidth]);
    }
}
function getPointIndex(points, index) {
    if (index >= points.length) {
        index = index - points.length;
    }
    return points[index];
}

function drawTriangle(gl: WebGLRenderingContext, params) {
    const translation = [0, 0];
    const rotation = 0;
    const scale = [1, 1];
    const [x, y, points, fillColor, lineColor, lineWidth] = params;
    const position = [];
    for (let i = 0; i < points.length; i += 2) {
        position.push(points[i] + x, points[i + 1] + y);
    }
    const program_info = getProgramInfo(gl);
    if (fillColor) {
        const color = [...fillColor];
        const count = 3;
        draw(gl, program_info, {
            position,
            color,
            translation,
            rotation,
            scale,
            count,
        });
    }
}
