import * as path from 'path';
import { FileNode } from './fileNode';

const key_map = ['International', 'zh', '101'];
const value = 'hello world';
async function main() {
    const file_path = path.normalize(path.resolve(__dirname, './test.ts'));
    console.time(`test:>`);

    const source = new FileNode(file_path);

    const find_node = await source.findTargetNode(key_map);
    console.log(find_node);

    console.timeEnd(`test:>`);
}

main();
