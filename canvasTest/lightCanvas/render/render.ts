import { ctx, draw } from '../canvas/canvas';

export function render(canvas: HTMLCanvasElement, stage: Stage) {
    draw(stage, canvas);

    window.requestAnimationFrame(time => {
        render(canvas, stage);
    });
}
