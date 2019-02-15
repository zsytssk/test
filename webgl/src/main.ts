/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawMatrix } from './matrix/matrix';
import { initWebGl } from './utils';
import { testDraw } from './test/test';

(() => {
    const gl = initWebGl();
    testDraw(gl);
})();
