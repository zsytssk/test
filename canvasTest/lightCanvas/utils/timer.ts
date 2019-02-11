/**
 * 像interval一样的重复执行函数, 只是全部通过 requestAnimationFrame 来实现的
 */
type HookFunItem = {
    /**  监听事件  */
    fun: FuncVoid;
    /**  是否执行一次  */
    once: boolean;
    /**  清除事件函数绑定  */
    off: FuncVoid;
    caller?: any;
    delay?: number;
    then?: number;
};
const hooks = [] as HookFunItem[];
/**开始执行循环函数
 * fun 每次执行的执行的韩式
 * @param time 传入的间隔
 * @param space_time 间隔的时间间隔
 */
// tslint:disable-next-line:no-shadowed-variable
export function loop(fun: FuncVoid, delay: number, caller?, is_once?: boolean) {
    const off = () => {
        clear(fun, caller);
    };
    hooks.push({
        caller,
        delay,
        fun,
        off,
        once: is_once,
        then: Date.now(),
    });
    return off;
}
export function once(fun, delay, caller) {
    return loop(fun, delay, caller, true);
}
export function clear(fun: FuncVoid, caller: any) {
    for (let len = hooks.length, i = len - 1; i >= 0; i--) {
        const { fun: fun_item, caller: caller_item } = hooks[i];
        if (caller_item !== caller || fun_item !== fun) {
            continue;
        }
        hooks.splice(i, 1);
        return;
    }
}
export function clearAll(caller) {
    for (let len = hooks.length, i = len - 1; i >= 0; i--) {
        const { caller: caller_item } = hooks[i];
        if (caller === caller_item) {
            hooks.splice(i, 1);
            continue;
        }
    }
}
/** 计算所有interval的最大公约数, 每gcd（最大公约数）次执行一次interval */
export function interval() {
    const { length } = hooks;
    if (!length) {
        return;
    }
    const now = Date.now();
    for (let i = length - 1; i >= 0; i--) {
        const hook_item = hooks[i];
        const { fun, then, delay, once: is_once, off } = hook_item;
        const elapsed = now - then || 0;
        if (elapsed < delay) {
            continue;
        }
        const time = Math.floor(elapsed / delay);

        const new_then = now - (elapsed - time * delay);
        if (typeof fun === 'function') {
            fun(time);
        }
        if (is_once) {
            off();
            continue;
        }
        hook_item.then = new_then;
    }
}
