import { Text } from '../api/text';

export function drawText(ctx: CanvasRenderingContext2D, node: Text) {
    const { text, font, fontSize, color, align } = node;
    if (!text) {
        return;
    }
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillText(text, 0, 0);
}
