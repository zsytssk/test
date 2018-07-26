import "./sailImport";
import "../laya/src/ui/layaUI.max.all.js";
import { CONFIG } from "./data/config";
import { RESMAP } from "./data/resMap";
import { load_util } from "./mcTree/utils/load";
import "./sail/lib/primus";
import "./sail/tools/keyboard";
import "./sail/tools/notify";
import { Hall } from "./scene/hall/scene";
import { GameWrap } from "./scene/game/sceneWrap";
import { CMD } from "./data/cmd";
import "./effect/scaleBtn";
import { detectModel } from "./mcTree/utils/zutil";
import { checkLogin } from "./utils/tool";
Sail.onStart = () => {
  if (!checkLogin()) {
    return;
  }
  load_util.setResmap(RESMAP);
  if (detectModel("showStat")) {
    Laya.Stat.show();
  }
  Laya.SoundManager.setMusicVolume(0.4);
  Laya.SoundManager.autoStopMusic = true;
  Sail.keyboard = new Tools.KeyBoardNumber();

  Sail.io.init({
    publicKey: CONFIG.publick_key,
    token: CONFIG.token,
    type: "primus",
    URL: CONFIG.websocket_url
  });

  /** 监听用户状态， 是否在游戏中 */
  Sail.io.register(CMD.GET_USER_INFO, this, (data: UserData) => {
    let scene_class;
    if (Number(data.userStatus) === 0) {
      scene_class = Hall;
    } else {
      scene_class = GameWrap;
    }
    Sail.director.runScene(new scene_class());
    Sail.io.unregister(CMD.GET_USER_INFO);
  });
  Sail.io.emit(CMD.GET_USER_INFO);
};

Sail.run({
  BASE_PATH: CONFIG.cdn_url,
  /** 弹窗模式 single:弹出弹窗时自动关闭其他弹窗, multiple : 允许弹出多层弹窗，可使用"closeOther:true"在弹出时关闭其他弹窗  */
  DIALOGTYPE: "multiple",
  HEIGHT: 750,
  /** 自动横屏时选择:Laya.Stage.SCALE_FIXED_WIDTH  自动竖屏时选择:Laya.Stage.SCALE_FIXED_HEIGHT  */
  SCALE_MODE: Laya.Stage.SCALE_FIXED_WIDTH,
  /** 可选自动横屏:Laya.Stage.SCREEN_HORIZONTAL 或者 自动竖屏:Laya.Stage.SCREEN_VERTICAL  */
  SCREEN_MODE: Laya.Stage.SCREEN_HORIZONTAL,
  VERSION: CONFIG.cdn_version,
  WIDTH: 1334
});
