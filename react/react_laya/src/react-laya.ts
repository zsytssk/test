import * as React from "react";

type LayaConfig = {
  width: number;
  height: number;
  webgl?: boolean;
};

export function initState(config: LayaConfig) {
  //程序入口
  Laya.init(config.width, config.height);
}

function getInstance(element) {
  return new element.type();
}

export function render(element) {
  let instance = getInstance(element);
  console.log(instance);
  Laya.stage.addChild(instance.render());
}
