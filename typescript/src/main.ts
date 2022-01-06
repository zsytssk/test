import * as path from 'path';
import * as ts from 'typescript';
import { readFile } from './script/ls/asyncUtil';
import { write } from './script/ls/write';
import { findTargetNode } from './utils';

type Range = [number, number];
const key_map = ['test', 'arenaHelpRule11'];
const value = 'hello world';
async function main() {
    const file_path = path.normalize(path.resolve(__dirname, './test.ts'));
    const source = await readFile(file_path);
    const node = ts.createSourceFile(
        'x.ts', // fileName
        source, // sourceText
        ts.ScriptTarget.Latest,
    );

    const props = (node.statements[3] as any).declarationList.declarations[0]
        .initializer.properties;

    console.log(
        findTargetNode(
            ['International', ['Lang', 'En'], 'arenaHelpRule11'],
            node.statements,
        ),
    );
    // for (const item of node.statements) {
    //     console.log(ts.SyntaxKind[(item as any).kind], item as any);
    // }
    // let target_node;
    // for (const node of props) {
    //     console.log(getPropName(node.name));
    // }
    // const range: Range = [target_node.pos, target_node.end];
    // console.log(source.slice(...range));
    // const new_source = replaceRange(source, range, ` '${value}'`);
    // await write(file_path, new_source);
}
function replaceRange(source: string, range: Range, content: string) {
    return (
        source.slice(0, range[0]) +
        content +
        source.slice(range[1], source.length)
    );
}

main();
