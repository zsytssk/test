export class BaseRocker {
  radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }

  move({ x, y }) {
    let r = this.radius;
    let angle = Math.atan2(y, x);
    let dist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    if (dist > r) {
      dist = r;
    }
    const rate = Math.ceil((dist / r) * 100);
    let direct = [Math.cos(angle) * dist, Math.sin(angle) * dist];
    direct = direct.map(v => Math.ceil(v));

    return { direct, angle, rate };
  }

  stop() {
    return { direct: [0, 0] };
  }
}
