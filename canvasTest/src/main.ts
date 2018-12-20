import { Image } from '../lightCanvas/api/image';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

load(res).then(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const sun = new Image();
    sun.skin = './image/Canvas_sun.png';
    sun.x = 100;
    sun.y = 100;
    sun.pivotX = 150;
    sun.pivotY = 150;
    stage.addChild(sun);

    function draw() {
        // sun.rotation = sun.rotation + 1;
        // window.requestAnimationFrame(draw);
    }
    draw();
});
