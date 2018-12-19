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
    earth.x = 100;
    earth.y = 100;
    earth.pivotX = 150;
    earth.pivotY = 150;

    const moon = new Image();
    moon.skin = './image/Canvas_moon.png';
    earth.addChild(moon);
    moon.y = 40.5;

    setInterval(() => {
        earth.rotation = earth.rotation + 1;
        moon.rotation = earth.rotation + 1;
    }, 1000 / 60);
});
