import { Image } from '../../lightCanvas/api/image';
import { init } from '../../lightCanvas/main';
import { load } from '../../lightCanvas/utils/load';
import { res } from './res';

load(res).then(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const sun = new Image();
    sun.skin = './image/Canvas_sun.png';
    sun.x = 0;
    sun.y = 0;
    sun.alpha = 0.5;
    stage.addChild(sun);

    const earth = new Image();
    earth.skin = './image/Canvas_earth.png';
    earth.x = 350;
    earth.y = 0;
    earth.alpha = 0.5;
    sun.addChild(earth);
});
