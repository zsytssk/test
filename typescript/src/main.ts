import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';

async function main() {
    const file_path = path.resolve(__dirname, './test/test2.ts');
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    const item = ast.program.body[2].body.body[1].argument;
    console.log(recast.print(item).code);
    console.log(item);
    console.log('end');
}

main();
