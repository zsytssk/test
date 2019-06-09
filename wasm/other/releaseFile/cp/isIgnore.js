const path = require('path');
const fs = require('fs');

function isIgnore(src_path) {
  let ignores = global.ignore;
  if (!ignores) {
    return false;
  }

  let is_dir = fs.statSync(src_path).isDirectory();
  for (let i = 0; i < ignores.length; i++) {
    let item = ignores[i];

    let index_item = src_path.indexOf(item);
    if (index_item == -1) {
      continue;
    }
    if (is_dir) {
      return true;
    }
    if (index_item + item.length == src_path.length) {
      return true;
    }
  }
  return false;
}

module.exports = isIgnore;