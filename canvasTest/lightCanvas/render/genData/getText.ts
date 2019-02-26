import { Text } from '../../node/text';

export interface TextInfo {
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
export function getTextData(text_node: Text): TextInfo {
    const {
        text,
        font,
        fontSize,
        bold,
        italic,
        color,
        stroke,
        strokeColor,
        align,
        valign,
        overflow,
        wordWrap,
        padding,
        leading,
    } = text_node;

    return {
        text,
        font,
        fontSize,
        bold,
        italic,
        color,
        stroke,
        strokeColor,
        align,
        valign,
        overflow,
        wordWrap,
        padding,
        leading,
    };
}
