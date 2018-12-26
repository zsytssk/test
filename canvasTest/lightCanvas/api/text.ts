import { Node } from './node';

export class Text extends Node {
    public text: string;
    public font: string;
    public fontSize: number;
    public bold: boolean;
    public italic: boolean;
    public color: string;
    public stroke: number;
    public strokeColor: string | CanvasGradient | CanvasPattern;
    public align: CanvasTextAlign = 'left';
    public valign: CanvasTextBaseline = 'top';
    public overflow: string;
    public wordWrap: boolean;
    public padding: boolean;
    public leading: boolean;
    constructor() {
        super();
    }
}

// https://www.w3schools.com/tags/canvas_font.asp
// wordWrap http://jsfiddle.net/eECar/16/
