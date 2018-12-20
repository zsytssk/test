import { Image } from '../lightCanvas/api/image';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

load(res).then(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const sun = new Image();
    sun.skin = './image/Canvas_sun.png';
    sun.pivotX = 150;
    sun.pivotY = 150;
    stage.addChild(sun);

    const earth = new Image();
    earth.skin = './image/Canvas_earth.png';
    sun.addChild(earth);
    earth.x = 100;
    earth.y = 100;
    // earth.scaleX = 2;
    earth.pivotX = 24 / 2;
    earth.pivotY = 24 / 2;

    const moon = new Image();
    moon.skin = './image/Canvas_moon.png';
    earth.addChild(moon);

    setInterval(() => {
        earth.rotation = earth.rotation + 1;
        // moon.rotation = earth.rotation + 1;
    }, 1000 / 60);
});
