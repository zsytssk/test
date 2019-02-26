import { Graphics, GraphicsItem } from '../../node/graphics';
import { Image } from '../../node/image';
import { Node, NodeType } from '../../node/node';
import { Text } from '../../node/text';
import { getImageData, ImageInfo } from './getImage';
import { getTextData, TextInfo } from './getText';

// 将所有的数据用一维数组展示
export interface NodeData {
    width: number;
    height: number;
    alpha: number;
    matrix: number[];
    type: NodeType;
    graphics: GraphicsData;
}
export type ImageData = NodeData & ImageInfo;
export type TextData = NodeData & TextInfo;

export interface GraphicsData {
    alpha: number;
    graphics_list: GraphicsItem[];
}

export interface StageData extends NodeData {
    canvas_width: number;
    canvas_height: number;
}

export function getNodeData(node: Node): NodeData {
    const { width, height, matrix, alpha, graphics: ori_graphics, type } = node;
    const graphics = getGraphicsData(ori_graphics);

    let other_data = {};
    if (type === 'Image') {
        other_data = getImageData(node as Image);
    } else if (type === 'Text') {
        other_data = getTextData(node as Text);
    }

    return {
        matrix,
        alpha,
        graphics,
        width,
        height,
        type,
        ...other_data,
    };
}
function getGraphicsData(graphics: Graphics) {
    const { alpha, graphics_list } = graphics;
    return {
        alpha,
        graphics_list,
    };
}
