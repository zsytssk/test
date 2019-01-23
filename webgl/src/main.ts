/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawText } from './text/text';
import { initWebGl } from './utils';

(() => {
    const gl = initWebGl();
    drawText(gl);
})();
