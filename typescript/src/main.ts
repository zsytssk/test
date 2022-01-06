import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';

const key_map = ['test', 'Num'];
async function main() {
    const file_path = path.normalize(path.resolve(__dirname, './test.ts'));
    console.log(file_path);
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    const item = ast.program.body[1];
    // var a = eval(`${recast.print(item).code}`);

    console.log(recast.print(item).code);
}

main();
