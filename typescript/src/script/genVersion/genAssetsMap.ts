import { ErrorInfo } from './error';
import { genMd5, getAssetsFileInfo, shortFile, shortCommit } from './utils';

export async function genAssets(
    files: LsFiles,
): Promise<[AssetsInfo[], ErrorInfo[]]> {
    const result: AssetsInfo[] = [];
    const errors: ErrorInfo[] = [];
    for (const item of files) {
        if (!item || hasGeneratedTemp(item)) {
            continue;
        }
        const { file: raw_file, commit } = item;
        const file_info = await getAssetsFileInfo(raw_file);
        if (file_info instanceof ErrorInfo) {
            errors.push(file_info);
            continue;
        }
        const { is_assets, file, assets } = file_info;
        if (!is_assets && typeof file === 'string') {
            result.push({
                file: shortFile(file),
                commit: shortCommit(commit),
            });
            continue;
        }
        const [first] = file;
        /** 多次打包同一文件, 说明有文件没有发布 */
        if (hasGeneratedResult(first, result)) {
            errors.push(new ErrorInfo(2, raw_file));
            continue;
        }
        const md5 = shortCommit(genAssetsMd5(files, assets as string[]));
        for (const file_item of file) {
            result.push({
                file: shortFile(file_item),
                commit: md5,
            });
        }
    }
    /** 重置temp 防止多次执行函数结果不一样... */
    reset();
    return [result, errors];
}

let temp: string[] = [];
function genAssetsMd5(files: LsFiles, assets: string[]) {
    let str = '';
    for (const file of assets) {
        for (const item of files) {
            const { file: raw_file, commit } = item;
            if (raw_file === file) {
                str += commit;
                temp.push(raw_file);
                break;
            }
        }
    }
    return genMd5(str);
}

function hasGeneratedTemp(item: LsFile) {
    const { file } = item;
    if (temp.indexOf(file) !== -1) {
        return true;
    }
    return false;
}
function hasGeneratedResult(file: string, result: AssetsInfo[]) {
    let index = -1;
    index = result.findIndex(item => {
        if (item.file === file) {
            return true;
        }
    });
    return index !== -1;
}
function reset() {
    temp = [];
}
