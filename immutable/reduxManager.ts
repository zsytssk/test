import {
    getPropByPath,
    compareObj,
    ChangeInfo
} from './reduxUtils';

export type ChangeInfo = ChangeInfo;

/**监听store state的变化执行函数 */
export class ReduxConnectManager {
    config_node: ConnectNode;
    constructor() {
    }
    init() {
        this.config_node = new ConnectNode({ path: '' });
    }
    public onStateChange(prev_state: any, next_state: any) {
        let changes = compareObj(prev_state, next_state);

        for (let i = 0; i < changes.length; i++) {
            this.config_node.detectChange(changes[i]);
        }
    }
    public add(connect_info: ConnectInfo) {
        let root_node = this.config_node;
        root_node.createChildByConfig(connect_info);
    }
    public remove() {

    }
}


export type ConnectStoreChangeFun = (change_info: ChangeInfo) => void;
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
    public get abs_path(): string {
        if (!this.path) {
            return '';
        }
        if (this.parent.is_top) {
            return this.path;
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
    public detectChange(change_info: ChangeInfo) {
        let childs = this.childs;
        let change_handled = false;
        let path = change_info.path;

        if (path.indexOf(this.abs_path) == -1) {
            return change_handled;
        }
        // debugger;
        for (let i = 0; i < childs.length; i++) {
            let item = childs[i];

            change_handled = item.detectChange(change_info);
            if (change_handled) {
                return change_handled;
            }
        }

        /** 去掉第一个.*/
        let node_change_path = path.replace(this.abs_path, '');
        if (node_change_path.indexOf('.') == 0) {
            node_change_path = node_change_path.replace('.', '');
        }
        /**当前绑定元素自己发生修改 */
        if (node_change_path === '') {
            node_change_path = 'self';
        }

        change_handled = this.callListener({
            type: change_info.type,
            ori_val: change_info.ori_val,
            end_val: change_info.end_val,
            path: node_change_path
        });

        return change_handled;
    }
    public addListener(listener: ConnectStoreChangeFun) {
        this.listeners.push(listener);
    }
    private callListener(change_info: ChangeInfo) {
        let listeners = this.listeners;
        if (!listeners.length) {
            return false;
        }

        for (let i = 0, len = listeners.length; i < len; i++) {
            listeners[i](change_info);
        }
        return true;
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