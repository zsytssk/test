import { fixCanvas } from '../core/utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

fixCanvas(canvas);

ctx.translate(100, 100);
const num = 100;
const sin = Math.sin((Math.PI / num) * 2);
const cos = Math.cos((Math.PI / num) * 2);
for (let i = 0; i <= num - 1; i++) {
    const c = Math.floor((16777215 / num) * i);
    const style = `#${c.toString(16)}`;
    console.log(style);
    ctx.fillStyle = style;
    ctx.fillRect(0, 0, 100, 3);
    ctx.transform(cos, sin, -sin, cos, 0, 0);
}

ctx.setTransform(-1, 0, 0, 1, 100, 100);
ctx.fillStyle = 'rgba(255, 128, 255, 0.5)';
ctx.fillRect(0, 50, 100, 100);
