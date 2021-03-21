import * as recast from 'recast';
import * as path from 'path';
import * as tsParser from 'recast/parsers/typescript';
import { readFile } from './script/ls/asyncUtil';

async function main() {
    const file_path = path.resolve(__dirname, './test/test2.ts');
    const source = await readFile(file_path);
    const ast = recast.parse(source, { parser: tsParser });
    const item = ast.program.body[0].declaration;
    var a = eval(`JSON.stringify(${recast.print(item).code})`);
    const oriObj = JSON.parse(a);
    // console.log(JSON.parse(recast.print(item).code));
    // console.log(recast.print(item).code);
    const result = findKeys(oriObj);
    console.log(result);
}

main();

function findKeys(oriObj: any, prefix = '', newObj = {}) {
    for (const key of Object.keys(oriObj)) {
        const value = oriObj[key];
        if (typeof value === 'string') {
            newObj[prefix + key] = value;
        } else {
            findKeys(value, `${prefix}${key}_`, newObj);
        }
    }

    return newObj;
}
