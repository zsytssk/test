import * as ts from 'typescript';

export function replaceRange(source: string, range: Range, content: string) {
    return (
        source.slice(0, range[0]) +
        content +
        source.slice(range[1], source.length)
    );
}

export function findNodeValue(node: ts.Node) {
    const valueNode = findValueNode(node);

    if (!valueNode) {
        return undefined;
    }

    return (valueNode as any).text;
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

export function findValueNode(node: ts.Node) {
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
