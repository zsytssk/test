import { GraphicsItem } from '../node/graphics';
import { Image } from '../node/image';
import { Node } from '../node/node';
import { Stage } from '../node/stage';
import { Text } from '../node/text';
import { Pattern } from '../node/texture';
import { Engine } from './render';

export type NodeType = 'stage' | 'node' | 'image' | 'text';
// 将所有的数据用一维数组展示
export interface NodeData {
    width: number;
    height: number;
    alpha: number;
    visible: boolean;
    matrix: number[];
    type: NodeType;
    graphics: GraphicsData;
}
export interface ImageData extends NodeData {
    textures: TextureData[];
}
export interface StageData extends NodeData {
    canvas_width: number;
    canvas_height: number;
}
export interface TextureData {
    image: CanvasImageSource;
    x: number;
    y: number;
    width: number;
    height: number;
    pattern: Pattern;
}
export interface TextData extends NodeData {
    text: string;
    font: string;
    fontSize: number;
    bold: boolean;
    italic: boolean;
    color: string;
    stroke: number;
    strokeColor: string | CanvasGradient | CanvasPattern;
    align: CanvasTextAlign;
    valign: CanvasTextBaseline;
    overflow: string;
    wordWrap: boolean;
    padding: boolean;
    leading: boolean;
}
export interface GraphicsData {
    alpha: number;
    graphics_list: GraphicsItem[];
}

export function renderNode(engine: Engine, node: Node) {
    const data_arr = genData(node);
    renderData(engine, data_arr);
}

function genData(node: Node) {
    const data_arr = [];
    if (!node.visible) {
        return;
    }
    const item = {};
    const { matrix, alpha, graphics } = node;
    if (node.type === 'Image') {
        const { textures } = node as Image;
        for (const texture of textures) {
            engine.drawTexture(texture);
        }
    } else if (node.type === 'Text') {
        engine.drawText(node as Text);
    }

    for (const item of node.children) {
        renderNode(item);
    }
    return data_arr;
}

function renderData(engine: Engine, data_arr: NodeData[]) {
    for (const item of data_arr) {
        const { type, alpha, matrix, graphics } = item as NodeData;
        if (type === 'stage') {
            const { canvas_height, canvas_width } = item as StageData;
            engine.clear(0, 0, canvas_width, canvas_height);
        }
        if (alpha !== 1) {
            engine.setAlpha(alpha);
        }
        engine.transform(matrix);
        if (graphics) {
            engine.drawGraphics(graphics);
        }
        if (type === 'image') {
            const { textures } = item as ImageData;
            for (const texture of textures) {
                engine.drawTexture(texture);
            }
        } else if (type === 'text') {
            engine.drawText(item);
        }
    }
}
