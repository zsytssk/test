import { init } from '../lightCanvas/main';
import { recursivePivot } from './node/pivot';
import { testAlphaRecursive } from './node/alpha';

function main() {
    const { stage } = init(1334, 750, { bg_color: '#ffffff' });
    recursivePivot(stage);
}
main();
