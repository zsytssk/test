/* eslint no-console:0 consistent-return:0 */
'use strict';

import { testDraw } from './test';
import { initWebGl } from './utils';

(() => {
    const gl = initWebGl();
    testDraw(gl);
})();
