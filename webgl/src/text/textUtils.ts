// Puts text in center of canvas.
let utils_ctx: CanvasRenderingContext2D;
function createTextImage(text: string, width: number, height: number) {
    if (!utils_ctx) {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        utils_ctx = canvas.getContext('2d');
    }
    utils_ctx.clearRect(0, 0, width, height);
    utils_ctx.font = '100px monospace';
    const w = utils_ctx.measureText(text).width;
    const h = parseInt(utils_ctx.font) * 1.2;
    utils_ctx.canvas.width = w;
    utils_ctx.canvas.height = h;
    utils_ctx.font = '100px monospace';
    utils_ctx.fillStyle = 'red';
    utils_ctx.textAlign = 'left';
    utils_ctx.textBaseline = 'top';
    utils_ctx.fillStyle = 'red';
    utils_ctx.fillText(text, 0, 0);
    return {
        image: utils_ctx.canvas,
        height: h,
        width: w,
    };
}

type TextData = {
    text: string;
    width: number;
    height: number;
};
export type TextureData = {
    texture: WebGLTexture;
    width: number;
    height: number;
};
export function createTextTexture(
    gl: WebGLRenderingContext,
    image: TexImageSource,
): TextureData {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
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

    const textureInfo = {
        width: 1,
        height: 1,
        texture: tex,
    };
    textureInfo.width = image.width;
    textureInfo.height = image.height;

    gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return textureInfo;
}
