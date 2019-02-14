import { Image } from '../../lightCanvas/node/image';
import { Stage } from '../../lightCanvas/node/stage';

export function testScale(stage: Stage) {
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
}
