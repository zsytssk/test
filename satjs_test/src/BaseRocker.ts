import * as EventEmitter from 'wolfy87-eventemitter';

export const Event = {
  move: 'move',
  stop: 'stop',
};

export class BaseRocker extends EventEmitter {
  moved = false;
  radius: number;
  direct: number[] = [];
  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  onStart() {
    this.moved = true;
  }

  onMove({ x, y }) {
    let r = this.radius;
    let disX = x - r;
    let disY = y - r;
    let dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

    let rate = Math.min(dis / r, 1) * 100;
    let angle = Math.atan2(disY, disX);
    let direct = [Math.cos(angle) * rate, Math.sin(angle) * rate];
    direct = direct.map(v => Math.ceil(v));
    this.direct = direct;

    this.trigger('MOVE', [{ direct, rate, angle }]);
    this.moved = true;
  }

  stop() {
    this.direct = [0, 0];

    this.trigger('stop', [this.direct, this.moved]);
    this.moved = false;
  }
}
