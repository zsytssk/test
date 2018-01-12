// 从一个文件夹复制文件到另外文件夹
const fs = require('fs');
const path = require('path');
const mkDir = require('./mkDir');
const isIgnore = require('./isIgnore');

function copyFile(src_path, dist_path) {
  if (isIgnore(src_path)) {
    console.error(`${src_path} is ignore!`);
    return;
  }
  let dist_dir = path.resolve(path.dirname(dist_path));
  if (!fs.existsSync(src_path)) {
    console.error(`${src_path} doesn't exist`);
    return;
  }
  mkDir(dist_dir);

  let readStream = fs.createReadStream(src_path);
  let writeStream = fs.createWriteStream(dist_path);

  readStream.on('data', function (data) {
    writeStream.write(data);
  });
  readStream.on('error', function (err) {
    throw err;
  });
  readStream.on('end', function (done) {
    writeStream.end();
    if (done) done();
  });
}

module.exports = copyFile;