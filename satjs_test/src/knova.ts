import * as Konva from 'konva';

export function initStage() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
  });
  stage.draw();
  return stage;
}
