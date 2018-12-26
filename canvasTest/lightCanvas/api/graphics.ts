// https://layaair.ldc.layabox.com/api/?category=Core&class=laya.display.Graphics
export type LineParams = [number, number, number, number, CanvasStyle, number];
export type RectParams = [
    number,
    number,
    number,
    number,
    CanvasStyle,
    CanvasStyle,
    number
];
export class Graphics {
    public alpha: number = 1;
    public lines: LineParams[] = [];
    public rects: RectParams[] = [];
    public drawLine(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
        lineColor: CanvasStyle,
        lineWidth: number = 1
    ) {
        this.lines.push([fromX, fromY, toX, toY, lineColor, lineWidth]);
    }
    public drawLines(alpha: number) {}
    public drawCurves(alpha: number) {}
    public drawRect(
        x: number,
        y: number,
        width: number,
        height: number,
        fillColor?: CanvasStyle,
        lineColor?: CanvasStyle,
        lineWidth: number = 1
    ) {
        this.rects.push([x, y, width, height, fillColor, lineColor, lineWidth]);
    }
    public drawPoly(alpha: number) {}
    public drawCircle(alpha: number) {}
    public drawPie(alpha: number) {}
    public drawPath(alpha: number) {}
    public setAlpha(alpha: number) {
        this.alpha = alpha;
    }
}
