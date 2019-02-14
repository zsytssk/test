import { Image } from '../../lightCanvas/node/image';
import { Stage } from '../../lightCanvas/node/stage';

export async function testAlphaGrid(stage: Stage) {
    const num = 10;
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            const test = new Image();
            test.skin = './image/test.jpg';
            test.x = i * 60;
            test.y = j * 60;
            test.width = 50;
            test.height = 50;
            test.alpha = (num - i) / num;
            stage.addChild(test);
        }
    }
}

export async function testAlphaRecursive(stage: Stage) {
    const num = 10;
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            const test = new Image();
            test.skin = './image/test.jpg';
            test.x = i * 60;
            test.y = j * 60;
            test.width = 50;
            test.height = 50;
            test.alpha = (num - i) / num;
            stage.addChild(test);
        }
    }
}
