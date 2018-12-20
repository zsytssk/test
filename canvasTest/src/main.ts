import { Image } from '../lightCanvas/api/image';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

load(res).then(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const sun = new Image();
    sun.skin = './image/Canvas_sun.png';
    sun.x = 0;
    sun.y = 0;
    sun.pivotX = 150;
    sun.pivotY = 150;
    stage.addChild(sun);

    setInterval(() => {
        sun.rotation = sun.rotation + 1;
        // moon.rotation = earth.rotation + 1;
    }, 1000 / 60);
});
