import { exists, lstat, readdir, rmdir, unlink } from './asyncUtil';

export async function rm(path) {
    if (!(await exists(path))) {
        return;
    }
    const info = await lstat(path);
    if (info.isFile()) {
        await unlink(path);
        return;
    }
    const files = await readdir(path);
    for (const file of files) {
        const curPath = path + '/' + file;
        const cur_lstat = await lstat(curPath);
        if (cur_lstat.isDirectory()) {
            await rm(curPath);
        } else {
            await unlink(curPath);
        }
    }
    await rmdir(path);
}
