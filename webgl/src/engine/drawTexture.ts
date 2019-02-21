import { getRectanglePoints, m3 } from '../utils/utils';
import { getProgramInfo } from './glslUtil';
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
        value: new Float32Array(getRectanglePoints(0, 0, width, height)),
    });

    // [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1] 颠倒 xy
    // [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1] 正常
    program_info.set('a_texcoord', {
        value: new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
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
