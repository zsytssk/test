import { Image } from '../../lightCanvas/node/image';
import { Stage } from '../../lightCanvas/node/stage';

export async function testPivot(stage: Stage) {
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

    const sun2 = new Image();
    sun2.skin = './image/Canvas_sun.png';
    sun2.x = 450;
    sun2.y = 450;
    sun2.pivotX = 150;
    sun2.pivotY = 150;
    stage.addChild(sun2);

    const earth2 = new Image();
    earth2.skin = './image/Canvas_earth.png';
    earth2.x = 150;
    earth2.y = 150;
    earth2.pivotX = 80;
    earth2.pivotY = 80;
    sun2.addChild(earth2);

    const moon2 = new Image();
    moon2.skin = './image/Canvas_moon.png';
    moon2.x = 12;
    moon2.y = 12;
    moon2.pivotX = 30;
    moon2.pivotY = 30;
    earth2.addChild(moon2);

    function draw() {
        sun.rotation = sun.rotation + 0.1;
        earth.rotation = earth.rotation + 1;
        moon.rotation = moon.rotation + 3;

        sun2.rotation = sun2.rotation + 0.1;
        earth2.rotation = earth2.rotation + 1;
        moon2.rotation = moon2.rotation + 3;
        window.requestAnimationFrame(draw);
    }
    draw();
}

export async function testPivot2(stage: Stage) {
    const num = 10;
    const list: Image[] = [];
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            const test = new Image();
            test.skin = './image/test.jpg';
            test.x = (i + 1) * 60;
            test.y = (j + 1) * 60;
            test.width = 50;
            test.height = 50;
            test.pivotX = 25;
            test.pivotY = 25;
            list.push(test);
            stage.addChild(test);
        }
    }

    function draw() {
        for (let item of list) {
            item.rotation += 1;
        }
        window.requestAnimationFrame(draw);
    }
    draw();
}
