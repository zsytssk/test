import MapCtrl from 'game/battle/ctrl/map';
import RoleInfo from './roleinfo';

const HIT_BACK_DURING = 450;

const { Tween, Handler, Event } = Laya;

export default class RoleBase extends Laya.Sprite {
  syncInfo(syncData) {}

  tick(time) {
    /** 用户死亡不再运动 */
    if (this.status == ROLE_STATUS.DIE || this.status == ROLE_STATUS.HIT_BACK) {
      return;
    }
    /** 前端和服务端差距太大 */
    if (this.fix_direct) {
      this.moveStatus = 1;
      let { x, y } = this.force_center;
      const local_to_server = new SAT.Vector(x - this.x, y - this.y);
      const local_server_distance = local_to_server.len();

      /** 如果 local_server_distance 和 this.fix_direct 反方向, 只会原来越远 */
      const dot_direct = local_to_server.dot(this.fix_direct);
      /** 如果本地位置已经接近目标 无需继续计算 */
      if (local_server_distance < 10 || dot_direct <= 0) {
        this.moveStatus = 0;
        this.fix_direct = undefined;
        this.setPos({ x, y }, true);
        return;
      }

      // let scale = (time * 1) / 3;
      let scale = (time * 1) / 3;
      if (scale > 1) {
        scale = 1;
      }

      let distance = this.fix_direct.clone().scale(scale, scale);
      let calc_pos = {
        x: this.x + distance.x,
        y: this.y + distance.y,
      };
      this.setPos(calc_pos, true);
      return;
    }
    const { x, y } = this.direct;
    if (x == 0 && y == 0) {
      return;
    }

    /** 如果是前端和服务器存在大偏差 不需要其他的计算直接移动过去 */
    let distance = this.calcPos(this.direct, time);

    const aim = {
      x: this.x + distance.x,
      y: this.y + distance.y,
    };

    /** 本地碰撞检测 */
    let calc_pos = MapCtrl.I.getCollisionUtil().correctRolePos(this, aim);
    // console.log(`test:>calc_pos`, calc_pos);
    this.setPos(calc_pos);
  }
  setPos(pos, view_port_fix) {
    this.x = round(pos.x, 2);
    this.y = round(pos.y, 2);

    if (
      this.direct.x != 0 &&
      !this.showedSight &&
      this.actionStatus !== ROLE_STATUS.ATTACK
    ) {
      this.faceDirect = this.direct.x < 0 ? -1 : 1;
    }
    this.zOrder = parseInt(this.y);
    if (this.isMyRole) {
      if (!view_port_fix) {
        MapCtrl.I.moveViewPort(this.x, this.y);
      }
      this.indicatorPos = [this.x, this.y - this.data.weapon.firePoint];
    }

    if (Sail.DEBUG) {
      this.drawTrail({ x: this.x, y: this.y }, 'local');
    }
  }

  calcPos(direct, time) {
    const d = Math.ceil(direct.len());
    if (d == 0) {
      return {
        x: 0,
        y: 0,
      };
    }

    // 行走直线距离=最大速度*速度百分比*时间(截取两位小数)
    let distance = round((((this.data.speed * d) / 100) * 1000) / 60 / 1000, 2);
    distance *= time;

    let new_direct = direct.clone();
    if (this.force_center) {
      let len = new_direct.len();

      /** 普通位置偏移的修正 -- 向心力 */
      const { x, y } = this.force_center;
      const force = new SAT.Vector(x - this.x, y - this.y).scale(0.8, 0.8);
      // console.log(
      //     `test:>calcPos1`,
      //     this.force_center,
      //     this.x,
      //     this.y,
      //     new_direct.len(),
      //     force.len()
      // );
      new_direct
        .add(force)
        .normalize()
        .scale(len, len);
      // console.log(`test:>calcPos2`, new_direct.len(), force.len());

      /**点积--向量夹角关系: >0 锐角 = 0 垂直 <0 钝角*/
      let dot_direct = direct.dot(new_direct);
      /** 如果原方向和新方向s 夹角是钝角 说明 force 和 direct 接近相反方向且force > direct
       * 这时候应该是服务器断开连接
       */
      if (dot_direct <= 0) {
        /** 防止在两点来回跳动, 这时候一般情况下是 force 和 direct 接近相反方向
         * 两点计算的new_direct 正好是相反方向, 这样就会在两点间跳动, 这时候new_direct 应该狠下
         */
        /** 计算 direct 中垂直与 force 方向的速度 形成围绕一个圆转动的效果*/
        new_direct = direct.clone().project(force.perp());
        if (new_direct.len() < 5) {
          return { x: 0, y: 0 };
        }
      }
    }

    const distance_direct = new_direct.normalize().scale(distance, distance);

    // 按照比例计算终点
    return {
      x: round(distance_direct.x, 2),
      y: round(distance_direct.y, 2),
    };
  }

  /** 绘制行走路径 */
  drawTrail(pos, type) {
    const parent_node = this.parent;
    let color = '#00ffff';
    if (type == 'server') {
      color = '#0000ff';
    } else if (type == 'test-ser') {
      color = '#23d283';
    }
    if (!this.isMyRole) {
      color = '#ff0000';
    }
    drawTrail(parent_node, pos, color);
  }

  startMove(direct) {
    if (Math.abs(direct[0]) < 0.1 && Math.abs(direct[1]) < 0.1) {
      return this.stop();
    }
    this.moveStatus = 1;
    this.checked = true;

    this.shouldSyncToServe(direct);
  }

  /** 当前用户的位置同步 */
  checkFromServer(syncData, lostime, fps) {
    const { x, y, status } = syncData;
    this.syncInfo(syncData);

    if (status == ROLE_STATUS.DIE) {
      this.fix_direct = undefined;
      this.force_center = undefined;
      this.setPos({ x, y });
      return;
    } else if (status == ROLE_STATUS.REBORN) {
      this.setPos({ x, y });
      return;
    } else if (status == ROLE_STATUS.HIT_BACK) {
      Tween.to(
        this,
        { x, y },
        HIT_BACK_DURING,
        Laya.Ease.quadOut,
        Handler.create(this, () => {
          this.setPos({ x, y });
        }),
      );
      return;
    }

    /** 用户的位置修正 */
    this.roleLocalPosFix(syncData);
  }
  /** 用户的位置修正 */
  roleLocalPosFix(syncData) {
    let { x, y, mx, my, d, status } = syncData;
    this.force_center = { x: x, y: y };

    // @test
    let server_direct = new SAT.Vector(mx * d, my * d);
    if (server_direct.len() != this.direct.len()) {
      console.log(
        `test:>roleLocalPosFix`,
        server_direct,
        server_direct.len(),
        this.direct,
        this.direct.len(),
      );
    }
    const local_to_server = new SAT.Vector(x - this.x, y - this.y);
    const local_server_distance = local_to_server.len();

    if (local_server_distance <= 1) {
      return;
    }
    if (Sail.DEBUG) {
      this.drawTrail({ x, y }, 'server');
    }

    /** 如果本地和服务器都停止了但是两者都有误差, 那么就跳动过去 */
    if (this.direct.x == 0 && this.direct.y == 0 && mx == 0 && my == 0) {
      this.setFixDirect(local_to_server);
      // console.log('test:>roleLocalPosFix1', this.fix_direct.len());
      return;
    }

    /** 位移的差距 在速度的方向上, 就是服务端在客户端后面, 不做处理 */
    if (Math.abs(mx / my - (this.x - x) / (this.y - y)) < 0.1) {
      return;
    }

    if (local_server_distance > 50) {
      /** 如果位移差 超过一定的范围直接 重置前段的位置 */
      if (this.isMyRole) {
        console.log(
          `test:>roleLocalPosFix2:>losttime`,
          UICtrl.I.stat.lost_time,
          local_server_distance,
        );
      }
      this.setFixDirect(local_to_server);
      return;
    }
  }
  setFixDirect(local_to_server) {
    let local_server_distance = local_to_server.len();
    let max_fps = 10;
    let fps_space = 7;
    let fix_fps = Math.ceil(local_server_distance / fps_space);
    if (fix_fps > max_fps) {
      fix_fps = 5;
    }
    const fix_scale = 1 / fix_fps;
    this.fix_direct = local_to_server.scale(fix_scale, fix_scale);
  }
  /**
   * 同步
   */
  syncFromServer(syncData, fps, lostime) {
    this.syncInfo(syncData);
    let { x, y, mx, my, d, status } = syncData;

    if (status == ROLE_STATUS.DIE) {
      this.fix_direct = undefined;
      this.force_center = undefined;
      this.setPos({ x, y });
      return;
    } else if (status == ROLE_STATUS.REBORN) {
      this.setPos({ x, y });
      return;
    } else if (status == ROLE_STATUS.HIT_BACK) {
      Tween.to(
        this,
        { x, y },
        HIT_BACK_DURING,
        Laya.Ease.quadOut,
        Handler.create(this, () => {
          this.setPos({ x, y });
        }),
      );
      return;
    }

    this.direct = new SAT.Vector(mx * d, my * d);
    if (Sail.DEBUG) {
      this.drawTrail({ x, y }, 'server');
    }
    this.moveStatus = d > 0 ? 1 : 0;
    this.roleLocalPosFix(syncData);
  }

  shouldSyncToServe(direct) {
    let now = Date.now();
    if (!this.lastSendTime || now - this.lastSendTime >= 30) {
      let ds = direct.join(',');
      if (this.lastDirect && ds == this.lastDirect) return;
      this.lastDirect = ds;
      this.lastSendTime = now;
      this.direct = new SAT.Vector(direct[0], direct[1]);
      let x = parseInt(this.x),
        y = parseInt(this.y);

      Sail.io.emit('go', {
        mx: direct[0],
        my: direct[1],
        roomNo: this.manger.roomNo,
        x: x,
        y: y,
      });
    }
  }

  stop() {
    this.direct = new SAT.Vector(0, 0);
    this.moveStatus = 0;
    let x = parseInt(this.x),
      y = parseInt(this.y);
    this.lastDirect = [0, 0].join(',');
    Sail.io.emit('stop', { x: x, y: y, roomNo: this.manger.roomNo });
  }

  set faceDirect(val) {}

  get faceDirect() {}

  set status(val) {}

  get status() {
    return this._status;
  }

  set moveStatus(val) {
    let status = [3, 4];
    if (this._moveStatus === val && !status.includes(val)) return;
    this._moveStatus = val;
    Laya.timer.clear(this, this.addFootprint);
    switch (val) {
      case 0: // 站立
        this.body.play('standby', true);
        this.weaponAni && this.weaponAni.play('standby', true);
        if (this.stepAni) {
          this.stepAni.stop();
          this.stepAni.visible = false;
        }
        break;
      case 1: // 行走
        this.body.play('walk', true);
        this.weaponAni && this.weaponAni.play('walk', true);
        Laya.timer.loop(400, this, this.addFootprint);
        break;
      case -1:
        this.body.stop();
        this.weaponAni && this.weaponAni.stop();
        if (this.stepAni) {
          this.stepAni.stop();
          this.stepAni.visible = false;
        }
        break;
    }
  }

  get moveStatus() {
    return this._moveStatus;
  }
}
