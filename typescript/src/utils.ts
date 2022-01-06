import * as ts from 'typescript';

let fileStatements: ts.NodeArray<ts.Node>;

export function setFileStatements(statements: ts.NodeArray<ts.Node>) {
    fileStatements = statements;
}

type NameMap = string | string[];
// [lang, En]
export function findTargetNode(
    name: NameMap[],
    statements: ts.NodeArray<ts.Node>,
    matchValue = false,
) {
    const [first, ...rest] = [...name];
    let node = findMatchNode(first, statements, true);
    if (!first || !node) {
        return null;
    }

    if (!rest.length) {
        return node;
    }

    node = findNodeValueNode(node);
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
    matchValue = false,
): ts.Node | null {
    const matchFn = matchValue ? matchNodeValue : matchNodeName;
    for (const item of statements) {
        if (ts.SyntaxKind[item.kind] === 'FirstStatement') {
            const findItem = findMatchNode(
                name,
                (item as any).declarationList.declarations,
            );
            if (findItem) {
                return findItem;
            }
        } else if (ts.isImportDeclaration(item)) {
            if (matchFn(item.importClause, name as any)) {
                return item;
            }
            if (matchFn(item.importClause?.namedBindings, name as any)) {
                return item;
            }

            const elements =
                (item.importClause?.namedBindings as any)?.elements || [];
            for (const element of elements) {
                if (matchFn(element, name as any)) {
                    return item;
                }
            }
        } else {
            if (matchFn(item, name as any)) {
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

export function matchNodeValue(node: ts.Node, name: string): boolean {
    const node_name = getNodeName(node);
    if (!node_name) {
        return false;
    }
    if (typeof node_name === 'string') {
        return name === node_name;
    }
    const node_value = findTargetNode(node_name, fileStatements);
    return name === findNodeValue(node_value);
}

export function getNodeName(node: ts.Node): void | string | string[] {
    const name = (node as any).name;

    if (!name) {
        return name;
    }
    if (ts.isIdentifier(name)) {
        return name.escapedText;
    } else if (ts.isComputedPropertyName(name)) {
        const txt = getComputedPropertyName(name.expression);

        const node = findTargetNode(txt, fileStatements);
        // console.log(`test:>2`, txt, findNodeValue(node));

        return txt;
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

export function findNodeValueNode(node: ts.Node) {
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

export function findNodeValue(node: ts.Node) {
    const valueNode = findNodeValueNode(node);

    if (!valueNode) {
        return undefined;
    }

    return (valueNode as any).text;
}
