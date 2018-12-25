import { Node } from './node';

// https://www.w3schools.com/tags/canvas_font.asp
export class Text extends Node {
    public text: string;
    public font: string;
    public fontSize: number;
    public bold: boolean;
    public color: string;
    public align: CanvasTextAlign = 'left';
    public overflow: string;
    public italic: boolean;
    public wordWrap: boolean;
    public padding: boolean;
    public leading: boolean;
    constructor() {
        super();
    }
}
