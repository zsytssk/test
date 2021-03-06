// 从一个文件夹复制文件到另外文件夹
import * as fs from 'fs';
import * as path from 'path';
import { exists } from './asyncUtil';
import { isIgnore } from './ignore';
import { mk } from './mk';

export async function cpFile(src_path, dist_path) {
    if (isIgnore(src_path)) {
        console.error(`${src_path} is ignore!`);
        return;
    }

    const dist_dir = path.resolve(path.dirname(dist_path));
    const is_exists = await exists(src_path);
    if (!is_exists) {
        console.error(`${src_path} doesn't exist`);
        return;
    }
    await mk(dist_dir);

    await new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(src_path);
        const writeStream = fs.createWriteStream(dist_path);

        readStream.pipe(writeStream);
        readStream.on('error', err => {
            reject(err);
        });
        readStream.on('end', () => {
            writeStream.close();
            resolve();
        });
    });
}
