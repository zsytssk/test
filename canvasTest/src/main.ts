import { Text } from '../lightCanvas/api/text';
import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { res } from './res';

async function main() {
    await load(res);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    const hello = new Text();
    hello.text = 'hello world';
    hello.font = 'Arial';
    hello.fontSize = 30;
    hello.color = 'red';
    stage.addChild(hello);
}
main();
