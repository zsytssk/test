import { genAssets } from './genAssetsMap';
import { genMd5, getLsFilesMap } from './utils';

export async function main() {
    const data = await getLsFilesMap();
    const ui_list = [] as LsFiles;
    const js_list = [] as LsFiles;
    const assets_list = [] as LsFiles;

    for (const item of data) {
        const { type } = item;
        if (type === 'assets') {
            assets_list.push(item);
        }
        if (type === 'js') {
            js_list.push(item);
        }
        if (type === 'ui') {
            ui_list.push(item);
        }
    }

    let all_ui_commit = '';
    for (const item of ui_list) {
        all_ui_commit += item.commit;
    }
    const ui_md5 = genMd5(all_ui_commit);
    const assets_version = await genAssets(assets_list);

    return assets_version;
}

main();
