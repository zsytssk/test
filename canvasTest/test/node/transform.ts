import { Image } from '../../lightCanvas/api/image';
import { init } from '../../lightCanvas/main';
import { load } from '../../lightCanvas/utils/load';
import { res } from './res';

export function testPivot() {
    load(res).then(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const stage = init(canvas);
        const sun = new Image();
        sun.skin = './image/Canvas_sun.png';
        sun.x = 150;
        sun.y = 150;
        sun.pivotX = 150;
        sun.pivotY = 150;
        stage.addChild(sun);

        const earth = new Image();
        earth.skin = './image/Canvas_earth.png';
        earth.x = 150;
        earth.y = 150;
        earth.pivotX = 80;
        earth.pivotY = 80;
        sun.addChild(earth);

        const moon = new Image();
        moon.skin = './image/Canvas_moon.png';
        moon.x = 12;
        moon.y = 12;
        moon.pivotX = 30;
        moon.pivotY = 30;
        earth.addChild(moon);

        function draw() {
            sun.rotation = sun.rotation + 0.1;
            earth.rotation = earth.rotation + 1;
            moon.rotation = moon.rotation + 3;
            window.requestAnimationFrame(draw);
        }
        draw();
    });
}

export function testScale() {
    load(res).then(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const stage = init(canvas);
        const sun = new Image();
        sun.skin = './image/Canvas_sun.png';
        sun.x = 150;
        sun.y = 150;
        sun.pivotX = 150;
        sun.pivotY = 150;
        sun.scaleX = 0.5;
        sun.scaleY = 0.5;
        stage.addChild(sun);

        const earth = new Image();
        earth.skin = './image/Canvas_earth.png';
        earth.x = 150;
        earth.y = 150;
        earth.pivotX = 80;
        earth.pivotY = 80;
        sun.addChild(earth);

        function draw() {
            sun.rotation = sun.rotation + 0.1;
            earth.rotation = earth.rotation + 1;
            window.requestAnimationFrame(draw);
        }
        draw();
    });
}
