import * as crypto from 'crypto';
import * as path from 'path';
import { exists } from '../ls/asyncUtil';
import { execArr } from '../utils/exec';
import { CONFIG } from './config';
import { ErrorInfo } from './error';

export async function getLsFilesMap() {
    const { folder } = CONFIG;
    const data = (await execArr('git ls-tree -r --abbrev head', {
        path: folder,
    })) as string;
    const list = data.split('\n');
    const result = [] as LsFiles;

    for (const item of list) {
        const [info, ori_file] = item.split(/\t+/);
        const [, , commit] = info.split(/\s+/);
        if (!ori_file) {
            continue;
        }
        const type = getFileType(ori_file);
        if (!type) {
            continue;
        }
        const file = path.resolve(CONFIG.folder, ori_file);
        result.push({
            commit,
            file,
            type,
        });
    }

    return result;
}

export function getFileType(file): FileType {
    const ext = path.extname(file);
    if (ext === '.js') {
        if (/(sail|src)/.test(file)) {
            return 'js';
        }
    } else if (file.indexOf('laya/pages') !== -1) {
        return 'ui';
    } else if (file.indexOf('laya/assets') !== -1) {
        return 'assets';
    }
    return;
}

export async function getAssetsFileInfo(
    file: string,
): Promise<BinFileInfo | ErrorInfo> {
    const assets_folder = path.resolve(CONFIG.folder, CONFIG.assets);
    const bin_folder = path.resolve(CONFIG.folder, CONFIG.bin);
    const bin_file_path = file.replace(assets_folder, bin_folder);
    if (await exists(bin_file_path)) {
        return {
            is_assets: false,
            file,
        };
    }

    const dirname = path.dirname(file);
    const bin_dirname = dirname.replace(assets_folder, bin_folder);
    const bin_json_path = `${bin_dirname}.json`;
    const bin_png_path = `${bin_dirname}.png`;

    if (await exists(bin_json_path)) {
        const assets_files = await analysisAssetsFile(bin_json_path);
        return {
            is_assets: true,
            file: [bin_json_path, bin_png_path],
            assets: assets_files,
        };
    }
    return new ErrorInfo(1, file);
}

export async function analysisAssetsFile(assets_file): Promise<string[]> {
    const result = [];
    const { frames } = await import(assets_file);

    const bin_folder = path.resolve(CONFIG.folder, `${CONFIG.bin}`);
    const assets_folder = path.resolve(CONFIG.folder, `laya/assets`);

    const file_name = path
        .basename(assets_file)
        .replace(path.extname(assets_file), '');

    const dirname = path.resolve(
        path.dirname(assets_file),
        path.basename(file_name),
    );

    const raw_path = path.normalize(dirname).replace(bin_folder, assets_folder);

    for (const frame in frames) {
        if (!frames.hasOwnProperty(frame)) {
            continue;
        }
        const raw_file = path.resolve(raw_path, frame);
        if (await exists(raw_file)) {
            result.push(raw_file);
        }
    }

    return result;
}

export function genMd5(str: string): string {
    return crypto
        .createHash('md5')
        .update(str)
        .digest('hex');
}

export function shortFile(file: string): string {
    const assets_folder = path.resolve(CONFIG.folder, CONFIG.assets);
    const bin_folder = path.resolve(CONFIG.folder, CONFIG.bin);

    if (file.indexOf(assets_folder) === 0) {
        file = path.relative(assets_folder, file);
    } else {
        file = path.relative(bin_folder, file);
    }

    file = path.normalize(file);
    file = file.replace(/\\/g, '/');
    return file;
}
export function shortCommit(commit: string): string {
    return commit.substr(0, 8);
}
