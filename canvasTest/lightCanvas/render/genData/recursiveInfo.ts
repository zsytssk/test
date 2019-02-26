import { m3 } from '../../utils/m3';

type RecursiveInfo = {
    matrix: number[];
    alpha: number;
};

/** 设置层级层级变化的属性 matrix, alpha */
const arr: RecursiveInfo[] = [];
export function setRecursiveInfo(info: RecursiveInfo) {
    const { length } = arr;
    if (length === 0) {
        arr.push(info);
        return info;
    }
    const { matrix: last_matrix, alpha: last_alpha } = arr[length - 1];
    const { matrix: cur_matrix, alpha: cur_alpha } = info;
    const item = {
        matrix: m3.multiply(last_matrix, cur_matrix),
        alpha: last_alpha * cur_alpha,
    };
    arr.push(item);
    return item;
}
/** 重置层级层级变化的属性 matrix, alpha */
export function restoreRecursiveInfo() {
    return arr.pop();
}
