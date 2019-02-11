import { Stage } from '../node/stage';
import { setProps } from '../utils/utils';
import { triggerPosEvent } from './triggerEvent';

type Status = false | 'start' | 'move';
type TouchData = {
    start_pos: Point;
    pos: Point;
    status: Status;
    moved: boolean;
};
type Stage = {
    canvas: HTMLCanvasElement;
};
let state = {} as Stage;
let touch_data = {} as TouchData;
export function watchClick(canvas: HTMLCanvasElement) {
    canvas.addEventListener('touchstart', onTouchStart, false);
    canvas.addEventListener('touchmove', onTouchMove, false);
    canvas.addEventListener('touchend', onTouchEnd, false);
    canvas.addEventListener('touchcancel', onTouchEnd, false);

    setProps(state, {
        canvas,
    });
}
export function stopWatchClick() {
    const { canvas } = state;
    canvas.removeEventListener('touchstart', onTouchStart, false);
    canvas.removeEventListener('touchmove', onTouchMove, false);
    canvas.removeEventListener('touchend', onTouchEnd, false);
    canvas.removeEventListener('touchcancel', onTouchEnd, false);

    state = undefined;
    touch_data = undefined;
}

function onTouchStart(evt: TouchEvent) {
    const touches = evt.changedTouches;
    if (touches.length > 1) {
        return;
    }
    evt.stopPropagation();
    evt.preventDefault();
    const { clientX: x, clientY: y } = evt.touches[0];
    touch_data.status = 'start';
    touch_data.start_pos = {
        x,
        y,
    };
}
function onTouchMove(evt: TouchEvent) {
    const touches = evt.changedTouches;
    if (touches.length > 1) {
        return;
    }

    evt.stopPropagation();
    evt.preventDefault();
    if (touch_data.status === 'start') {
        touch_data.status = 'move';
    }
    const {
        start_pos: { x: sx, y: sy },
    } = touch_data;
    const { clientX: x, clientY: y } = evt.touches[0];
    if (x !== sx || y !== sy) {
        touch_data.moved = true;
    }
}
function onTouchEnd(evt: TouchEvent) {
    const touches = evt.changedTouches;
    if (touches.length > 1) {
        return;
    }
    const { moved } = touch_data;
    if (moved) {
        touch_data.moved = false;
        return;
    }
    evt.stopPropagation();
    evt.preventDefault();
    triggerPosEvent('click', touch_data.start_pos);
    setProps(touch_data, {
        status: 'normal' as Status,
        moved: false,
        start_pos: {} as Point,
    });
}
