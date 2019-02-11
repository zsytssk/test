type gridProps = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export const gridPattern = [
    'normal',
    'repeat-x',
    'normal',
    'repeat-y',
    'repeat',
    'repeat-y',
    'normal',
    'repeat-x',
    'normal',
];
export function gridImage(
    image: HTMLImageElement,
    grid: number[],
): CanvasImageSource[] {
    const source_size = {
        width: image.width,
        height: image.height,
    };
    const grid_props = gridSize(source_size, grid);
    const result = [] as CanvasImageSource[];
    for (const grid_item of grid_props) {
        const { x, y, w, h } = grid_item;
        const grid_image = clipImage(image, x, y, w, h);
        result.push(grid_image);
    }
    return result;
}
export function gridSize(box_size: BoxSize, grid: number[]): gridProps[] {
    const result: gridProps[] = [];
    const { width: sw, height: sh } = box_size;
    const [g1, g2, g3, g4] = grid;
    const grid1: gridProps = {
        x: 0,
        y: 0,
        w: g4,
        h: g1,
    };
    const grid2: gridProps = {
        x: g4,
        y: 0,
        w: sw - g4 - g2,
        h: g1,
    };
    const grid3: gridProps = {
        x: sw - g2,
        y: 0,
        w: g2,
        h: g1,
    };
    const grid4: gridProps = {
        x: 0,
        y: g1,
        w: g4,
        h: sh - g1 - g3,
    };
    const grid5: gridProps = {
        x: g4,
        y: g1,
        w: sw - g4 - g2,
        h: sh - g1 - g3,
    };
    const grid6: gridProps = {
        x: sw - g2,
        y: g1,
        w: g4,
        h: sh - g1 - g3,
    };
    const grid7: gridProps = {
        x: 0,
        y: sh - g3,
        w: g4,
        h: g3,
    };
    const grid8: gridProps = {
        x: g4,
        y: sh - g3,
        w: sw - g4 - g2,
        h: g3,
    };
    const grid9: gridProps = {
        x: sw - g2,
        y: sh - g3,
        w: g2,
        h: g3,
    };
    result.push(grid1, grid2, grid3, grid4, grid5, grid6, grid7, grid8, grid9);

    return result;
}

export function clipImage(image, clipX, clipY, clipWidth, clipHeight) {
    const canvas = document.createElement('canvas');
    const utils_ctx = canvas.getContext('2d');
    utils_ctx.canvas.width = clipWidth;
    utils_ctx.canvas.height = clipHeight;
    utils_ctx.drawImage(
        image,
        clipX,
        clipY,
        clipWidth,
        clipHeight,
        0,
        0,
        clipWidth,
        clipHeight,
    );

    return utils_ctx.canvas;
}
