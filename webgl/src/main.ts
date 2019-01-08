/* eslint no-console:0 consistent-return:0 */
'use strict';

import { testDraw } from './test';
import { initWebGl } from './utils';
import { drawImage } from './image';

(() => {
    const gl = initWebGl();
    drawImage(gl);
})();
