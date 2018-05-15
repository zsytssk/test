import * as fs from 'fs';

export function walkSync(dir, file_list?) {
  if (dir[dir.length - 1] !== '/') {
    dir = dir.concat('/');
  }

  const files = fs.readdirSync(dir);
  file_list = file_list || [];
  files.forEach(file => {
    if (fs.statSync(dir + file).isDirectory()) {
      file_list = walkSync(dir + file + '/', file_list);
    } else {
      file_list.push(dir + file);
    }
  });
  return file_list;
}
