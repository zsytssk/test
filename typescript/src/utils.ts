export function replaceRange(source: string, range: Range, content: string) {
    return (
        source.slice(0, range[0]) +
        content +
        source.slice(range[1], source.length)
    );
}
