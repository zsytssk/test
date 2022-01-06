import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';
import { write } from './script/ls/write';

type Range = [number, number];
const key_map = ['test', 'arenaHelpRule11'];
const value = 'hello world';
async function main() {
    const file_path = path.normalize(path.resolve(__dirname, './test.ts'));
    console.log(file_path);
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    const item = ast.program.body[1];
    const node = item.declarations[0].init;

    const range: Range = [node.start, node.end];
    const source2 = replaceRange(source, range, `'${value}'`);
    console.log(item);
    await write(file_path, source2);
}

function replaceRange(source: string, range: Range, content: string) {
    return (
        source.slice(0, range[0]) +
        content +
        source.slice(range[1], source.length)
    );
}

main();
