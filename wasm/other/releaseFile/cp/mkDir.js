// 从一个文件夹复制文件到另外文件夹
let fs = require('fs');

function createPath(path) {
    if (fs.existsSync(path)) {
        return true
    }
    let path_arr = path.split('\\');
    for (let i = 0; i < path_arr.length; i++) {
        let cur_dir = path_arr.slice(0, i + 1).join('\\');

        if (!fs.existsSync(cur_dir)) {
            fs.mkdirSync(cur_dir, 0755);
        }
    }
}

module.exports = createPath;