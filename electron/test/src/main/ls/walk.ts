import * as fs from 'fs';
import * as path from 'path';

export function walkSync(dir) {
  const dir_data = {
    name: path.basename(dir),
    path: dir,
    type: 'folder',
  } as AssetsPanelData;

  const children = [];
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const f_path = path.resolve(dir, file);
    if (fs.statSync(f_path).isDirectory()) {
      children.push(walkSync(f_path));
    } else {
      children.push({
        name: path.basename(f_path),
        path: f_path,
        tyle: 'file',
      });
    }
  });
  dir_data.children = children;
  return dir_data;
}
