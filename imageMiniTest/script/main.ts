import * as fs from 'fs';
import * as imagemin from 'imagemin';
import * as imageminMozJpeg from 'imagemin-mozjpeg';
import * as imageminPngquant from 'imagemin-pngquant';
import * as path from 'path';
import { lstat } from './ls/asyncUtil';
import { walk } from './ls/walk';
import { write } from './ls/write';

(async () => {
    const files = await getAllFiles();
    const all_num = files.length;
    let num = 0;
    for (const file of files) {
        const { size } = await lstat(file);
        const compress_data = await imagemin([file], undefined, {
            plugins: [
                imageminMozJpeg(),
                imageminPngquant({ quality: '65-80' }),
            ],
        });
        const { data } = compress_data[0];
        const size_percent = calcPercent(data.toString().length, size * 0.96);

        /** 比原始更大不作处理 */
        if (size_percent >= 100) {
            continue;
        }
        await write(file, data);
        console.log(
            `${num++}/${all_num}:>`,
            file,
            `${size}|${data.toString().length}|${size_percent + '%'}`,
        );
    }
})();

async function getAllFiles() {
    const root_path = path.resolve('D:\\zsytssk\\job\\git\\deepsea\\frontend');
    // const root_path = path.resolve(__dirname, '../');
    const gamehall = fs
        .readFileSync(root_path + '/publish/gamehall')
        .toString();
    const res = path.resolve(gamehall, 'www\\files\\game\\deepseaglory\\res');
    const assets = path.resolve(
        gamehall,
        'www\\files\\game\\deepseaglory\\assets',
    );
    const wait_res = walk(res);
    const wait_assets = walk(assets);
    const files = await Promise.all([wait_res, wait_assets]).then(vals => {
        return vals[0].concat(vals[1]);
    });
    for (let len = files.length, i = len - 1; i >= 0; i--) {
        const ext = path.extname(files[i]);
        if (ext !== '.png' && ext !== '.jpg') {
            files.splice(i, 1);
        }
    }
    return files;

    /* @test */
    // return [
    //     `D:/zsytssk/job/git/gamehall/www/files/game/deepseaglory/res/settle/word_win.png`,
    // ];
}

function calcPercent(new_val, ori_val) {
    return Math.floor((new_val / ori_val) * 100);
}
