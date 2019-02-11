import { Node } from '../node/node';
import { zTimer } from './timer';

export function fade_in(sprite, time?: number, ease_fn?: string) {
    completeAni(sprite);
    const start_props = {
        alpha: 0,
        visible: true,
    };
    time = time ? 700 : time;

    ease_fn = ease_fn || 'circleOut';
    const end_props = {
        alpha: 1,
    };
    return tween({
        ease_fn,
        end_props,
        sprite,
        start_props,
        time,
    });
}
export function fade_out(sprite, time?: number, ease_fn?: string) {
    completeAni(sprite);

    time = time ? 700 : time;

    ease_fn = ease_fn || 'circleOut';
    const end_props = {
        alpha: 0,
    };
    return tween({
        ease_fn,
        end_props,
        sprite,
        time,
    }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
    });
}
export function scale_in(sprite, time?: number, ease_fn?: string) {
    completeAni(sprite);

    ease_fn = ease_fn || 'circleIn';
    time = time || 400;
    const start_props = {
        alpha: 0.2,
        scaleX: 0.2,
        scaleY: 0.2,
        visible: true,
    };
    const end_props = {
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
    };

    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export function scale_out(sprite, time?: number, ease_fn?: string) {
    completeAni(sprite);

    ease_fn = ease_fn || 'circleIn';
    time = time || 400;
    const end_props = {
        alpha: 0.2,
        scaleX: 0.2,
        scaleY: 0.2,
    };

    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        setStyle(sprite, { visible: false, scaleX: 1, scaleY: 1, alpha: 1 });
    });
}
export function slide_up_in(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    return new Promise((resolve, reject) => {
        if (!space) {
            const height = sprite.getBounds().height;
            space = height > 50 ? 50 : height;
        }
        completeAni(sprite);

        /** 因为completeAni 导致的动画完成函数要异步执行
         * 所以为了等待原来的函数执行完成 所以他自己必须异步执行
         */
        setTimeout(() => {
            ease_fn = ease_fn || 'circleOut';
            time = time || 200;
            const ori_y = sprite.y;
            const start_props = {
                alpha: 0,
                visible: true,
                y: ori_y + space,
            };
            const end_props = {
                alpha: 1,
                y: ori_y,
            };

            return tween({
                sprite,
                start_props,
                end_props,
                time,
                ease_fn,
            }).then(() => {
                resolve();
            });
        });
    });
}
export function slide_up_out(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const height = sprite.getBounds().height;
        space = height > 50 ? 50 : height;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_y = sprite.y;
    const end_props = {
        alpha: 0,
        y: ori_y - space,
    };

    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        setStyle(sprite, { visible: false, alpha: 1, y: ori_y });
    });
}
export function slide_down_in(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const height = sprite.getBounds().height;
        space = height > 50 ? 50 : height;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    const ori_y = sprite.y;
    const start_props = {
        alpha: 0,
        visible: true,
        y: ori_y - space,
    };
    const end_props = {
        alpha: 1,
        y: ori_y,
    };

    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export function slide_down_out(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    return new Promise((resolve, reject) => {
        if (!space) {
            const height = sprite.getBounds().height;
            space = height > 50 ? 50 : height;
        }
        completeAni(sprite);

        /** 因为completeAni 导致的动画完成函数要异步执行
         * 所以为了等待原来的函数执行完成 所以他自己必须异步执行
         */
        setTimeout(() => {
            ease_fn = ease_fn || 'circleIn';
            time = time || 200;
            const ori_y = sprite.y;
            const end_props = {
                alpha: 0,
                y: ori_y + space,
            };

            return tween({ sprite, end_props, time, ease_fn }).then(() => {
                setStyle(sprite, { visible: false, alpha: 1, y: ori_y });
                resolve();
            });
        });
    });
}
export function slide_left_in(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    const ori_x = sprite.x;
    const start_props = {
        alpha: 0,
        visible: true,
        x: ori_x + space,
    };
    const end_props = {
        alpha: 1,
        x: ori_x,
    };

    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export function slide_left_out(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_x = sprite.x;
    const end_props = {
        alpha: 0,
        x: ori_x + space,
    };

    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
        sprite.x = ori_x;
    });
}
export function slide_right_in(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleOut';
    time = time || 200;
    const ori_x = sprite.x;
    const start_props = {
        alpha: 0,
        visible: true,
        x: ori_x - space,
    };
    const end_props = {
        alpha: 1,
        x: ori_x,
    };

    return tween({ sprite, start_props, end_props, time, ease_fn });
}
export function slide_right_out(
    sprite,
    time?: number,
    ease_fn?: string,
    space?: number,
) {
    if (!space) {
        const width = sprite.getBounds().width;
        space = width > 50 ? 50 : width;
    }
    completeAni(sprite);

    ease_fn = ease_fn || 'circleIn';
    time = time || 200;
    const ori_x = sprite.x;
    const end_props = {
        alpha: 0,
        x: ori_x - space,
    };

    return tween({ sprite, end_props, time, ease_fn }).then(() => {
        sprite.visible = false;
        sprite.alpha = 1;
        sprite.x = ori_x;
    });
}
export function rotate(sprite, angle: number, time?: number, ease_fn?: string) {
    const ori_angle = Number(sprite.rotation);
    if (ori_angle !== ori_angle) {
        sprite.rotation = 0;
    }
    const end_props = {
        rotation: angle,
    };
    return tween({ sprite, end_props, time, ease_fn });
}
export function tween(data: {
    sprite;
    start_props?: AnyObj;
    end_props: AnyObj;
    time?: number;
    ease_fn?: string | Func<number>;
}) {
    return new Promise((resolve, reject) => {
        const { sprite, start_props, end_props } = data;
        if ((sprite as Node).destroyed) {
            return reject();
        }

        completeAni(sprite);

        let { ease_fn } = data;

        let { time } = data;
        const laya_Tween = new Laya.Tween();
        const Ease = Laya.Ease;

        ease_fn = ease_fn || Ease.linearNone;
        if (typeof ease_fn === 'string') {
            ease_fn = Ease[ease_fn];
        }

        setStyle(sprite, start_props);

        if (time === 0 || sprite.is_stop) {
            setStyle(sprite, end_props);
            resolve();
            return;
        }
        time = time || 300;

        /** 如果本身已经是那个属性就不做任何处理 */
        for (const key in end_props) {
            if (sprite[key] === end_props[key]) {
                delete end_props[key];
            }
        }
        if (!Object.keys(end_props).length) {
            resolve();
        }

        sprite.tween = laya_Tween.to(
            sprite,
            end_props,
            time,
            ease_fn as Func<number>,
            Laya.Handler.create(sprite, () => {
                if (!(sprite as Node).destroyed) {
                    resolve();
                } else {
                    reject();
                }
            }),
        );
    });
}
export function setStyle(sprite, props) {
    if (!props) {
        return;
    }
    for (const key in props) {
        if (!props.hasOwnProperty(key)) {
            continue;
        }
        sprite[key] = props[key];
    }
}
function jump(sprite, props, time_num) {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            setStyle(sprite, props);
            resovle();
        }, time_num);
    });
}

export async function tweenLoop({
    sprite,
    props_arr,
    time,
    ease_fn,
    is_jump,
    end_jump,
}: {
    sprite;
    props_arr: any[];
    time?: number;
    ease_fn?: string | Func<number>;
    is_jump?: boolean;
    end_jump?: boolean;
}) {
    const len = props_arr.length;
    let i = 0;
    stopAni(sprite);

    /** 等待原来的动画结束再继续执行 */

    function runItem() {
        if ((sprite as Node).destroyed) {
            return;
        }

        if (is_jump) {
            jump(sprite, props_arr[i], time);
        } else {
            let next = i + 1;
            if (next >= len) {
                if (end_jump) {
                    i = 0;
                    next = 1;
                } else {
                    next = 0;
                }
            }
            const start_props = props_arr[i];
            const end_props = props_arr[next];
            tween({
                ease_fn,
                end_props,
                sprite,
                start_props,
                time,
            });
        }
        i++;
        if (i >= len) {
            i = 0;
        }

        sprite.time_out = setTimeout(runItem, time);
    }

    runItem();
}

type TweenPropsParam = {
    callback: FuncVoid;
    start_props: any;
    end_props: any;
    time: number;
    time_fun?: string | Func<number>;
    step?: number;
    step_fun?: FuncVoid;
    not_caller_props?: boolean;
    caller?: any;
};

type TweenPropsItem = {
    callback: FuncVoid;
    caller: AnyObj;
    step_fun: FuncVoid;
    off: FuncVoid;
};

export function countDown(caller, count, on_step?, on_complete?) {
    const start_props = {
        x: count,
    };
    const end_props = {
        x: 0,
    };
    const time = count * 1000;
    const step = count + 1;
    const step_fun = step_props => {
        on_step(Math.floor(step_props.x));
    };
    return tweenProps({
        callback: on_complete,
        caller,
        end_props,
        start_props,
        step,
        step_fun,
        time,
    });
}

// tslint:disable-next-line:variable-name
export const tweenProps = (() => {
    const tmp = [] as TweenPropsItem[];
    function getVal(v1, v2, t) {
        return v1 + (v2 - v1) * t;
    }
    function completeNodeListener(caller, run?) {
        for (let i = tmp.length - 1; i >= 0; i--) {
            const caller_item = tmp[i].caller;
            const off = tmp[i].off;
            const callback = tmp[i].callback;
            if (caller_item !== caller) {
                continue;
            }
            if (run && callback && typeof callback === 'function') {
                callback();
            }
            if (off && typeof off === 'function') {
                off();
            }
            tmp.splice(i, 1);
        }
    }
    function tweenFun({
        callback,
        caller,
        start_props,
        end_props,
        time,
        time_fun,
        step_fun,
        step,
    }: TweenPropsParam) {
        const time_step = step ? time / step : 1000 / 60;
        const total_step = time / time_step;

        if (typeof time_fun === 'string') {
            time_fun = Laya.Ease[time_fun];
        }
        if (!time_fun) {
            time_fun = Laya.Ease.linearNone;
        }

        completeNodeListener(caller, true);

        if (!start_props) {
            start_props = {};
            for (const key of Object.keys(end_props)) {
                start_props[key] = caller[key] || 0;
            }
        }

        const calc_keys = [];
        for (const key of Object.keys(end_props)) {
            if (start_props[key] === end_props[key]) {
                continue;
            }
            calc_keys.push(key);
        }
        /** 所有属性都相同, 直接执行返回函数 */
        if (calc_keys.length === 0) {
            if (callback && typeof callback === 'function') {
                callback();
            }
            return;
        }

        const off = zTimer.loop(moveLoop, time_step);

        tmp.push({
            callback,
            caller,
            off, // 清理绑定
            step_fun,
        });

        let cur_step = 0;
        function moveLoop(times) {
            /** 如果node已经被清除, 直接注销绑定 */
            if (caller.destroyed || caller.is_stop) {
                return completeNodeListener(caller);
            } else if (cur_step >= total_step) {
                return completeNodeListener(caller, true);
            }

            const temp_obj = {};
            let t = cur_step / total_step;
            if (!time_fun) {
                t = (time_fun as Func<number>)(t, 0, 1, 1);
            }
            if (cur_step >= total_step) {
                for (const key of calc_keys) {
                    temp_obj[key] = end_props[key];
                }
            } else {
                for (const key of calc_keys) {
                    temp_obj[key] = getVal(start_props[key], end_props[key], t);
                }
            }

            if (typeof step_fun === 'function') {
                step_fun(temp_obj, times);
            } else {
                for (const key in temp_obj) {
                    if (!temp_obj.hasOwnProperty(key)) {
                        continue;
                    }
                    temp_obj[key] = getVal(start_props[key], end_props[key], t);
                }
            }

            cur_step += times;
        }
        moveLoop(1);

        return (run: boolean) => {
            completeNodeListener(caller, run);
        };
    }

    return tweenFun;
})();

export function stopAni(sprite) {
    if (!sprite) {
        return;
    }
    if (typeof sprite === 'function') {
        sprite();
    }
    if (sprite.time_out) {
        clearTimeout(sprite.time_out);
    }
    if (sprite.tween) {
        sprite.tween.complete();
        sprite.tween.clear();
    }
}
export function completeAni(sprite) {
    if (!sprite) {
        return;
    }
    if (sprite.tween) {
        sprite.tween.complete();
        sprite.tween.clear();
        sprite.tween = undefined;
    }
}
