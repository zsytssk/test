import { Point } from 'paper';
import { draw, getProgramInfo } from './utils';

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
