import { Image } from '../lightCanvas/api/image';
import { Text } from '../lightCanvas/api/text';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

async function main() {
    await load(res);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);

    const moon = new Image();
    moon.width = 250;
    moon.height = 100;
    moon.x = 100;
    moon.y = 100;
    moon.skin = './image/Canvas_sun.png';
    stage.addChild(moon);

    const hello = new Text();
    hello.text = '刘小勇是sb';
    hello.align = 'right';
    hello.valign = 'bottom';
    hello.fontSize = 50;
    hello.color = '#fff';
    hello.x = 100;
    hello.y = 100;
    hello.width = 250;
    hello.height = 100;
    stage.addChild(hello);
}
main();
