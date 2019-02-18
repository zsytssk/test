import { createRandomString } from '../utils/utils';

type HookOtherEvent = {
    /** 绑定对象id, 用于在清除的时候进行对比 */
    other_id: string;
    /** 清除绑定事件 */
    off: FuncVoid;
    /** 事件名称 */
    event: string;
};

type HookFunItem = {
    /**  监听事件  */
    listener: FuncListener;
    /**  是否执行一次  */
    once: boolean;
    /**  清除事件函数绑定  */
    off: FuncVoid;
};
type HookFunList = {
    [x: string]: HookFunItem[];
};

export const cmd = {
    destroy: 'destroy',
};

/** 事件基础类 */
export abstract class EventDispatcher {
    /** id:> 每一个对象在创建时都会创建一个唯一id */
    public id: string;
    /** 是否销毁, 用于在销毁之后 有异步函数进入, 阻止其继续执行 */
    public destroyed: boolean = false;
    protected hook_fun_list: HookFunList = {};
    /** 绑定在别人身上的事件, 保存在这里用于销毁时 找到绑定的目标 去取消这些事件的绑定 */
    protected hook_other_fun_list = [] as HookOtherEvent[];
    /** 事件基础类, 创建随机id */
    constructor() {
        this.id = createRandomString();
    }
    /**  监听事件  */
    public on(event_name: string, listener: FuncListener, once?: boolean) {
        if (typeof listener !== 'function') {
            return;
        }
        if (!this.hook_fun_list[event_name]) {
            this.hook_fun_list[event_name] = [];
        }
        const off = () => {
            this.off(event_name, listener);
        };
        const bind_obj = {
            listener,
            off,
            once: once ? once : false,
        };
        /** 添加在列表前面, 执行从后面执行 确保先添加的限执行
         * 之所以要这样是因为 event 遇到 once 要删除必须要从后面遍历 才能保证所有的都执行了
         */
        this.hook_fun_list[event_name].unshift(bind_obj);
        return {
            off,
        };
    }
    /**  监听一次事件  */
    public once(event_name: string, listener: FuncListener) {
        return this.on(event_name, listener, true);
    }
    /**
     * 触发自己绑定的事件evnt_name的绑定函数
     * @param event_name 事件名称
     * @param data 传过去的数据
     */
    public event(event_name: string, data?) {
        if (!this.hook_fun_list[event_name]) {
            return;
        }
        const hook_event_funs = this.hook_fun_list[event_name];
        for (let len = hook_event_funs.length, i = len - 1; i >= 0; i--) {
            /** 如果trigger destroy 就会导致别的ctrl|model绑定在这里的事件在执行listener
             * 就会全部清除, 这时候hook_event_funs为空, 执行下面的代码就会报错
             * 现在还没有什么方法解决这个问题 只能先跳过了 也许我可以将trigger的事件 异步执行
             */
            const hook_event_item = hook_event_funs[i];
            if (!hook_event_item) {
                continue;
            }
            const listener = hook_event_item.listener;
            const once = hook_event_item.once;
            listener(data);
            if (once) {
                hook_event_item.off();
            }
        }
    }
    /**
     * 撤销事件绑定
     * @param event_name 事件名称
     * @param track_info 索引方法的常量 可以是function或者绑定的token
     */
    public off(event_name: string, track_info?: FuncListener | string) {
        /** off all func bind event */
        if (!track_info) {
            this.hook_fun_list[event_name] = [];
            return;
        }
        const hook_list = this.hook_fun_list[event_name];
        if (!hook_list) {
            return;
        }

        for (let len = hook_list.length, i = len - 1; i >= 0; i--) {
            const listener = hook_list[i].listener;
            if (typeof track_info === 'function' && listener === track_info) {
                hook_list.splice(i, 1);
                return;
            }
        }
    }
    /**  撤销所有事件绑定  */
    protected offAll() {
        this.hook_fun_list = {};
    }

    /** 在其他的上面绑定事件处理函数 */
    protected bindOtherEvent(
        other: EventDispatcher,
        event_name: string,
        callback?: FuncListener,
        once?: boolean,
    ) {
        if (!other) {
            return;
        }
        const bind_info = other.on(event_name, callback, once);
        const bind_obj = {
            event: event_name,
            off: bind_info.off,
            other_id: other.id,
        };
        this.hook_other_fun_list.push(bind_obj);
        return bind_info;
    }
    /** 取消在其他的baseEvent绑定的事件处理 */
    protected offOtherEvent(otherObj: EventDispatcher) {
        if (!otherObj) {
            return;
        }

        const hook_funs = this.hook_other_fun_list;
        for (let len = hook_funs.length, i = len - 1; i >= 0; i--) {
            const hook_item = hook_funs[i];
            const other_id = hook_item.other_id;
            const off = hook_item.off;

            if (other_id !== otherObj.id) {
                continue;
            }

            off();
            hook_funs.splice(i, 1);
        }
    }
    /** 取消在其他的baseEvent绑定的事件处理 */
    protected offAllOtherEvent() {
        const hook_funs = this.hook_other_fun_list;
        for (let len = hook_funs.length, i = len - 1; i >= 0; i--) {
            const hook_item = hook_funs[i];
            hook_item.off();
            hook_funs.splice(i, 1);
        }
        this.hook_other_fun_list = [];
    }
    public destroy() {
        this.event(cmd.destroy);
        this.offAllOtherEvent();
        this.offAll();
        this.destroyed = true;
    }
}
