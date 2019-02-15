import { getProgramInfo } from './glslUtil';

export const m3 = {
    projection(width, height) {
        // Note: This matrix flips the Y axis so that 0 is at the top.
        return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
    },

    identity() {
        return [1, 0, 0, 0, 1, 0, 0, 0, 1];
    },

    translation(tx, ty) {
        return [1, 0, 0, 0, 1, 0, tx, ty, 1];
    },

    rotation(angleInRadians) {
        const c = Math.cos(angleInRadians);
        const s = Math.sin(angleInRadians);
        return [c, -s, 0, s, c, 0, 0, 0, 1];
    },

    scaling(sx, sy) {
        return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
    },

    multiply(a, b) {
        const a00 = a[0 * 3 + 0];
        const a01 = a[0 * 3 + 1];
        const a02 = a[0 * 3 + 2];
        const a10 = a[1 * 3 + 0];
        const a11 = a[1 * 3 + 1];
        const a12 = a[1 * 3 + 2];
        const a20 = a[2 * 3 + 0];
        const a21 = a[2 * 3 + 1];
        const a22 = a[2 * 3 + 2];
        const b00 = b[0 * 3 + 0];
        const b01 = b[0 * 3 + 1];
        const b02 = b[0 * 3 + 2];
        const b10 = b[1 * 3 + 0];
        const b11 = b[1 * 3 + 1];
        const b12 = b[1 * 3 + 2];
        const b20 = b[2 * 3 + 0];
        const b21 = b[2 * 3 + 1];
        const b22 = b[2 * 3 + 2];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
    },

    translate(m, tx, ty) {
        return m3.multiply(m, m3.translation(tx, ty));
    },

    rotate(m, angleInRadians) {
        return m3.multiply(m, m3.rotation(angleInRadians));
    },

    scale(m, sx, sy) {
        return m3.multiply(m, m3.scaling(sx, sy));
    },
};

type ShapeInfo = {
    position: number[];
    color: number[];
    matrix: number[];
    count?: number;
};
export function drawShape(gl: WebGLRenderingContext, draw_info: ShapeInfo) {
    const { position, color, matrix, count } = draw_info;
    const program_info = getProgramInfo(gl, 'shape');

    program_info.set('a_position', {
        value: new Float32Array([...position]),
    });

    // Compute the matrices
    let matrix_gl = m3.projection(
        gl.canvas.clientWidth,
        gl.canvas.clientHeight,
    );

    matrix_gl = m3.multiply(matrix_gl, matrix);
    program_info.set('u_matrix', matrix_gl);
    program_info.set('u_color', color);

    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    gl.drawArrays(primitiveType, offset, count || 3);
}

type TextureInfo = {
    texture: WebGLTexture;
    width: number;
    height: number;
    matrix: number[];
    count?: number;
};
export function drawTexture(gl: WebGLRenderingContext, draw_info: TextureInfo) {
    const { texture, matrix, width, height } = draw_info;
    const program_info = getProgramInfo(gl, 'texture');

    program_info.set('a_position', {
        value: new Float32Array(getRectanglePoints(100, 100, width, height)),
    });
    program_info.set('a_texcoord', {
        value: new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]),
    });

    // Compute the matrices
    let matrix_gl = m3.projection(
        gl.canvas.clientWidth,
        gl.canvas.clientHeight,
    );

    matrix_gl = m3.multiply(matrix_gl, matrix);
    program_info.set('u_matrix', matrix_gl);

    program_info.set('u_texture', texture);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}

export function createTexture(
    gl: WebGLRenderingContext,
    image: TexImageSource,
) {
    const texture = gl.createTexture();
    const { width, height } = image;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]),
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    return {
        texture,
        width,
        height,
    };
}
export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => {
            return resolve(img);
        });
        img.src = url;
    });
}

export function getPolygonPoints(r: number, n: number) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const degree = (Math.PI * 2 * i) / n;
        const x = Math.cos(degree) * r;
        const y = Math.sin(degree) * r;
        points.push(x, y);
    }
    return points;
}

function getRectanglePoints(x, y, width, height) {
    const x1 = x;
    const x2 = x + width;
    const y1 = y;
    const y2 = y + height;
    return [x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2];
}
