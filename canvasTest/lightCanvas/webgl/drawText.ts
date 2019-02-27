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
    const canvas_width = w > width ? w : width;
    const canvas_height = h > height ? h : height;
    canvas.width = canvas_width;
    canvas.height = canvas_height;

    let x = 0;
    let y = 0;
    if (align === 'left') {
        x = 0;
    } else if (align === 'center') {
        x = canvas_width / 2;
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

    // @test
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, canvas_width, canvas_height);
    // ctx.fillStyle = color;

    ctx.fillText(text, x, y);
    const texture = createTexture(gl, canvas);
    drawTexture(gl, {
        ...texture,
        matrix,
    });
}
