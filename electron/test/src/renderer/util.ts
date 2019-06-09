export function generateRandomString() {
  return Math.random()
    .toString(36)
    .substr(2);
}

// log
function createLog(type?) {
  // tslint:disable-next-line:no-empty only-arrow-functions
  const empty_fn = function() {};

  type = type || 'log';

  if (!window.console) {
    return empty_fn;
  }
  // tslint:disable-next-line:no-shadowed-variable
  let log = console[type];
  if (!log) {
    log = console.log;
  }
  return log.bind(window.console);
}

export const log = createLog();

/** 获取节点的位置... */
export function getNodeOffset(node) {
  const offset = {
    left: 0,
    top: 0,
  } as {
    left: number;
    top: number;
  };
  while (node.offsetParent) {
    offset.left += node.offsetLeft;
    offset.top += node.offsetTop;

    node = node.offsetParent;
  }

  return offset;
}
