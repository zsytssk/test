import { init } from '../lightCanvas/main';
import { load } from '../lightCanvas/utils/load';
import { testPivot } from './node/pivot';
import { res } from './res';

async function main() {
    await load(res);
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const stage = init(canvas);
    testPivot(stage);
}
main();
