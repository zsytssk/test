import * as Konva from 'konva';
import * as SAT from 'sat';

const vector1 = new SAT.Vector(30, 40);
const vector2 = new SAT.Vector(50, 10);

export function vector(stage) {
  const layer = new Konva.Layer({
    x: 100,
    y: 100,
  });

  stage.add(layer);
  //   drawVector(layer, vector1);
  //   drawVector(layer, vector2);
  let vec = vector2.clone().project(vector1.reverse());
  let vec2 = vector2.clone().project(vec.clone().perp());
  drawVector(layer, vec);
  drawVector(layer, vec2);
  drawVector(layer, vec.add(vec2));
  stage.draw();
}

function drawVector(layer, vector) {
  const line = new Konva.Line({
    points: [0, 0, vector.x, vector.y],
    stroke: 'red',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  });

  layer.add(line);
}
