import {
    ArcParams,
    Graphics,
    LineParams,
    PathParams,
    RectParams,
} from '../node/graphics';
import { ctx } from './canvas';

export function drawGraphics(graphics: Graphics) {
    const { graphics_list, alpha } = graphics;

    ctx.save();
    ctx.globalAlpha *= alpha;
    for (const item of graphics_list) {
        ctx.save();
        const { type, params } = item;
        if (type === 'line') {
            drawLine(params as LineParams);
        } else if (type === 'path') {
            drawPath(params as PathParams, false);
        } else if (type === 'rect') {
            drawRect(params as RectParams);
        } else if (type === 'poly') {
            drawPath(params as PathParams, true);
        } else if (type === 'arc') {
            drawArc(params as ArcParams);
        }
        ctx.restore();
    }
    ctx.restore();
}

function drawLine(params: LineParams) {
    const [fromX, fromY, toX, toY, lineColor, lineWidth] = params;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}
function drawRect(params: RectParams) {
    const [x, y, width, height, fillColor, lineColor, lineWidth] = params;
    if (lineWidth) {
        ctx.lineWidth = lineWidth;
    }
    if (lineColor) {
        ctx.strokeStyle = lineColor;
    }
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.stroke();
    }
}
function drawArc(params: ArcParams) {
    const [
        x,
        y,
        radius,
        sAngle,
        eAngle,
        clockWise,
        fillColor,
        lineColor,
        lineWidth,
    ] = params;

    if (lineWidth) {
        ctx.lineWidth = lineWidth;
    }
    if (lineColor) {
        ctx.strokeStyle = lineColor;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, sAngle, eAngle, clockWise);
    ctx.closePath();
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.stroke();
    }
}

function drawPath(params: PathParams, is_poly: boolean) {
    const [x, y, points, fillColor, lineColor, lineWidth] = params;

    if (lineWidth) {
        ctx.lineWidth = lineWidth;
    }
    if (lineColor) {
        ctx.strokeStyle = lineColor;
    }
    ctx.beginPath();
    for (const p of points) {
        ctx.lineTo(p.x, p.y);
    }
    if (is_poly) {
        ctx.closePath();
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    } else {
        ctx.stroke();
    }
}
