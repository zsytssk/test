import { Image } from '../dom/image';
import { getRes } from '../utils/load';
import { ctx } from './canvas';

export function drawImage(img: Image) {
    const { skin } = img;
    const img_ele = getRes(skin);
    if (img_ele) {
        ctx.drawImage(img_ele, 0, 0);
    }
}
