import * as ts from 'typescript';

type NameMap = string | string[];
// [lang, En]
export function findTargetNode(
    name: NameMap[],
    statements: ts.NodeArray<ts.Node>,
) {
    const [first, ...rest] = [...name];
    let node = findMatchNode(first, statements);
    if (!first || !node) {
        return null;
    }

    if (!rest.length) {
        return node;
    }

    node = findNodeValue(node);
    if (ts.isEnumDeclaration(node)) {
        return findTargetNode(rest, node.members);
    }
    if (ts.isObjectLiteralExpression(node)) {
        return findTargetNode(rest, node.properties);
    }
}

export function findMatchNode(
    name: string | string[],
    statements: ts.NodeArray<ts.Node>,
): ts.Node | null {
    for (const item of statements) {
        // console.log(
        //     `test:>1`,
        //     ts.SyntaxKind[item.kind],
        //     name,
        //     getNodeName(item),
        //     matchNodeName(item, name),
        // );
        if (ts.SyntaxKind[item.kind] === 'FirstStatement') {
            const findItem = findMatchNode(
                name,
                (item as any).declarationList.declarations,
            );
            if (findItem) {
                return findItem;
            }
        } else if (ts.isImportDeclaration(item)) {
            if (matchNodeName(item.importClause, name)) {
                return item;
            }
            if (matchNodeName(item.importClause?.namedBindings, name)) {
                return item;
            }

            const elements =
                (item.importClause?.namedBindings as any)?.elements || [];
            for (const element of elements) {
                if (matchNodeName(element, name)) {
                    return item;
                }
            }
        } else {
            if (matchNodeName(item, name)) {
                return item;
            }
        }
    }

    return null;
}

export function matchNodeName(node: ts.Node, name: string | string[]): boolean {
    const node_name = getNodeName(node);
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
export function getNodeName(node: ts.Node): void | string | string[] {
    const name = (node as any).name;

    if (!name) {
        return name;
    }
    if (ts.isIdentifier(name)) {
        return name.escapedText;
    } else if (ts.isComputedPropertyName(name)) {
        return getComputedPropertyName(name.expression);
    }
    return (name as any).escapedText;
}

export function getComputedPropertyName(node: ts.Node): string[] {
    if ((node as any).escapedText) {
        return [(node as any).escapedText];
    }
    return [
        ...getComputedPropertyName((node as any).expression),
        (node as any).name.escapedText,
    ];
}

export function findNodeValue(node: ts.Node) {
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
