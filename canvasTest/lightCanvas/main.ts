import { Stage } from './api/stage';
import { render } from './render/render';

export let stage: Stage;
export function init() {
    stage = new Stage();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    render(canvas, stage);

    return stage;
}
