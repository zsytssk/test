import { gridImage, gridPattern, gridSize } from '../utils/gridImage';
import { load } from '../utils/load';
import { throttleSyncCallToOne, watch } from '../utils/utils';
import { Node, NodeType } from './node';
import { Pattern, Texture } from './texture';

export class Image extends Node {
    @watch('calcTexture')
    public skin: string;
    @watch('updateTexture')
    public sizeGrid: string;
    public textures: Texture[] = [];
    @watch('updateTexture')
    public width;
    @watch('updateTexture')
    public height;
    public type: NodeType = 'Image';
    constructor() {
        super();
        this.on('added', () => {
            this.calcTexture();
        });
    }
    @throttleSyncCallToOne()
    private async calcTexture() {
        const { sizeGrid, skin, textures } = this;
        let { width, height } = this;
        const new_textures = [];

        if (textures) {
            for (const texture of textures) {
                texture.destroy();
            }
            this.textures = [];
        }
        if (!skin) {
            return;
        }
        const image = (await load({
            type: 'Image',
            url: skin,
        })) as HTMLImageElement;

        if (!sizeGrid) {
            const { width: sw, height: sh } = image;
            if (width === undefined) {
                width = sw;
            }
            if (height === undefined) {
                height = sh;
            }

            const texture = new Texture(image, {
                width,
                height,
            });
            new_textures.push(texture);
        } else {
            const size_grid = sizeGrid.split(',').map(item => {
                return Number(item);
            });
            const image_grid_arr = gridImage(image, size_grid);
            const grid_props = gridSize({ width, height }, size_grid);
            for (let i = 0; i < image_grid_arr.length; i++) {
                const { x, y, w, h } = grid_props[i];
                const pattern = gridPattern[i] as Pattern;
                const grid_image = image_grid_arr[i];
                const texture = new Texture(grid_image, {
                    x,
                    y,
                    width: w,
                    height: h,
                    pattern,
                });
                new_textures.push(texture);
            }
        }
        this.textures = new_textures;
        this.updateTexture();
        this.rePos();
    }
    private updateTexture() {
        const { sizeGrid, textures } = this;
        const { width, height } = this;

        if (textures.length <= 1) {
            return;
        }

        const size_grid = sizeGrid.split(',').map(item => {
            return Number(item);
        });
        const grid_props = gridSize({ width, height }, size_grid);
        for (let i = 0; i < textures.length; i++) {
            const { x, y, w, h } = grid_props[i];
            textures[i].updateProps({
                x,
                y,
                width: w,
                height: h,
            });
        }
        this.rePos();
    }
    public getBounds() {
        const { x, y } = this;
        const { textures } = this;
        let { height, width } = this;
        if (textures.length) {
            if (width === undefined) {
                width = textures[0].width;
            }
            if (height === undefined) {
                height = textures[0].height;
            }
        }
        return { x, y, height, width };
    }
}
