import * as ts from 'typescript';
import * as path from 'path';
import { exists, readFile } from './script/ls/asyncUtil';

type NameMap = string;
export class FileNode {
    private rel_map: Map<string, FileNode> = new Map();
    private source_file: ts.SourceFile;
    constructor(private file_path: string) {}
    public async findTargetNode(name_path: NameMap[]) {
        if (!this.source_file) {
            const source = await readFile(this.file_path);
            this.source_file = ts.createSourceFile(
                'x.ts', // fileName
                source, // sourceText
                ts.ScriptTarget.Latest,
            );
        }

        return this.innerFindTargetNode(name_path, this.source_file.statements);
    }
    private async innerFindTargetNode(
        name_path: NameMap[],
        statements: ts.NodeArray<ts.Node>,
    ) {
        const [first, ...rest] = [...name_path];
        let node = await this.findMatchNode(first, statements);

        if (!first || !node) {
            return null;
        }

        if (!rest.length) {
            return node;
        }

        node = this.findNodeValueNode(node);

        if (ts.isEnumDeclaration(node)) {
            return this.innerFindTargetNode(rest, node.members);
        }
        if (ts.isObjectLiteralExpression(node)) {
            return this.innerFindTargetNode(rest, node.properties);
        }
        if (ts.isImportDeclaration(node)) {
            let file_path = (node.moduleSpecifier as any).text;
            const dir_name = path.dirname(this.file_path);
            file_path = path.resolve(dir_name, file_path + '.ts');
            if (!exists(file_path)) {
                return;
            }
            let target_file_node = this.rel_map.get(file_path);
            if (!target_file_node) {
                target_file_node = new FileNode(file_path);
                this.rel_map.set(file_path, target_file_node);
            }
            const val = await target_file_node.findTargetNode(name_path);
            console.log(`test:>`, name_path, val);
            return val;
        }
    }
    private async findMatchNode(
        name: NameMap,
        statements: ts.NodeArray<ts.Node>,
    ): Promise<ts.Node | null> {
        for (const item of statements) {
            if (ts.SyntaxKind[item.kind] === 'FirstStatement') {
                const findItem = await this.findMatchNode(
                    name,
                    (item as any).declarationList.declarations,
                );
                if (findItem) {
                    return findItem;
                }
            } else if (ts.isImportDeclaration(item)) {
                if (await this.matchNodeValue(item.importClause, name as any)) {
                    return item;
                }
                if (
                    await this.matchNodeValue(
                        item.importClause?.namedBindings,
                        name as any,
                    )
                ) {
                    return item;
                }

                const elements =
                    (item.importClause?.namedBindings as any)?.elements || [];
                for (const element of elements) {
                    if (await this.matchNodeValue(element, name as any)) {
                        return item;
                    }
                }
            } else {
                if (await this.matchNodeValue(item, name as any)) {
                    return item;
                }
            }
        }

        return null;
    }

    private async matchNodeName(
        node: ts.Node,
        name: string | string[],
    ): Promise<boolean> {
        const node_name = this.getNodeName(node);
        if (!node_name) {
            return false;
        }
        if (typeof name === 'string' || typeof node_name === 'string') {
            return name === node_name;
        }

        if (name.length !== node_name.length) {
            return false;
        }
        const filer = node_name.filter((item, index) => name[index] !== item);
        return Boolean(!filer.length);
    }

    private async matchNodeValue(
        node: ts.Node,
        name: string,
    ): Promise<boolean> {
        const node_name = this.getNodeName(node);

        if (!node_name) {
            return false;
        }
        if (typeof node_name === 'string') {
            return name === node_name;
        }

        const node_value = await this.innerFindTargetNode(
            node_name,
            this.source_file.statements,
        );

        return name === this.findNodeValue(node_value);
    }

    private getNodeName(node: ts.Node): void | string | string[] {
        const name = (node as any).name;

        if (!name) {
            return name;
        }
        if (ts.isIdentifier(name)) {
            return name.escapedText;
        } else if (ts.isComputedPropertyName(name)) {
            const txt = this.getComputedPropertyName(name.expression);
            return txt;
        }
        return (name as any).escapedText;
    }

    private getComputedPropertyName(node: ts.Node): string[] {
        if ((node as any).escapedText) {
            return [(node as any).escapedText];
        }
        return [
            ...this.getComputedPropertyName((node as any).expression),
            (node as any).name.escapedText,
        ];
    }

    private findNodeValueNode(node: ts.Node) {
        if (!node) {
            return;
        }

        if (ts.isEnumMember(node)) {
            return node.initializer;
        }
        if (ts.isVariableDeclaration(node)) {
            return node.initializer;
        }
        if (ts.isPropertyAssignment(node)) {
            return node.initializer;
        }

        return node;
    }

    private findNodeValue(node: ts.Node) {
        const valueNode = this.findNodeValueNode(node);

        if (!valueNode) {
            return undefined;
        }

        return (valueNode as any).text;
    }
}
