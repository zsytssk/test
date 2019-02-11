import { Stage } from '../node/stage';
import { stopWatchClick, watchClick } from './watchClick';
import { stopWatchResize, watchResize } from './watchResize';

export function watchCanvas(
    canvas: HTMLCanvasElement,
    stage: Stage,
    width: number,
    height: number,
) {
    watchClick(canvas);
    watchResize(canvas, stage, width, height);
}
export function stopWatchCanvas() {
    stopWatchClick();
    stopWatchResize();
}

export function convertPosClientToStage(pos: Point) {
    const {
        canvas_scale,
        canvas_is_rotate,
        width,
        height,
        canvas_height,
        x: stage_x,
        y: stage_y,
    } = Stage.instance;
    let canvas_x;
    let canvas_y;
    let x;
    let y;
    let out_stage = false;
    if (!canvas_is_rotate) {
        canvas_x = pos.x / canvas_scale;
        canvas_y = pos.y / canvas_scale;
    } else {
        canvas_x = pos.y / canvas_scale;
        canvas_y = canvas_height - pos.x / canvas_scale;
    }
    x = Math.ceil(canvas_x - stage_x);
    y = Math.ceil(canvas_y - stage_y);

    if (x < 0 || y < 0 || x > width || y > height) {
        out_stage = true;
    }
    return { x, y, out_stage };
}
