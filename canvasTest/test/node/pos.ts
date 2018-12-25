import { Image } from '../../lightCanvas/api/image';
import { Stage } from '../../lightCanvas/api/stage';

export function testPos(stage: Stage) {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
            const test = new Image();
            test.skin = './image/test.jpg';
            test.x = i * 60;
            test.y = j * 60;
            test.width = 50;
            test.height = 50;
            stage.addChild(test);
        }
    }
}
