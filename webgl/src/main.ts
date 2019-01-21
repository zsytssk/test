/* eslint no-console:0 consistent-return:0 */
'use strict';

import { drawMultiImages } from './image/multiImages';
import { initWebGl } from './utils';
import { drawImage } from './image/image';

(() => {
    const gl = initWebGl();
    drawMultiImages(gl);
})();
