export function fixCanvas(canvas: HTMLCanvasElement) {
    setType(canvas, {
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

export function setType(node: HTMLElement, style: {}) {
    for (const key in style) {
        if (!style.hasOwnProperty(key)) {
            continue;
        }
        node.style[key] = style[key];
    }
}
