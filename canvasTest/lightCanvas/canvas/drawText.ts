import { Text } from '../api/text';

export function drawText(ctx: CanvasRenderingContext2D, node: Text) {
    const { text, font, fontSize, color } = node;
    if (!text) {
        return;
    }
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillText(text, 0, 0);
}
