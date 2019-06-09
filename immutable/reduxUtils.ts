
export function getPropByPath(path: string, state?: any) {
    var paths = path.split(".");

    for (let i = 0, len = paths.length; i < len; i++) {
        let path = paths[i]
        if (path.indexOf('[') == -1) {
            state = state.get(path);
        } else {
            state = getListItem(state, path);
        }

        if (state === undefined || state === null) break;
    }
    return state;
}

export function getListItem(arr: any, path: string): any {
    if (!arr.size) {
        return undefined;
    }
    if (path.indexOf('[') == -1 || path.indexOf(']') != path.length - 1) {
        return undefined;
    }

    path = path.slice(1, path.length - 1);
    if (path.indexOf('=') == -1) {
        return undefined;
    }

    let path_arr = path.split('=');
    let props_name = path_arr[0];
    let props_val = path_arr[1];

    let len = arr.size;

    for (let i = 0; i < len; i++) {
        let item = arr.get(i);
        let item_props_val = item.get(props_name);
        if (item_props_val === props_val) {
            return item;
        }
    }
}

export type ChangeInfo = {
    path: string;
    type: 'delete' | 'add' | 'modified';
    ori_val?: any;
    end_val?: any;
}
type ChangeInfoArr = ChangeInfo[];

export function compareObj(ori_obj, com_obj, parent_key?): ChangeInfoArr {
    let change_arr = [];
    if (ori_obj.equals(com_obj)) {
        return change_arr;
    }

    let [...okeys] = ori_obj.keys();
    for (let i = 0; i < okeys.length; i++) {
        let o_key = okeys[i];
        let ori_item = ori_obj.get(o_key);

        let o_p_key = parent_key ? parent_key + '.' + o_key : o_key;

        if (!com_obj.has(o_key)) {
            change_arr.push({
                path: o_p_key,
                type: 'delete',
                ori_val: ori_item
            });
            continue;
        }
        let com_item = com_obj.get(o_key);
        /**基本类型直接对比 */
        if (isPrim(ori_item) && isPrim(com_item)) {
            if (ori_item !== com_item) {
                change_arr.push({
                    path: o_p_key,
                    type: 'modified',
                    ori_val: ori_item,
                    end_val: com_item
                });
                continue;
            }
            continue;
        }
        /**复杂类型 递归对比 */
        let change_item_arr = compareObj(ori_item, com_item, o_p_key);
        change_arr = change_arr.concat(change_item_arr);

    }

    let [...ckeys] = com_obj.keys();
    ckeys = ckeys.filter((item) => {
        okeys.indexOf(item) == -1;
    });

    /**查找增加的 */
    for (let i = 0; i < ckeys.length; i++) {
        let c_key = ckeys[i];
        if (ori_obj.has(c_key)) {
            continue;
        }
        let com_item = com_obj.get(c_key);
        let o_p_key = parent_key ? parent_key + '.' + ckeys : ckeys;

        change_arr.push({
            path: o_p_key,
            type: 'add',
            end_val: com_item
        });
    }
    return change_arr;
}

/**原始类型, null 没有做处理*/
function isPrim(value) {
    // return false;
    let value_type = typeof value;
    return value_type != 'function' && value_type != 'object';
}