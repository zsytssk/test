import { fixCanvas } from '../lightCanvas/utils/utils';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

fixCanvas(canvas);
const sun = new Image();
sun.src = './image/test.png';

testPivot();

function testPivot() {
    let rotation = 0;
    setInterval(() => {
        ctx.save();
        ctx.clearRect(0, 0, 500, 500);
        ctx.save();
        ctx.translate(128 / 2, 128 / 2);
        rotation += Math.PI / 400;
        ctx.rotate(rotation);
        ctx.translate(-128 / 2, -128 / 2);
        ctx.drawImage(sun, 0, 0, 128, 128);
        ctx.restore();
        ctx.restore();
    }, 1000 / 60);
}
