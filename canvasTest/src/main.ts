import { Image } from '../lightCanvas/api/image';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

load(res).then(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const sun = new Image();
    sun.skin = './image/Canvas_sun.png';
    stage.addChild(sun);

    const earth = new Image();
    earth.skin = './image/Canvas_earth.png';
    sun.addChild(earth);
    earth.x = -12;
    earth.y = -12;
    earth.pivotX = 105;
    earth.pivotY = 0;

    setInterval(() => {
        earth.rotation = earth.rotation + 1;
    }, 1000 / 60);

    const moon = new Image();
    moon.skin = './image/Canvas_moon.png';
    earth.addChild(moon);
});
