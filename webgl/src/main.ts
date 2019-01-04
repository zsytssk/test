/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawImage } from './image';
import { initWebGl } from './utils';

(() => {
    const gl = initWebGl();
    drawImage(gl);
})();
