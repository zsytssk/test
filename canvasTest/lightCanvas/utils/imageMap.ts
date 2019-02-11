import { gridImage } from './gridImage';
import { load } from './load';

type TextureMap = {
    [key: string]: {
        texture: HTMLImageElement;
        grid?: {
            [key: string]: CanvasImageSource[];
        };
    };
};

let map = {} as TextureMap;
export async function getImageData(
    url: string,
    grid?: number[],
    grid_index?: number,
) {
    let data = map[url];
    let image: HTMLImageElement;
    if (!data) {
        image = (await load({
            type: 'Image',
            url,
        })) as HTMLImageElement;
        data = {
            texture: image,
        };
    }

    if (!grid) {
        return data.texture;
    }

    let grid_map = data.grid;
    if (!grid_map) {
        grid_map = {};
    }
    const grid_str = grid.join(',');
    let grid_data = grid_map[grid_str];
    if (!grid_data) {
        grid_data = gridImage(image, grid);
    }
    if (grid_index === undefined) {
        return grid_data;
    }
    return grid_data[grid_index];
}
export function clearImg() {
    map = undefined;
}
