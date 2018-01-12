const fs = require('fs');
const walkPath = require('./walkPath');
const cpFile = require('./cpFile');
const isIgnore = require('./isIgnore');

function cpDir(src_folder, dist_folder) {
  if (!fs.existsSync(src_folder)) {
    console.error(`${src_folder} doesn't exist!`);
    return;
  }

  if (isIgnore(src_folder)) {
    console.error(`${src_path} is ignore!`);
    return;
  }

  let files = walkPath(src_folder);
  for (let i = 0; i < files.length; i++) {
    let src_file = files[i];
    let dist_file = src_file.replace(src_folder, dist_folder);
    cpFile(src_file, dist_file);
  }
  return files.length;
}

module.exports = cpDir;