import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';

async function main() {
    const file_path = path.resolve(__dirname, './test/test2.ts');
    console.log(file_path);
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    console.log(ast);

    console.log(recast.print(ast).code);
}

main();
