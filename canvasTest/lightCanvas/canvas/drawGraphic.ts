import {
    ArcParams,
    Graphics,
    LineParams,
    RectParams,
    PathParams,
} from '../api/graphics';

export function drawGraphics(
    ctx: CanvasRenderingContext2D,
    graphics: Graphics,
) {
    const { graphics_list, alpha } = graphics;

    ctx.save();
    ctx.globalAlpha = alpha;
    for (const item of graphics_list) {
        ctx.save();
        const { type, params } = item;
        if (type === 'line') {
            drawLine(ctx, params as LineParams);
        } else if (type === 'path') {
            drawPath(ctx, params as PathParams, false);
        } else if (type === 'rect') {
            drawRect(ctx, params as RectParams);
        } else if (type === 'poly') {
            drawPath(ctx, params as PathParams, true);
        } else if (type === 'arc') {
            drawArc(ctx, params as ArcParams);
        }
        ctx.restore();
    }
    ctx.restore();
}

function drawLine(ctx: CanvasRenderingContext2D, params: LineParams) {
    const [fromX, fromY, toX, toY, lineColor, lineWidth] = params;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}
function drawRect(ctx: CanvasRenderingContext2D, params: RectParams) {
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
function drawArc(ctx: CanvasRenderingContext2D, params: ArcParams) {
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

function drawPath(
    ctx: CanvasRenderingContext2D,
    params: PathParams,
    is_poly: boolean,
) {
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
