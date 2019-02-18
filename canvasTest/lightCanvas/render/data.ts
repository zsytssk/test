import { Pattern } from '../node/texture';
import { GraphicsItem } from '../node/graphics';

const data = [] as NodeData[];

export type NodeType = 'node' | 'image' | 'text';
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
