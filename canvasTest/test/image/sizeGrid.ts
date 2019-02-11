import { Image } from '../lightCanvas/api/image';
import { Stage } from '../lightCanvas/api/stage';

export async function drawImage(stage: Stage) {
    const grid = new Image();
    grid.width = 500;
    grid.height = 500;
    grid.x = 100;
    grid.y = 100;
    grid.sieGrid = '15, 15, 15, 15';
    grid.skin = 'image/grid.png';
    stage.addChild(grid);
}
