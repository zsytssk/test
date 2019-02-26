import { Image } from '../../node/image';
import { Pattern, Texture } from '../../node/texture';

export interface ImageInfo {
    textures: TextureData[];
}

export interface TextureData {
    image: CanvasImageSource;
    x: number;
    y: number;
    width: number;
    height: number;
    pattern: Pattern;
}
export function getImageData(img: Image): { textures: TextureData[] } {
    const { textures: source_textures } = img;
    const textures = [];
    for (const texture of source_textures) {
        textures.push(getTextureData(texture));
    }
    return {
        textures,
    };
}
export function getTextureData(texture: Texture) {
    const { image, x, y, width, height, pattern } = texture;
    return { image, x, y, width, height, pattern };
}
