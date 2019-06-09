import * as Konva from 'konva';
import { loadRes, ResArr, getRes } from '../load';

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
      width: 100,
      height: 100,
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

    let is_start = false;
    group.addEventListener('touchstart', evt => {
      is_start = true;
    });

    stage.addEventListener('touchmove', evt => {
      if (!is_start) {
        return;
      }
      const touchPos = stage.getPointerPosition();
      const pos_group = globalToLocal(group, touchPos);
      const { x, y } = evt.target;
      const data = calcDirect(pos_group, 50);
      rockerDraw(data);
    });

    stage.addEventListener('touchend', evt => {
      is_start = false;
      rockerDraw({
        direct: [0, 0],
      });
    });

    function rockerDraw(data) {
      inner_node.setAttrs({
        x: data.direct[0],
        y: data.direct[1],
      });
      stage.draw();
    }
  });
}

function globalToLocal(node, pos) {
  return {
    x: pos.x - node.getAttr('x'),
    y: pos.y - node.getAttr('y'),
  };
}

function calcDirect({ x, y }, radius) {
  let angle = Math.atan2(y, x);
  let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

  if (dist > radius) {
    dist = radius;
  }
  const rate = Math.ceil((dist / radius) * 100);
  let direct = [Math.cos(angle) * dist, Math.sin(angle) * dist];
  direct = direct.map(v => Math.ceil(v));

  return { direct, angle, rate };
}
