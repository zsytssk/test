import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';

async function main() {
    const file_path = path.resolve(__dirname, './test/test1.ts');
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    const item = ast.program.body;
    // var a = eval(`${recast.print(item).code}`);
    console.log(recast.print(item).code);
}

main();
