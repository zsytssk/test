type Listener = (width: number, height: number) => void;

export function fixCanvas(canvas: HTMLCanvasElement, listener?: Listener) {
    setStyle(canvas, {
        position: 'absolute',
        left: 0,
        top: 0,
    });

    window.addEventListener('resize', canvasFullScreen);
    canvasFullScreen();

    function canvasFullScreen() {
        const { clientWidth, clientHeight } = document.documentElement;
        canvas.width = clientWidth;
        canvas.height = clientHeight;
        listener(clientWidth, clientHeight);
    }
}

export function setStyle(node: HTMLElement, style: {}) {
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        node.style[key] = style[key];
    }
}

export function degreeToAngle(degrees) {
    return (degrees * Math.PI) / 180;
}
/** 弧度转化为角度 */
export function angleTodegree(angle) {
    return (angle * 180) / Math.PI;
}
