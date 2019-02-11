import { stopWatchCanvas, watchCanvas } from './event/watchCanvas';
import { Stage } from './node/stage';
import { render, stopRender } from './render/render';
import { clearImg } from './utils/imageMap';
import { clearRes } from './utils/load';
import { interval } from './utils/timer';
import { setProps } from './utils/utils';

type State = {
    canvas: HTMLCanvasElement;
    stage: Stage;
    base_path: string;
    bg_color: string;
    screen_mode: ScreenMode;
};
type ScreenMode = 'horizontal' | 'vertical';
export type Opt = {
    screen_mode?: ScreenMode;
    canvas?: HTMLCanvasElement;
    base_path?: string;
    bg_color?: string;
};
export let state = {
    base_path: '',
    bg_color: 'black',
    screen_mode: 'horizontal',
} as State;

export function init(width: number, height: number, opt: Opt) {
    let { canvas } = opt;
    if (!canvas) {
        canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
    }
    const stage = new Stage();
    setProps(state, {
        ...opt,
        canvas,
        stage,
    });

    render(canvas, stage, interval);
    watchCanvas(canvas, stage, width, height);
    return state;
}

export function destroy() {
    const { canvas, stage } = state;
    clearRes();
    clearImg();
    stopRender();
    stopWatchCanvas();
    stage.destroy();
    canvas.parentNode.removeChild(canvas);
    state = undefined;
}
