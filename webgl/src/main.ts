/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawImage } from './image/image';
import { initWebGl } from '../doc/utils1';
import { testDraw } from './test/test';
import { testTexture } from './test/texture';

(() => {
    const gl = initWebGl();
    testDraw(gl);
    // drawImage(gl);
})();
