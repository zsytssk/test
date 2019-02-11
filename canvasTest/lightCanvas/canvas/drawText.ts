import { Text } from '../node/text';
import { ctx } from './canvas';

export function drawText(node: Text) {
    const {
        stroke,
        strokeColor,
        text,
        font,
        fontSize,
        color,
        align,
        valign,
        italic,
        bold,
        width,
        height,
    } = node;
    if (!text) {
        return;
    }

    let x = 0;
    let y = 0;
    if (align === 'left') {
        x = 0;
    } else if (align === 'center') {
        x = width / 2;
    } else if (align === 'right') {
        x = width;
    }
    if (valign === 'top') {
        y = 0;
    } else if (valign === 'middle') {
        y = height / 2;
    } else if (valign === 'bottom') {
        y = height;
    }

    ctx.textBaseline = valign;
    ctx.textAlign = align;

    ctx.font = `${italic ? 'italic' : ''} ${
        bold ? 'bold' : ''
    } ${fontSize}px ${font}`;
    ctx.fillStyle = color;
    if (stroke) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = stroke;
        ctx.miterLimit = 2;
        ctx.strokeText(text, x, y);
    }

    ctx.fillText(text, x, y);
}
