import { write } from './script/ls/write';
import * as path from 'path';
import { stringify } from './script/utils/stringify';

type TreeNode = {
    val: number;
    left?: TreeNode;
    right?: TreeNode;
};

/** 二叉树 */
const input = [1, 2, 3, 4, 5, 6, 7];
const level = get2pow(input.length + 1);
let index: number = 0;
const node = createNode(level - 1);
printNode(node);

function get2pow(num: number) {
    const cur = num / 2;
    if (num / 2 < 1) {
        return 0;
    }
    return 1 + get2pow(cur);
}

function createNode(level: number): TreeNode {
    index++;
    const cur_node = { val: index } as TreeNode;
    if (level === 0) {
        return cur_node;
    }
    cur_node.left = createNode(level - 1);
    cur_node.right = createNode(level - 1);
    return cur_node;
}
function printNode(node: TreeNode, print_self = true) {
    const { val, left, right } = node;
    let left_val: number;
    let right_val: number;
    if (print_self) {
        console.log(val);
    }
    if (left) {
        left_val = left.val;
        console.log(left_val);
    }
    if (right) {
        right_val = right.val;
        console.log(right_val);
    }
    if (left) {
        printNode(left, false);
    }
    if (right) {
        printNode(right, false);
    }
}
