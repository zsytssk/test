import { createTexture, drawTexture } from './drawTexture';

export function drawText(gl: WebGLRenderingContext, node, matrix) {
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
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    ctx.font = `${italic ? 'italic' : ''} ${
        bold ? 'bold' : ''
    } ${fontSize}px ${font}`;

    const w = ctx.measureText(text).width;
    const h = parseInt(ctx.font, 10) * 1.2;
    canvas.width = w > width ? w : width;
    canvas.height = h > height ? h : height;

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
    const texture = createTexture(gl, canvas);

    drawTexture(gl, {
        ...texture,
        matrix,
    });
}
