/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawTriangle } from './triangle';
import { initWebGl } from './utils';

(() => {
    const gl = initWebGl();
    drawTriangle(gl);
})();
