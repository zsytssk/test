export function fixCanvas(canvas: HTMLCanvasElement) {
    setStyle(canvas, {
        position: 'absolute',
        left: 0,
        top: 0,
    });

    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
    window.addEventListener('resize', () => {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
    });
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
/**弧度转化为角度*/
export function angleTodegree(angle) {
    return (angle * 180) / Math.PI;
}
