import { fixCanvas } from './utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

fixCanvas(canvas);

const img = new Image();
img.onload = () => {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
};
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
