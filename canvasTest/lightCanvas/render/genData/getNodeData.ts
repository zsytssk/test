import { Graphics, GraphicsItem } from '../../node/graphics';
import { Image } from '../../node/image';
import { Node, NodeType } from '../../node/node';
import { Stage } from '../../node/stage';
import { Text } from '../../node/text';
import { getImageInfo, ImageInfo } from './getImage';
import { getTextInfo, TextInfo } from './getText';
import { restoreRecursiveInfo, setRecursiveInfo } from './recursiveInfo';

// 将所有的数据用一维数组展示
export interface NodeData {
    width: number;
    height: number;
    alpha: number;
    matrix: number[];
    type: NodeType;
    graphics: GraphicsData;
}
export interface StageInfo {
    canvas_width: number;
    canvas_height: number;
}
export type ImageData = NodeData & ImageInfo;
export type TextData = NodeData & TextInfo;
export type StageData = NodeData & StageInfo;

export interface GraphicsData {
    alpha: number;
    graphics_list: GraphicsItem[];
}

export function getNodeData(node: Node, data_arr = []): NodeData[] {
    if (!node.visible) {
        return;
    }
    const {
        width,
        height,
        matrix: ori_matrix,
        alpha: ori_alpha,
        graphics: ori_graphics,
        type,
    } = node;
    const graphics = getGraphicsInfo(ori_graphics);

    const { matrix, alpha } = setRecursiveInfo({
        matrix: ori_matrix,
        alpha: ori_alpha,
    });

    let other_data = {};
    if (type === 'Stage') {
        other_data = getStageInfo(node as Stage);
    } else if (type === 'Image') {
        other_data = getImageInfo(node as Image);
    } else if (type === 'Text') {
        other_data = getTextInfo(node as Text);
    }

    data_arr.push({
        matrix,
        alpha,
        graphics,
        width,
        height,
        type,
        ...other_data,
    });

    for (const item of node.children) {
        getNodeData(item, data_arr);
    }
    restoreRecursiveInfo();

    return data_arr;
}
function getStageInfo(node: Stage) {
    const { canvas_height, canvas_width } = node;
    return {
        canvas_width,
        canvas_height,
    };
}
function getGraphicsInfo(graphics: Graphics) {
    if (!graphics) {
        return;
    }
    const { alpha, graphics_list } = graphics;
    return {
        alpha,
        graphics_list,
    };
}
