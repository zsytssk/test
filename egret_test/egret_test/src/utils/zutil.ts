/**
 * 获取节点所有一级子节点
 * @param sprite
 */
export function getChildren(sprite) {
    const arr = [];
    for (let i = 0; i < sprite.numChildren; i++) {
        const child = sprite.getChildAt(i);
        arr.push(child);
    }
    return arr;
}

/*
    从前往后寻找 和从后往前寻找有什么区别？
    queryElements 我先写一个从前往后寻找的
*/
export function getChildrenByName(root_dom, name) {
    const arr = [];
    if (root_dom.getChildByName && root_dom.getChildByName(name)) {
        for (let i = 0; i < root_dom.numChildren; i++) {
            const child = root_dom.getChildAt(i);
            if (child.name === name) {
                arr.push(child);
            }
        }
    }
    return arr;
}
export function getElementsByName(root_dom, name) {
    let arr = [];
    if (root_dom.getChildByName && root_dom.getChildByName(name)) {
        for (let i = 0; i < root_dom.numChildren; i++) {
            const child = root_dom.getChildAt(i);
            if (child.name === name) {
                arr.push(child);
            }
        }
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        arr = arr.concat(getElementsByName(root_dom.getChildAt(i), name));
    }
    return arr;
}
export function getChildrenByType(root_dom, type) {
    let typeParent;
    const arr = [];
    if (typeof type === 'string') {
        typeParent = mapType(type);
    } else if (typeof type === 'function') {
        typeParent = type;
    }
    if (!typeParent) {
        return arr;
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        const child = root_dom.getChildAt(i);
        if (child instanceof typeParent) {
            arr.push(child);
        }
    }
    return arr;
}
// Button Image Label ... laya.ui 中的组件
export function getElementsByType(root_dom, type) {
    let typeParent;
    let arr = [];
    if (typeof type === 'string') {
        typeParent = mapType(type);
    } else if (typeof type === 'function') {
        typeParent = type;
    }
    if (!typeParent) {
        return arr;
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        if (root_dom.getChildAt(i) instanceof typeParent) {
            arr.push(root_dom.getChildAt(i));
        }
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        arr = arr.concat(getElementsByType(root_dom.getChildAt(i), type));
    }
    return arr;
}
export function mapType(typeStr) {
    const type_arr = typeStr.split('.');
    let result;
    for (let i = 0; i < type_arr.length; i++) {
        const type = type_arr[i];
        if (i === 0) {
            if (typeof type === 'function') {
                result = type;
                break;
            }
            result = laya.ui[type] || ui[type] || laya.display[type];
        } else {
            result = result[type];
        }
        if (!result) {
            // 如果没有
            break;
        }
    }
    return result;
}
// 通过属性来寻找子类 propertyName:value
export function getElementsByProperty(root_dom, propStr) {
    let arr = [];
    const propArr = propStr.split(':');
    if (!propArr.length) {
        return arr;
    }
    if (propArr[1] === 'false') {
        propArr[1] = false;
    } else if (propArr[1] === 'true') {
        propArr[1] = true;
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        if (root_dom.getChildAt(i)[propArr[0]] === propArr[1]) {
            arr.push(root_dom.getChildAt(i));
        }
    }
    for (let i = 0; i < root_dom.numChildren; i++) {
        arr = arr.concat(
            getElementsByProperty(root_dom.getChildAt(i), propStr)
        );
    }
    return arr;
}
// 获取所有下级node
export function getAllElements(root_dom) {
    let arr = [];
    for (let i = 0; i < root_dom.numChildren; i++) {
        const child = root_dom.getChildAt(i);
        arr.push(child);
        arr = arr.concat(getAllElements(child));
    }
    return arr;
}
// 获取所有下级node
export function getAllChildren(root_dom) {
    const arr = [];
    for (let i = 0; i < root_dom.numChildren; i++) {
        arr.push(root_dom.getChildAt(i));
    }
    return arr;
}
// 通过 (name:nameStr type:typeStr).. 形式查询
export function queryElements(root_dom, queryString) {
    const arr = [];
    const queryArr = queryString.split(' ');
    if (!queryArr) {
        return arr;
    }

    const allElements = getAllElements(root_dom);
    for (const item of allElements) {
        if (queryCheck(root_dom, item, queryArr)) {
            arr.push(item);
        }
    }
    return arr;
}
export function querySiblings(dom_origin) {
    const arr = [];
    const dom_parent = dom_origin.parent;
    for (let i = 0; i < dom_parent.numChildren; i++) {
        const dom_item = dom_parent.getChildAt(i);
        if (dom_item === dom_origin) {
            continue;
        }
        arr.push(dom_item);
    }
    return arr;
}
/**  寻找最近符合条件的父类  */
export function queryClosest(dom_item, queryString) {
    if (isChecked(dom_item, queryString)) {
        return dom_item;
    }
    const parent = dom_item.parent;
    if (!parent) {
        return null;
    }
    return queryClosest(parent, queryString);
}
/**  寻找最顶级的父类  */
export function queryTop(dom_item) {
    const parent = dom_item.parent;
    if (!parent) {
        return dom_item;
    }
    return queryTop(parent);
}
/**  获得本ctrl在目录树中绝对地址  */
export function getCtrlTreePath(dom_item, path?) {
    if (!path) {
        path = '';
    }
    path = dom_item.name + '::' + path;
    const parent = dom_item.parent;
    if (!parent) {
        return path.slice(0, -2);
    }
    return getCtrlTreePath(parent, path);
}
export function isClosest(dom_item, dom_parent) {
    if (!dom_item) {
        return false;
    }
    if (dom_item === dom_parent) {
        return true;
    }
    const parent = dom_item.parent;
    return isClosest(parent, dom_parent);
}
// dom_list中符合condition_str的元素 提取出来放在一个数组中
export function filterElements(dom_list, filter_str) {
    return dom_list.filter(dom_item => {
        return isChecked(dom_item, filter_str);
    });
}
export function getElementIndex(dom_item) {
    const dom_parent = dom_item.parent;
    if (!parent) {
        return -1;
    }
    for (let i = 0; i < dom_parent.numChildren; i++) {
        if (dom_parent.getChildAt(i) === dom_item) {
            return i;
        }
    }
    return -1;
}
export function queryControllersFromDom(root_dom, queryString) {
    const doms = queryElements(root_dom, queryString);
    const arr = [];

    for (const item of doms) {
        const controller = getControllerFromDom(item);
        if (controller) {
            arr.push(controller);
        }
    }
    return arr;
}
export function getControllerFromDom(dom) {
    if (dom.controller) {
        return dom.controller;
    }
    return null;
}
export function queryCheck(root_dom, item_dom, queryArr) {
    const lastQueryStr = queryArr[queryArr.length - 1];

    if (!isChecked(item_dom, lastQueryStr)) {
        return false;
    }
    if (closestCheck(root_dom, item_dom, queryArr)) {
        return true;
    }
}
export function closestCheck(root_dom, item_dom, queryArr) {
    const self = this;
    const lastQueryStr = queryArr[queryArr.length - 1];
    const parent_dom = item_dom._parent || item_dom.parent;
    if (isChecked(item_dom, lastQueryStr)) {
        queryArr = queryArr.slice(0, -1);
    }
    if (queryArr.length === 0) {
        return true;
    }
    if (!parent_dom) {
        // 如果已经找到最顶级 queryArr还没有完成所有匹配 返回false
        return false;
    }
    return closestCheck(root_dom, parent_dom, queryArr);
}
export function isChecked(check_item, condition_str) {
    if (condition_str.indexOf('|') === -1) {
        return _typeIsChecked(check_item, condition_str);
    }

    const condition_arr = condition_str.split('|');
    for (const item of condition_arr) {
        if (!_typeIsChecked(check_item, item)) {
            return false;
        }
    }
    return true;
}
// 判断item是否符合条件 name:nameStr
export function _typeIsChecked(check_item, type_str) {
    const queryArr = type_str.split(':');
    const queryType = queryArr[0];
    const queryStr = queryArr[1];
    if (queryType === 'name') {
        return check_item.name === queryStr;
    } else if (queryType === 'type') {
        const typeParent = mapType(queryStr);
        return check_item instanceof typeParent;
    } else if (queryType === 'property') {
        const propertyName = queryStr;
        let propertyValue = queryArr[2];
        if (propertyValue === 'false') {
            propertyValue = false;
        } else if (propertyValue === 'true') {
            propertyValue = true;
        }
        return check_item[propertyName] === propertyValue;
    }
}
export function convertXMLToNode(xmlText) {
    let node;
    const jsonObj = xml_str2json(xmlText);
    node = convertJSONToNode(jsonObj);
    return node;
}
export function convertJSONToNode(jsonObj) {
    const type = jsonObj.type;
    let node;
    if (laya.ui[type]) {
        node = new laya.ui[type]();
    } else if (type === 'Sprite') {
        node = new Laya.Sprite();
    } else if (type === 'SkeletonPlayer') {
        node = new laya.ani.bone.Skeleton();
    } else {
        return;
    }
    const props = jsonObj.props;
    for (const prop_name in props) {
        if (!props.hasOwnProperty(prop_name)) {
            continue;
        }
        // 属性
        let prop_val = props[prop_name];

        if (!isNaN(Number(prop_val))) {
            prop_val = Number(prop_val);
        }
        node[prop_name] = prop_val;
    }
    const children = jsonObj.children;
    for (const item of children) {
        const child_json = item;
        const child_node = convertJSONToNode(child_json);
        if (child_node) {
            node.addChild(child_node);
        }
    }
    return node;
}
export function xml2json(node) {
    const result = {} as {
        type: any;
        children: any;
        props: any;
    };
    result.type = getNodeLocalName(node);
    result.children = [];
    const nodeChildren = node.childNodes;
    for (let cidx = 0; cidx < nodeChildren.length; cidx++) {
        const child = nodeChildren.item(cidx);
        const json_child = xml2json(child);
        result.children.push(json_child);
    }

    // Attributes
    if (node.attributes) {
        result.props = {};
        for (let index = 0; index < node.attributes.length; index++) {
            const attr = node.attributes.item(index);
            result.props[attr.name] = attr.value;
        }
    }
    return result;
}
export function getNodeLocalName(node) {
    let nodeLocalName = node.localName;
    if (nodeLocalName === null) {
        // Yeah, this is IE!!
        nodeLocalName = node.baseName;
    }
    if (nodeLocalName === null || nodeLocalName === '') {
        // =="" is IE too
        nodeLocalName = node.nodeName;
    }
    return nodeLocalName;
}
export function xml_str2json(xmlDocStr) {
    const xmlDoc = parseXmlString(xmlDocStr);
    if (xmlDoc !== null) {
        return xml2json(xmlDoc);
    } else {
        return null;
    }
}
export function parseXmlString(xmlDocStr) {
    if (xmlDocStr === undefined) {
        return null;
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let xmlDoc, parser;
    if ((window as any).DOMParser) {
        parser = new (window as any).DOMParser();
    }
    try {
        xmlDoc = parser.parseFromString(xmlDocStr, 'text/xml').firstChild;
    } catch (err) {
        xmlDoc = null;
    }
    return xmlDoc;
}
// 防止按钮多次点击 按钮锁定一秒
export function isSpriteLock(sprite) {
    if (sprite.isLock) {
        return true;
    }
    sprite.isLock = true;
    Laya.timer.once(1000, sprite, () => {
        sprite.isLock = false;
    });
    return false;
}
/**
 * log 所有信息只在debugType=warn|error才会执行
 */
export function createLogAll() {
    const type = debugFE();
    // tslint:disable-next-line:no-empty
    const empty_fn = () => {};

    if (!type) {
        return empty_fn;
    }
    if (!window.console) {
        return empty_fn;
    }
    if (type !== 'warn' && type !== 'error') {
        return empty_fn;
    }
    return this.createLog();
}

const sucess_style = 'font-weight: bold; color: green';
const fail_style = 'font-weight: bold; color: red';
export function createLog(type?, msg_type?) {
    // tslint:disable-next-line:no-empty
    let style;
    if (msg_type === 'right') {
        style = sucess_style;
    } else if (msg_type === 'error') {
        style = fail_style;
    }
    type = type || debugFE();

    let log_fun = console[type];
    if (!log_fun) {
        log_fun = console.log;
    }
    if (style) {
        return log_fun.bind(window.console, '%c %s', style);
    }
    return log_fun.bind(window.console);
}
// 分析字符串
export function getQueryString(query) {
    const query_string = {};
    const lets = query.split('&');
    for (const item of lets) {
        const pair = item.split('=');
        if (typeof query_string[pair[0]] === 'undefined') {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === 'string') {
            const arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}

const state_temp = {};
// 检测页面的状态
export function detectModel(type) {
    let result;
    if (type in state_temp) {
        return state_temp[type];
    }
    let queryStr = location.href.split('?')[1];
    if (!queryStr) {
        return false;
    }
    queryStr = queryStr.replace(location.hash, '');
    const query = getQueryString(queryStr)[type];
    if (query) {
        result = query;
    }
    state_temp[type] = result;
    return result;
}
export function debugFE() {
    return (
        detectModel('debugType') ||
        detectModel('debug_status') ||
        detectModel('debugFE')
    );
}
export function compareObj(x, y) {
    if (x === y) {
        return true;
    }

    for (const p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }

            if (x[p] === y[p]) {
                continue;
            }

            if (typeof x[p] !== 'object') {
                return false;
            }
        }
    }

    for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
}
export function extend(sub_class, super_class?, name_sapce?) {
    for (const p in super_class) {
        if (!super_class.hasOwnProperty(p)) {
            continue;
        }
        sub_class[p] = super_class[p];
    }
    egret.registerClass(sub_class, 'Test');
    if (typeof sub_class === 'function' && typeof super_class === 'function') {
        function __() {
            this.constructor = sub_class;
        }
        sub_class.prototype =
            super_class === null
                ? Object.create(super_class)
                : ((__.prototype = super_class.prototype), new __());
    }

    if (name_sapce) {
        const arr_space = name_sapce.split('.');
        nameMap(arr_space, null, sub_class);
    }
    return sub_class;
}
export function nameMap(arr_space, obj, end_obj) {
    if (!obj) {
        obj = window;
    }
    if (arr_space.length === 1) {
        return (obj[arr_space[0]] = end_obj);
    }
    if (!obj[arr_space[0]]) {
        obj[arr_space[0]] = {};
    }
    return nameMap(arr_space.slice(1), obj[arr_space[0]], end_obj);
}
export function calcStrLen(str) {
    return str.replace(/[^\x00-\xff]/g, '01').length;
}
export function ellipsisStr(text, max_len, append_str) {
    /** 非NaN数字转化为字符串 */
    append_str = append_str || '..';
    if (typeof text === 'number' && text === text) {
        text = text + '';
    }
    /** 空字符串或者其他非法参数不做处理 */
    if (!text || typeof text !== 'string') {
        return '';
    }
    const text_len = calcStrLen(text);
    if (text_len <= max_len) {
        return text;
    }

    let result_str = '';
    let result_len = 0;
    /** 一个个的添加字符串如果字符串是中文+两位, 英文加一位 直到 长度超过max_len */
    for (const item of text) {
        if (/[^\x00-\xff]/.test(item)) {
            result_len += 2;
        } else {
            result_len += 1;
        }
        if (result_len > max_len - append_str.length) {
            // 因为最终的字符串要加上...显示字符串最大为max_len-3
            break;
        }
        result_str += item;
    }
    return result_str + append_str;
}
export function reload() {
    if (this.isInWeiXin()) {
        location.href =
            location.origin +
            location.pathname +
            location.search +
            '&timestamp=' +
            new Date().getTime() +
            location.hash;
        return;
    }
    window.location.reload(true);
}
export function isInWeiXin() {
    const ua = window.navigator.userAgent.toLowerCase();
    const match = ua.match(/MicroMessenger/i);
    if (match && match[0] === 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
export function createRandomString() {
    return Math.random()
        .toString()
        .replace('0.', '');
}
export function covertDom(sprite, new_class) {
    const new_sprite = new new_class();
    for (let i = sprite.numChildren - 1; i >= 0; i--) {
        new_sprite.addChild(sprite.getChildAt(i));
    }
    new_sprite.pos(sprite.x, sprite.y);
    new_sprite.name = sprite.name;
    return new_sprite;
}
/**
 * 将秒数转化为00::00::00形式
 * num显示的位数, 秒,分,时, 2: 分秒
 */
export function formatTime(time, num) {
    const hours = Math.floor(time / 3600);
    const minuts = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const time_arr = [hours, minuts, seconds];
    let time_str = '';
    /** 字符串是否开始, 排除前面为零的 但是不排除中间为零的 */
    let str_begin = false;
    for (let i = 0; i < time_arr.length; i++) {
        const item = time_arr[i];

        if (!str_begin && num) {
            if (time_arr.length - i <= num) {
                str_begin = true;
            }
        }
        if (!item && !str_begin) {
            continue;
        }
        if (!str_begin) {
            str_begin = true;
        }
        const item_str = item > 9 ? item + '' : '0' + item;
        time_str += item_str + ':';
    }
    return time_str.slice(0, -1);
}
/** 给Sprite添加longPress, shortPress事件 */
export function addPressEvent(sprite) {
    /**  按下, 开始记录  */
    sprite.on(Laya.Event.MOUSE_DOWN, sprite, event => {
        sprite.cus_event = {
            stageX: event.stageX,
            stageY: event.stageY,
            status: 'MOUSE_DOWN',
            timestamp: new Date().getTime(),
        };
        Laya.timer.once(1000, sprite, () => {
            sprite.event('longPress');
        });
    });
    /**  取消 */
    sprite.on(Laya.Event.MOUSE_MOVE, sprite, () => {
        if (!sprite.cus_event) {
            return;
        }
        sprite.cus_event = {
            stageX: sprite.cus_event.stageX,
            stageY: sprite.cus_event.stageY,
            status: 'MOUSE_MOVE',
            time: sprite.cus_event.time ? sprite.cus_event.time + 1 : 1,
            timestamp: new Date().getTime(),
        };
    });
    sprite.on(Laya.Event.MOUSE_UP, sprite, event => {
        if (!sprite.cus_event) {
            return;
        }

        /** 有些android手机会触发mousemove事件 需要额外判断手指位移 */
        if (sprite.cus_event.status !== 'MOUSE_DOWN') {
            const spaceX = event.stageX - sprite.cus_event.stageX;
            const spaceY = event.stageY - sprite.cus_event.stageY;

            /**  增加模糊范围 */
            if (spaceX <= 20 && spaceY <= 20) {
                sprite.cus_event.status = 'MOUSE_DOWN';
            }
        }

        Laya.timer.clearAll(sprite);
        if (sprite.cus_event.status !== 'MOUSE_DOWN') {
            return;
        }
        const time = new Date().getTime() - sprite.cus_event.timestamp;
        if (time < 1000) {
            sprite.event('shortPress', time);
        }
    });
}

export function extendUtil(sub_class, super_class, name_space) {
    for (const p in super_class) {
        if (!super_class.hasOwnProperty(p)) {
            continue;
        }
        sub_class[p] = super_class[p];
    }
    if (typeof sub_class === 'function' && typeof super_class === 'function') {
        function __() {
            this.constructor = sub_class;
        }
        sub_class.prototype =
            super_class === null
                ? Object.create(super_class)
                : ((__.prototype = super_class.prototype), new __());
    }

    if (name_space) {
        const arr_space = name_space.split('.');
        nameMap(arr_space, null, sub_class);
    }
    return sub_class;
}

export const log = createLog();
export const logAll = createLogAll();
export const group = createLog('groupCollapsed');
export const groupEnd = createLog('groupEnd');
export const groupErr = createLog('groupCollapsed', 'error');
export const logErr = createLog('error');
