import { init } from '../lightCanvas/main';
import { testPivot2 } from './node/pivot';

function main() {
    const { stage } = init(1334, 750, {});
    testPivot2(stage);
}
main();
