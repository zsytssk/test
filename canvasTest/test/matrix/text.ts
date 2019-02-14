import { Image } from '../../lightCanvas/node/image';
import { Stage } from '../../lightCanvas/node/stage';
import { Text } from '../../lightCanvas/node/text';

export function testText(stage: Stage) {
    const moon = new Image();
    moon.width = 250;
    moon.height = 100;
    moon.x = 100;
    moon.y = 100;
    moon.skin = './image/Canvas_sun.png';
    stage.addChild(moon);

    const hello = new Text();
    hello.text = 'www';
    hello.font = 'Arial';
    hello.align = 'left';
    hello.valign = 'bottom';
    hello.fontSize = 50;
    hello.stroke = 10;
    hello.strokeColor = 'blue';
    hello.color = '#fff';
    hello.x = 100;
    hello.y = 100;
    hello.width = 250;
    hello.height = 100;
    stage.addChild(hello);
}
