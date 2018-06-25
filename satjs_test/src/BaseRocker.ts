let touchInArea = 0,
  panel;

const { Event } = Laya;

export class BaseRocker {
  mirror = false;
  constructor() {
    this.mirror = false;
  }

  init(mirror) {
    this.mirror = mirror;
    this.size(270, 270);
    this.pivot(135, 135);
    this.skin = 'res/game/rocker/bg.png';
    this.inner = new Laya.Image();
    this.inner.skin = 'res/game/rocker/stick_move.png';
    this.inner.size(142, 142);
    this.inner.pivot(this.inner.width / 2, this.inner.height / 2);
    this.inner.pos(this.width / 2, this.height / 2);
    this.addChild(this.inner);

    return this;
  }

  onStart(e) {
    if (!this.active) return;
    this._touchId = e.touchId;
    this.resetPos = [this.x, this.y];
    if (this.touchInArea == 1) {
      this.pos(Laya.stage.mouseX, Laya.stage.mouseY);
    }
    if (panel) {
      panel.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
      panel.on(Laya.Event.MOUSE_OUT, this, this.stop, [false]);
      panel.on(Laya.Event.MOUSE_UP, this, this.stop, [true]);
    }
  }

  onMove(e) {
    if (e.touchId != this._touchId) return;
    let r = this.width / 2;
    let disX = this.mouseX - r;
    let disY = this.mouseY - r;
    let dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));

    let n = Math.min(r / dis, 1);
    let changeX = n * disX;
    let changeY = n * disY;

    this.inner.x = r + changeX;
    this.inner.y = r + changeY;

    if (this.mirror) {
      disX = -disX;
    }

    let rate = Math.min(dis / r, 1) * 100;
    let angle = Math.atan2(disY, disX);
    let direct = [Math.cos(angle) * rate, Math.sin(angle) * rate];
    direct = direct.map(v => parseInt(v));
    this.direct = direct;

    this.active && this.event('ROKER_MOVE', [{ direct, rate, angle }]);

    if (this.touchInArea !== 1) {
      CancleBtn.getInstance().visible = true;
    }
    this.moved = true;
  }

  stop(isExecute, e) {
    if (e.touchId != this._touchId) return;

    if (isExecute === false) this.direct = [0, 0];

    this.active && this.event('ROKER_EXECUTE', [this.direct, this.moved]);
    this.moved = false;

    this.inner.pos(this.width / 2, this.height / 2);
    this.pos(this.resetPos[0], this.resetPos[1]);
    if (panel) {
      panel.off(Laya.Event.MOUSE_MOVE, this, this.onMove);
      panel.off(Laya.Event.MOUSE_OUT, this, this.stop);
      panel.off(Laya.Event.MOUSE_UP, this, this.stop);
    }
    CancleBtn.getInstance().visible = false;
  }

  cancle(e) {
    if (e.touchId != this._touchId) return;
    this.stop(false, e);
  }
}
