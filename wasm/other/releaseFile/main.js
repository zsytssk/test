/** 用package.json中的script发布文件
 * config.json位置在 ../save/config.json中
 * "src_git": "你本地开发的laya地址",
  "dist_git": "服务器git地址",
 * 下面的路径都是相对src_git 和dist_git的
 */

const cp = require('./cp/main');
const fileConfig = require('./config.json');

let type = process.argv.slice(2)[0];

let dist_git = fileConfig.dist_git;
let src_git = fileConfig.src_git;
global.ignore = fileConfig.ignore;

let date = new Date();
let res_map = fileConfig[type];
let file_num = 0;
for (let key in res_map) {
  let src_path = src_git + key;
  let dist_path = dist_git + res_map[key];

  file_num += cp(src_path, dist_path);
}
let seconds = (new Date() - date) / 1000;
console.log(`all completed: copy ${file_num} files cost ${seconds}s`);