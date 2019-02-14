import { state as GlobalState } from '../main';
import { startRender, stopRender } from '../render/render';
import { setProps, setStyle } from '../utils/utils';
import { triggerResizeEvent } from './triggerEvent';

export type ResizeInfo = {
    canvas_width: number;
    canvas_height: number;
    canvas_scale: number;
    canvas_is_rotate: boolean;
};

type Stage = {
    canvas: HTMLCanvasElement;
    stage_width: number;
    stage_height: number;
};
let state = {} as Stage;
export function watchResize(
    canvas,
    stage,
    stage_width: number,
    stage_height: number,
) {
    canvas = canvas;
    setStyle(canvas, {
        position: 'absolute',
        left: 0,
        top: 0,
        webkitTransformOrigin: '0px 0px 0px',
        transformOrigin: '0px 0px 0px',
        touchAction: 'manipulation',
        background: GlobalState.bg_color,
        zIndex: 1000,
    });
    stage.width = stage_width;
    stage.height = stage_height;
    setProps(state, {
        canvas,
        stage_width,
        stage_height,
    });

    window.addEventListener('resize', onResize, false);
    onResize();
}
export function stopWatchResize() {
    window.removeEventListener('resize', onResize, false);
    state = undefined;
}
let timeout;
function onResize() {
    const { screen_mode } = GlobalState;
    const {
        clientWidth: client_w,
        clientHeight: client_h,
    } = document.documentElement;
    const { canvas, stage_width, stage_height } = state;

    canvas.height = 0;
    canvas.width = 0;
    stopRender();

    clearTimeout(timeout);
    /** 大小先设置为0,0 然后再去重设, 不这样页面在浏览器旋转之后canvas 无法填充满页面  */
    timeout = setTimeout(() => {
        let canvas_is_rotate = false;

        let nw = client_w;
        let nh = client_h;
        if (screen_mode === 'horizontal') {
            if (client_h > client_w) {
                canvas_is_rotate = true;
                const t = nh;
                nh = nw;
                nw = t;
            }
        } else {
            if (client_h < client_w) {
                canvas_is_rotate = true;
                const t = nh;
                nh = nw;
                nw = t;
            }
        }

        const radio = nw / nh;
        const design_radio = stage_width / stage_height;

        let canvas_width;
        let canvas_height;
        if (radio > design_radio) {
            canvas_width = stage_height * radio;
            canvas_height = stage_height;
        } else {
            canvas_width = stage_width;
            canvas_height = stage_width / radio;
        }
        canvas_height = Math.ceil(canvas_height);
        canvas_width = Math.ceil(canvas_width);
        canvas.height = canvas_height;
        canvas.width = canvas_width;

        const canvas_scale = nw / canvas_width;
        if (!canvas_is_rotate) {
            setStyle(canvas, {
                webkitTransform: `scale(${canvas_scale})`,
            });
        } else {
            setStyle(canvas, {
                webkitTransform: `scale(${canvas_scale}) rotate(90deg) translate(0, -${canvas_height}px)`,
                transform: `scale(${canvas_scale}) rotate(90deg) translate(0, -${canvas_height}px)`,
            });
        }

        triggerResizeEvent('resize', {
            canvas_width,
            canvas_height,
            canvas_scale,
            canvas_is_rotate,
        } as ResizeInfo);

        startRender();
    }, 100);
}
