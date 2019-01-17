import { Graphics } from './api/graphics';
import { Stage } from './api/stage';
import { render } from './render/render';
import { fixCanvas } from './utils/utils';

export let stage: Stage;
export function init(canvas: HTMLCanvasElement, width: number, height: number) {
    stage = new Stage();
    render(canvas, stage);
    stage.width = width;
    stage.height = height;
    fixCanvas(canvas, (w: number, h: number) => {
        let rotation = false;
        if (h > w) {
            rotation = true;
            const t = h;
            h = w;
            w = t;
        }
        const scale_x = w / width;
        const scale_y = h / height;
        const scale = Math.min(scale_x, scale_y);
        stage.scaleX = scale;
        stage.scaleY = scale;
        stage.pivotX = width / 2;
        stage.pivotY = height / 2;

        if (rotation) {
            stage.rotation = 90;
            stage.x = h / 2;
            stage.y = w / 2;
        } else {
            stage.rotation = 0;
            stage.x = w / 2;
            stage.y = h / 2;
        }
        console.log(w / 2, h / 2);
        stage.graphics = new Graphics();
        stage.graphics.drawRect(0, 0, width, height, 'red');
    });
    return stage;
}
