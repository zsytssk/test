let IGNORES: string[];
export function setIgnore(ignore: string[]) {
    IGNORES = ignore;
}

export function isIgnore(src_path) {
    if (!IGNORES) {
        return false;
    }
    for (const ignore of IGNORES) {
        if (src_path === ignore) {
            return true;
        }
    }
    return false;
}
