/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawMatrix } from './matrix/matrix';
import { initWebGl } from './utils';

(() => {
    const gl = initWebGl();
    drawMatrix(gl);
})();
