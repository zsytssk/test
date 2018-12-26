import { Graphics } from '../api/graphics';

export function drawGraphics(
    ctx: CanvasRenderingContext2D,
    graphics: Graphics
) {
    const { lines, rects, alpha } = graphics;

    ctx.save();
    ctx.globalAlpha = alpha;
    for (const rect of rects) {
        ctx.save();
        const [x, y, width, height, fillColor, lineColor, lineWidth] = rect;
        if (lineWidth) {
            ctx.lineWidth = lineWidth;
        }
        if (lineColor) {
            ctx.strokeStyle = lineColor;
        }
        if (fillColor) {
            ctx.fillStyle = fillColor;
            ctx.fillRect(x, y, width, height);
        } else {
            ctx.rect(x, y, width, height);
        }
        ctx.restore();
    }

    for (const line of lines) {
        ctx.save();
        const [fromX, fromY, toX, toY, lineColor, lineWidth] = line;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}
