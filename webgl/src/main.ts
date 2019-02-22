/* eslint no-console:0 consistent-return:0 */
'use strict';

import { initWebGl } from '../doc/utils1';
import { testDraw } from './test/test';

(() => {
    const gl = initWebGl();
    testDraw(gl);
    // drawImage(gl);
})();
