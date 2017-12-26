import { getPropByPath } from './reduxUtils';

/**监听store state的变化执行函数 */
export class ReduxConnectManager {
    config_node: ConnectNode;
    constructor() {
    }
    init() {
        this.config_node = new ConnectNode({ path: 'root' });
    }
    public onStateChange(prev_state: any, next_state: any) {
        this.config_node.detectChange(prev_state, next_state);
    }
    public add(connect_info: ConnectInfo) {
        let root_node = this.config_node;
        root_node.createChildByConfig(connect_info);
    }
    public remove() {

    }
}

export type ConnectStoreChangeType = 'keychange' | 'add' | 'destroy';
export type ConnectStoreChangeInfo = {
    type: ConnectStoreChangeType;
    keyname?: string;
    old_val?: any;
    new_val?: any;
}

export type ConnectStoreChangeFun = (change_info: ConnectStoreChangeInfo) => void;
export type ConnectInfo = {
    path: string;
    listener: ConnectStoreChangeFun;
};

/**所有connect按照父子树连接在一起 */
type ConnectNodeConfig = {
    path: string;
    listener?: ConnectStoreChangeFun;
}

class ConnectNode {
    path: string;
    listeners: ConnectStoreChangeFun[] = [];
    childs = [] as ConnectNode[];
    parent: ConnectNode;
    constructor(config: ConnectNodeConfig) {
        this.path = config.path;
    }
    public get is_top() {
        return this.parent ? false : true;
    }
    public get abs_path() {
        if (!this.path) {
            return;
        }
        if (this.parent.is_top) {
            return '.' + this.path;
        }
        return this.parent.abs_path + '.' + this.path;
    }
    public getAbsNode(): ConnectNode[] {
        if (!this.parent) {
            return [];
        }
        return this.parent.getAbsNode().concat([this]);
    }
    /** 添加childNode */
    public addChild(childNode: ConnectNode) {
        let childs_list = this.childs;
        childs_list.push(childNode);
        childNode.parent = this;
    }
    /** 删除childNode */
    public removeChild(childNode: ConnectNode) {
        let child_index = this.childs.indexOf(childNode);
        if (child_index == -1) {
            return;
        }
        this.childs.splice(child_index, 1);
    }
    public removeChildren() {
        for (let len = this.childs.length, i = len - 1; i >= 0; i--) {
            this.childs[i].destroy();
        }
        this.childs = [];
    }
    public findChildNodeByPath(path_map: string[]): ConnectNode {
        if (path_map.length == 0) {
            return this;
        }

        let cur_path = path_map.shift();
        let children = this.childs;
        for (let i = 0; i < children.length; i++) {
            if (children[i].path == cur_path) {
                return children[i].findChildNodeByPath(path_map);
            }
        }
        return null;
    }
    public createChildByConfig(config: ConnectNodeConfig) {
        let path_arr = config.path.split('.');
        let path = path_arr.shift();

        let child_node = this.findChildNodeByPath([path]);
        if (!child_node) {
            child_node = new ConnectNode({
                path: path,
            });
            this.addChild(child_node);
        }

        if (path_arr.length) {
            child_node.createChildByConfig({
                path: path_arr.join('.'),
                listener: config.listener
            });
        } else {
            child_node.addListener(config.listener);
        }

    }
    public detectChange(prev_state, next_state) {
        let path = this.path;
        let is_change = false;

        let self_prev_state = getPropByPath(path, prev_state);
        let self_cur_state = getPropByPath(path, next_state);

        /**没有变化 */
        if (!self_prev_state && !self_cur_state) {
            return is_change;
        }
        /**no change */
        if (self_prev_state && self_prev_state.isEqual(self_cur_state)) {
            return is_change;
        }

        /**add */
        if (!self_prev_state && self_cur_state) {
            this.callListener({
                type: 'add',
                old_val: self_prev_state,
                new_val: self_cur_state
            });
            is_change = true;
        }

        /**destroy */
        if (self_prev_state && !self_cur_state) {
            this.callListener({
                type: 'destroy',
                old_val: self_prev_state,
                new_val: self_cur_state
            });
            is_change = true;
        }

        let [...state_keys] = self_prev_state.keys();

        for (let i = 0, len = state_keys.len; i < len; i++) {
            let prev_key_state = self_prev_state.get(state_keys[i]);
            let cur_key_state = self_cur_state.get(state_keys[i]);
        }

        return is_change;
    }
    private findChildForKey(key) {

    }
    public addListener(listener: ConnectStoreChangeFun) {
        this.listeners.push(listener);
    }
    private callListener(change_info: ConnectStoreChangeInfo) {
        let listeners = this.listeners;
        for (let i = 0, len = listeners.length; i < len; i++) {
            listeners[i](change_info);
        }
    }
    public destroy() {
        // 删除所有的子类
        this.removeChildren();
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
    }
}