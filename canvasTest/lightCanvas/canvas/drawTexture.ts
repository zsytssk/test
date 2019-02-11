import { Texture } from '../node/texture';
import { ctx } from './canvas';

export function drawTexture(texture: Texture) {
    ctx.save();
    const { x, y, width, height, image, pattern } = texture;
    ctx.translate(x, y);
    if (pattern === 'normal') {
        ctx.drawImage(image, 0, 0, width, height);
    } else {
        const fill_pattern = ctx.createPattern(image, pattern);
        ctx.fillStyle = fill_pattern;
        ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
}
