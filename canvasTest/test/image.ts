import { Image } from '../lightCanvas/node/image';
import { Stage } from '../lightCanvas/node/stage';

export async function drawImage(stage: Stage) {
    const bg = new Image();
    bg.x = 0;
    bg.y = 0;
    stage.addChild(bg);
    bg.skin = 'image/bg.jpg';
    bg.x = stage.width / 2;
    bg.y = stage.height / 2;

    const size = 1334;
    bg.width = size;
    bg.height = size;

    bg.pivotX = size / 2;
    bg.pivotY = size / 2;

    // bg.pivotY = 0;
    const grid = new Image();
    grid.width = 500;
    grid.height = 500;
    grid.x = 100;
    grid.y = 100;
    grid.sizeGrid = '15, 15, 15, 15';
    grid.skin = 'image/grid.png';
    stage.addChild(grid);

    const progress_bg = new Image();
    progress_bg.width = 400;
    progress_bg.height = 10;
    progress_bg.x = (size - 400) / 2;
    progress_bg.y = 550;
    progress_bg.sizeGrid = '1, 6, 1, 6';
    progress_bg.skin =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKBAMAAABGe2PVAAAAG1BMVEUAAAAYGBgYGBgYGBgYGBgYGBgYGBgAAAAFBQWB2mzmAAAABnRSTlMArUTz8YZMmai8AAAAPElEQVQI12NgUHRLA4IUIQYG1jQoCGBQgzGTGMTS2suBoCItkcEtoxwM2pKRmQgFyNoQhgGtMAMxkoUYAMhHJFJ3YU2ZAAAAAElFTkSuQmCC';
    stage.addChild(progress_bg);

    const progress_width = 400 - 4;
    const progress_inner = new Image();
    progress_inner.skin =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAIBAMAAAAy1HOFAAAAJ1BMVEXndxX/jyH/jyDndxXndxX/jyAAAAD3hx3rexf/jyHndxX3hx3rexfH4o5VAAAACXRSTlPx8K2tJyYA8vIN/ftVAAAANUlEQVQI12NIVZwpFMYQOHPmTFEGTSA5iaESSE5n6ASSMxhsds6cfZjBYdWqVSwMKQarmN0AvFESu7w4GM0AAAAASUVORK5CYII=';
    progress_inner.x = 2;
    progress_inner.y = 1;
    progress_inner.height = 8;
    progress_inner.sizeGrid = '1, 4, 1, 4';
    // progress_inner.width = progress_width;
    progress_bg.addChild(progress_inner);

    let i = 0;
    const interval = setInterval(() => {
        i += 20;
        progress_inner.width = i;
        if (i > progress_width) {
            clearInterval(interval);
            i = 0;
        }
    }, 100);

    console.log(stage);
}
