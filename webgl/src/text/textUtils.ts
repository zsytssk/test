// Puts text in center of canvas.
let utils_ctx: CanvasRenderingContext2D;
function createTextImage(text: string, width: number, height: number) {
    if (!utils_ctx) {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        utils_ctx = canvas.getContext('2d');
    }
    utils_ctx.clearRect(0, 0, width, height);
    utils_ctx.font = '50px monospace';
    utils_ctx.fillStyle = 'red';
    utils_ctx.textAlign = 'center';
    utils_ctx.textBaseline = 'middle';
    utils_ctx.fillStyle = 'red';
    const w = utils_ctx.measureText(text);
    const h = parseInt(utils_ctx.font);
    utils_ctx.fillText(text, width / 2, height / 2);
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
    { text, width, height }: TextData,
): TextureData {
    const { image, width: w, height: h } = createTextImage(text, width, height);
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
