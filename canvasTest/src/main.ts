import { Graphics } from '../lightCanvas/api/graphics';
import { Text } from '../lightCanvas/api/text';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

async function main() {
    await load(res);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);

    const hello = new Text();
    const graphics = new Graphics();
    graphics.alpha = 0.5;
    hello.graphics = graphics;
    graphics.drawRect(0, 0, 250, 100, 'blue');
    // graphics.drawLine(0, 0, 250, 250, 'red', 10);
    hello.text = 'hello world';
    hello.align = 'left';
    hello.valign = 'top';
    hello.font = 'SimSun';
    hello.fontSize = 30;
    hello.color = '#fff';
    hello.x = 100;
    hello.y = 100;
    hello.width = 250;
    hello.height = 100;
    stage.addChild(hello);

    const hello2 = new Text();
    const graphics2 = new Graphics();
    hello2.graphics = graphics2;
    graphics2.alpha = 0.5;
    graphics2.drawRect(0, 0, 250, 100, 'red');
    // graphics.drawLine(0, 0, 250, 250, 'red', 10);
    hello2.text = 'hello2 world';
    hello2.align = 'center';
    hello2.valign = 'middle';
    hello2.font = 'SimSun';
    hello2.fontSize = 30;
    hello2.color = '#fff';
    hello2.x = 100;
    hello2.y = 300;
    hello2.width = 250;
    hello2.height = 100;
    stage.addChild(hello2);
}
main();
