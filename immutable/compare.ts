export function compareObj(ori_obj, com_obj, parent_key?) {
    let change_arr = [];
    ori_obj = ori_obj;
    com_obj = com_obj;

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
                key: o_p_key,
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
                    key: o_p_key,
                    type: 'modified',
                    ori_val: ori_item,
                    end_val: com_item
                });
                continue;
            }
            continue;
        }

        if (ori_item.equals(com_item)) {
            continue;
        }

        /**复杂类型 递归对比 */
        let change_item_arr = compareObj(ori_item, com_item, o_p_key);
        change_arr = change_arr.concat(change_item_arr);
    }

    let [...ckeys] = com_obj.keys();
    /**查找增加的 */
    for (let i = 0; i < ckeys.length; i++) {
        let c_key = ckeys[i];
        if (ori_obj.has(c_key)) {
            continue;
        }
        let com_item = com_obj.get(c_key);
        let o_p_key = parent_key ? parent_key + '.' + ckeys : ckeys;

        change_arr.push({
            key: o_p_key,
            type: 'add',
            end_val: com_item
        });
    }
    return change_arr;
}

/**原始类型, null 没有做处理*/
function isPrim(value) {
    let value_type = typeof value;
    return value_type != 'function' && value_type != 'object';
}