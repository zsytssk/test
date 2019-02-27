import { Image } from '../../node/image';
import { Pattern, Texture } from '../../node/texture';

export interface ImageInfo {
    textures: TextureData[];
}
export type ImageSource = ImageBitmap | HTMLImageElement | HTMLCanvasElement;

export interface TextureData {
    image: ImageSource;
    x: number;
    y: number;
    width: number;
    height: number;
    pattern: Pattern;
}
export function getImageInfo(img: Image): { textures: TextureData[] } {
    const { textures: source_textures } = img;
    const textures = [];
    for (const texture of source_textures) {
        textures.push(getTextureInfo(texture));
    }
    return {
        textures,
    };
}
export function getTextureInfo(texture: Texture) {
    const { image, x, y, width, height, pattern } = texture;
    return { image, x, y, width, height, pattern };
}
