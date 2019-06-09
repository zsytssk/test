const fs = require('fs');
const cpFile = require('./cpFile');
const cpDir = require('./cpDir');

module.exports = (src_path, dist_path) => {
    let stat = fs.lstatSync(src_path);
    let file_num = 1;
    if (stat.isFile()) {
        cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        file_num = cpDir(src_path, dist_path);
    }
    let log = `completed: <${src_path}-->${dist_path}>`;
    if (stat.isDirectory()) {
        log += `, file num:> ${file_num}`;
    }
    console.log(log);

    return file_num;
}