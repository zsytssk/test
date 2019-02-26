import { Node } from '../node/node';
import { getNodeData } from './genData/getData';
import { Engine } from './render';

export type NodeType = 'stage' | 'node' | 'image' | 'text';
// 将所有的数据用一维数组展示

export function renderNode(engine: Engine, node: Node) {
    const data_arr = genData(node);
    renderData(engine, data_arr);
}

function genData(node: Node, data_arr = []) {
    if (!node.visible) {
        return;
    }
    const data = getNodeData(node);

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
