import { Engine } from '../render/render';

// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Graphics
export type LineParams = [number, number, number, number, CanvasStyle, number];

// prettier-ignore
export type RectParams = [ number, number, number, number, CanvasStyle, CanvasStyle, number ];

// prettier-ignore
export type PathParams = [ number, number, Point[], CanvasStyle, CanvasStyle, number ];

// prettier-ignore
export type ArcParams = [ number, number, number, number, number, boolean, CanvasStyle, CanvasStyle, number ];

type GraphicsType = 'line' | 'rect' | 'arc' | 'poly' | 'path';

type GraphicsItem = {
    type: GraphicsType;
    params: LineParams | RectParams | ArcParams | PathParams;
};

export class Graphics {
    public alpha: number = 1;
    public graphics_list: GraphicsItem[] = [];
    public drawLine(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        lineColor: CanvasStyle,
        lineWidth: number = 1,
    ) {
        this.graphics_list.push({
            type: 'line',
            params: [fromX, fromY, toX, toY, lineColor, lineWidth],
        });
    }
    public drawPath(
        x: number,
        y: number,
        points: Point[],
        lineColor?: CanvasStyle,
        lineWidth: number = 1,
    ) {
        // prettier-ignore
        this.graphics_list.push({
            type: 'path',
            params: [
                x,
                y,
                points,
                ,
                lineColor,
                lineWidth,
            ] as PathParams,
        });
    }
    public drawCurves(alpha: number) {}
    public drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        fillColor?: CanvasStyle,
        lineColor?: CanvasStyle,
        lineWidth: number = 1,
    ) {
        // prettier-ignore
        this.graphics_list.push({
            type: 'rect',
            params: [x, y, width, height, fillColor, lineColor, lineWidth],
        });
    }
    public drawPoly(
        x: number,
        y: number,
        points: Point[],
        fillColor?: CanvasStyle,
        lineColor?: CanvasStyle,
        lineWidth: number = 1,
    ) {
        this.graphics_list.push({
            type: 'poly',
            params: [
                x,
                y,
                points,
                fillColor,
                lineColor,
                lineWidth,
            ] as PathParams,
        });
    }
    public drawCircle(
        x: number,
        y: number,
        radius: number,
        fillColor?: CanvasStyle,
        lineColor?: CanvasStyle,
        lineWidth: number = 1,
    ) {
        // prettier-ignore
        this.graphics_list.push({
            type: 'arc',
            params: [x, y, radius, 0, Math.PI * 2, true, fillColor, lineColor, lineWidth] as ArcParams,
        });
    }
    public drawPie(
        x: number,
        y: number,
        radius: number,
        sAngle: number,
        eAngle: number,
        clockWise?: boolean,
        fillColor?: CanvasStyle,
        lineColor?: CanvasStyle,
        lineWidth: number = 1,
    ) {
        // prettier-ignore
        this.graphics_list.push({
            type: 'arc',
            params: [x, y, radius, sAngle, eAngle, clockWise, fillColor, lineColor, lineWidth] as ArcParams,
        });
    }
    public setAlpha(alpha: number) {
        this.alpha = alpha;
    }
    public render(engine: Engine) {
        engine.drawGraphics(this);
    }
    public clear() {
        this.graphics_list = [];
    }
}
