import * as Konva from 'konva';
import { loadRes, ResArr, getRes } from './load';

const res = [
  {
    url: '../assets/bg.png',
    type: 'Image',
  },
  {
    url: '../assets/inner.png',
    type: 'Image',
  },
] as ResArr;

export function rockerSprite(stage) {
  loadRes(res, () => {
    const group = new Konva.Group({
      x: 100,
      y: 300,
    });
    const bg = getRes('../assets/bg.png');
    const inner = getRes('../assets/inner.png');

    const bg_node = new Konva.Image({
      x: 0,
      y: 0,
      image: bg,
      width: 100,
      height: 100,
      offsetY: 50,
      offsetX: 50,
    });
    const inner_node = new Konva.Image({
      x: 0,
      y: 0,
      image: inner,
      width: 50,
      height: 50,
      offsetX: 25,
      offsetY: 25,
    });

    const layer = new Konva.Layer({
      x: 0,
      y: 0,
    });

    stage.add(layer);

    group.add(bg_node);
    group.add(inner_node);
    layer.add(group);
    stage.draw();
  });
}
