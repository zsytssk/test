import { Stage } from './api/stage';
import { render } from './render/render';
import { fixCanvas } from './utils/utils';

export let stage: Stage;
export function init(canvas: HTMLCanvasElement) {
    stage = new Stage();
    render(canvas, stage);
    fixCanvas(canvas);
    return stage;
}
