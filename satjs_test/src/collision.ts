import * as Konva from 'konva';
import * as SAT from 'sat';

const bounds = [] as {
  sprite: Konva.Group;
  shape: SAT.Circle;
}[];
export function collision(stage) {
  function addCircle(layer, color = 'red', stroke = 1) {
    const group = new Konva.Group({
      x: 100,
      y: 100,
      draggable: true,
    });

    const radius = 30;
    const circle = new Konva.Circle({
      x: 0,
      y: 0,
      radius: stroke ? radius - stroke / 2 : radius,
      fill: color,
      // stroke: stroke ? 'black' : undefined,
      // strokeWidth: stroke,
    });
    const shape = new SAT.Circle(new SAT.Vector(0, 0), 30);
    circle.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    circle.on('mouseout', function() {
      document.body.style.cursor = 'default';
    });
    group.add(circle);
    layer.add(group);

    bounds.push({
      sprite: group,
      shape: shape,
    });
    syncSpriteShapePos(group);
  }

  const layer = new Konva.Layer();
  addCircle(layer);
  addCircle(layer, 'green');

  stage.add(layer);

  stage.on('dragstart', function(evt) {
    const shape = evt.target;
  });

  stage.on('dragmove', function(evt) {
    const sprite = evt.target;
    syncSpriteShapePos(sprite);
    detectCollision();
  });
  stage.on('dragend', function(evt) {
    const shape = evt.target;
  });
}

function syncSpriteShapePos(sprite) {
  for (const item of bounds) {
    if (item.sprite == sprite) {
      const { x, y } = sprite.attrs;
      item.shape.pos = new SAT.Vector(x, y);
    }
  }
}

function detectCollision() {
  const temp = [];
  for (const item of bounds) {
    for (const other_item of bounds) {
      if (other_item == item) {
        continue;
      }
      if (hasCompare(item, other_item)) {
        continue;
      }
      temp.push([item, other_item]);
      const response = new SAT.Response();
      const collided = SAT.testCircleCircle(
        item.shape,
        other_item.shape,
        response,
      );
      if (collided) {
        console.log(response);
        drawCollisionDirect(item.sprite, response.overlapN);
      }
    }
  }

  function hasCompare(a, b) {
    for (const pairs of temp) {
      if (pairs.indexOf(a) != -1 && pairs.indexOf(b) != -1) {
        return true;
      }
    }
  }
}

let line;
function drawCollisionDirect(sprite, vector) {
  if (line) {
    line.remove();
  }
  const new_vector = vector.clone().scale(30, 30);
  line = new Konva.Line({
    points: [0, 0, new_vector.x, new_vector.y],
    stroke: 'balck',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
  });

  sprite.add(line);
}
