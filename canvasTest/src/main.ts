import { Graphics } from '../lightCanvas/api/graphics';
import { Text } from '../lightCanvas/api/text';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

async function main() {
    await load(res);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);

    const hello2 = new Text();
    const graphics2 = new Graphics();
    hello2.graphics = graphics2;
    graphics2.drawPoly(
        250 / 2,
        100 / 2,
        [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 100 }],
        undefined,
        'red',
    );
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
