import * as path from 'path';
import { lstat, readdir } from './asyncUtil';

export async function walk(dir) {
    dir = path.normalize(dir);

    let file_list = [];
    const files = await readdir(dir);

    for (const file of files) {
        const file_path = path.join(dir, file);
        const stat = await lstat(file_path);
        if (stat.isDirectory()) {
            const sub_files = await walk(file_path);
            file_list = file_list.concat(sub_files);
        } else {
            file_list.push(file_path);
        }
    }

    return file_list;
}
