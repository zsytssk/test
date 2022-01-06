import * as path from 'path';
import * as ts from 'typescript';
import { readFile } from './script/ls/asyncUtil';
import { write } from './script/ls/write';
import { FileNode } from './fileNode';

type Range = [number, number];
const key_map = ['test', 'arenaHelpRule11'];
const value = 'hello world';
async function main() {
    const file_path = path.normalize(path.resolve(__dirname, './test.ts'));
    console.time(`test:>`);

    const source = new FileNode(file_path);

    const find_node = await source.findTargetNode([
        'International',
        'zh',
        '101',
    ]);
    console.log(find_node);

    console.timeEnd(`test:>`);
    // const range: Range = [target_node.pos, target_node.end];
    // console.log(source.slice(...range));
    // const new_source = replaceRange(source, range, ` '${value}'`);
    // await write(file_path, new_source);
}

main();
