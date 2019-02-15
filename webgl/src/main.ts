/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawImage } from './image/image';
import { initWebGl } from './utils';
import { testDraw } from './test/test';

(() => {
    const gl = initWebGl();
    testDraw(gl);
    // drawImage(gl);
})();
