type Listener = (width: number, height: number) => void;

export function setStyle(node: HTMLElement, style: {}) {
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        node.style[key] = style[key];
    }
}
export function setProps<T extends {}>(obj: T, style: ClassProps<T>) {
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        obj[key] = style[key];
    }
}

export function degreeToAngle(degrees) {
    return (degrees * Math.PI) / 180;
}
/** 弧度转化为角度 */
export function angleTodegree(angle) {
    return (angle * 180) / Math.PI;
}

/** 函数执行完成之后异步执行函数 */
export function watch(fun_name: string): any {
    return (target: any, key: any, descriptor: PropertyDescriptor) => {
        if (descriptor) {
            const ori_fun = descriptor.value;
            descriptor.value = function(...args) {
                const result = ori_fun.apply(this, args);
                if (result instanceof Promise) {
                    result.then(() => {
                        this[fun_name](key);
                    });
                } else {
                    this[fun_name](key);
                }
                return result;
            };
        } else {
            // const indexer = Symbol(key);
            const indexer = uniqueKey(key);
            Object.defineProperty(target, key, {
                get() {
                    return this[indexer];
                },
                set(val) {
                    this[indexer] = val;
                    this[fun_name](key);
                },
                configurable: true,
            });
        }
        return descriptor;
    };
}

/** 将同步中多次调用函数变成一次执行, 比如 image 中许多属性改变都需要改变
 * texture, 如果将多次计算合并成最后一次, 不会影响效果, 但是避免多次计算...
 * 这些函数不能有返回值
 */
export function throttleSyncCallToOne() {
    return (target, name, descriptor) => {
        // const timeout = Symbol('timeout');
        const timeout = uniqueKey(`${name}_throttle_timeout`);
        const ori_fun = descriptor.value;
        descriptor.value = function(...args) {
            clearTimeout(this[timeout]);
            this[timeout] = setTimeout(() => {
                ori_fun.apply(this, args);
            }, 0);
        };
        return descriptor;
    };
}
export function createRandomString() {
    return Math.random()
        .toString()
        .replace('0.', '');
}

export function uniqueKey(key: string) {
    return '_' + key;
}
