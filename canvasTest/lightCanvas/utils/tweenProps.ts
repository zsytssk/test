import { loop } from './timer';
import { setProps } from './utils';

// tweenProps({
//     start_props: { alpha: 1 },
//     end_props: { alpha: 0 },
//     callback: () => {
//         alert('1');
//     },
//     step_fun: (props: ClassProps<Node>) => {
//         setProps(scene, props);
//     },
//     time: 5000,
// });
type TweenPropsParam = {
    callback: FuncVoid;
    start_props: any;
    end_props: any;
    time: number;
    ease_fun?: Func<number>;
    step?: number;
    step_fun?: FuncVoid;
};
export function tweenProps({
    callback,
    start_props,
    end_props,
    time,
    ease_fun,
    step_fun,
    step,
}: TweenPropsParam) {
    const time_step = step ? time / step : 1000 / 60;
    const total_step = time / time_step;

    const off = loop(moveLoop, time_step);

    let cur_step = 0;

    function moveLoop(times) {
        let completed = false;
        const temp_obj = {};
        let t = cur_step / total_step;
        if (ease_fun) {
            t = ease_fun(t, 0, 1, 1);
        }

        if (cur_step >= total_step) {
            completed = true;
            setProps(temp_obj, end_props);
        } else {
            for (const key in end_props) {
                if (!end_props.hasOwnProperty(key)) {
                    continue;
                }
                temp_obj[key] = getVal(start_props[key], end_props[key], t);
            }
        }

        if (typeof step_fun === 'function') {
            step_fun(temp_obj, times);

            if (completed) {
                off();
                callback();
            }
        }

        cur_step += times;
    }
    moveLoop(1);

    return off;
}

function getVal(v1, v2, t) {
    return v1 + (v2 - v1) * t;
}
