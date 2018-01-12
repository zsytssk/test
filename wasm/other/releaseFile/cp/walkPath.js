// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function (dir, filelist) {
  if (dir[dir.length - 1] != '/') dir = dir.concat('/')

  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);

  filelist = filelist || [];
  files.forEach(function (file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push(dir + file);
    }
  });
  return filelist;
};

module.exports = walkSync;