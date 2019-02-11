import { Engine } from '../render/render';
import { Node, NodeType } from './node';

export class Text extends Node {
    public text: string = '';
    public font: string = 'Arail, Simsun';
    public fontSize: number = 20;
    public bold: boolean = false;
    public italic: boolean = false;
    public color: string = 'black';
    public stroke: number = 0;
    public strokeColor: string | CanvasGradient | CanvasPattern = 'black';
    public align: CanvasTextAlign = 'left';
    public valign: CanvasTextBaseline = 'top';
    public overflow: string;
    public wordWrap: boolean;
    public padding: boolean;
    public leading: boolean;
    public type: NodeType = 'Text';
    constructor() {
        super();
    }
}

// https://www.w3schools.com/tags/canvas_font.asp
// wordWrap http://jsfiddle.net/eECar/16/
