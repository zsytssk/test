import { exists, lstat } from './asyncUtil';
import { cpDir } from './cpDir';
import { cpFile } from './cpFile';
import { mk } from './mk';
import { rm } from './rm';

export async function cp(src_path: string, dist_path: string, progress_fun?) {
    if (!(await exists(src_path))) {
        return;
    }
    const stat = await lstat(src_path);
    if (stat.isFile()) {
        return await cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        return await cpDir(src_path, dist_path, progress_fun);
    }
}

export async function mv(src_path: string, dist_path: string) {
    if (!(await exists(src_path))) {
        return;
    }
    if (!(await exists(dist_path))) {
        await mk(dist_path);
    }
    const stat = await lstat(src_path);
    let file_num = 1;
    if (stat.isFile()) {
        await cpFile(src_path, dist_path);
    } else if (stat.isDirectory()) {
        file_num = await cpDir(src_path, dist_path);
    }
    await rm(src_path);
    return file_num;
}
