/** 监听数据结构 */
export type SubscribeObj = {
    [key: string]: Func<void>;
};
/** 每一个event的数据 */
export type EventData = Array<{
    caller: any;
    callback: Func<any>;
    once?: boolean;
    off?: () => void;
}>;

/**
 * 事件订阅发布构造函数
 */
export default class Observer {
    protected events: Map<string, EventData> = new Map();

    constructor() {
        // todo
    }

    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    public on(
        event: string | SubscribeObj,
        callback?: Func<any>,
        caller?: any,
        once?: boolean,
    ) {
        if (typeof event === 'object') {
            caller = callback;
            for (const event_key in event) {
                if (!event.hasOwnProperty(event_key)) {
                    continue;
                }
                this.on(event_key, event[event_key], caller);
            }
            return;
        }
        let events = [];
        if (this.events.has(event)) {
            events = this.events.get(event);
        } else {
            this.events.set(event, events);
        }

        for (const temp of events) {
            if (caller === temp.caller && callback === temp.callback) {
                return;
            }
        }
        const off = () => {
            this.off(event, callback, caller);
        };

        events.push({ caller, callback, once, off });
    }
    public getBind(event: string) {
        return this.events.get(event);
    }

    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    public off(
        event: string | SubscribeObj,
        callback?: Func<any>,
        caller?: any,
    ) {
        if (typeof event === 'object') {
            caller = callback;
            for (const event_key in event) {
                if (!event.hasOwnProperty(event_key)) {
                    continue;
                }
                this.on(event_key, event[event_key], caller);
            }
            return;
        }

        if (!this.events.has(event)) {
            return;
        }
        if (callback || caller) {
            const events = this.events.get(event);
            if (callback && caller) {
                for (let len = events.length, i = len - 1; i >= 0; i--) {
                    if (
                        events[i].callback === callback &&
                        events[i].caller === caller
                    ) {
                        events.splice(i, 1);
                        break;
                    }
                }
            } else {
                // 尽量不要这么传参，效率低下
                for (let len = events.length, i = len - 1; i >= 0; i--) {
                    if (
                        events[i].callback === callback ||
                        events[i].caller === caller
                    ) {
                        events.splice(i, 1);
                    }
                }
            }
        } else {
            this.events.delete(event);
        }
    }
    public offAllCaller(caller: any) {
        for (const events_item of this.events.values()) {
            for (let len = events_item.length, i = len - 1; i >= 0; i--) {
                if (events_item[i].caller === caller) {
                    events_item.splice(i, 1);
                }
            }
        }
    }
    /**
     * 发布消息
     * @param event
     * @param data
     */
    public emit(event: string, ...params: any[]) {
        if (this.events.has(event)) {
            const events = this.events.get(event);
            for (const event_data of events.concat([])) {
                const { callback, once, off } = event_data;
                if (typeof callback === 'function') {
                    callback.apply(event_data.caller, [...params]);
                }
                if (once) {
                    off();
                }
            }
        }
    }
    public clear() {
        this.events = new Map();
    }
}
