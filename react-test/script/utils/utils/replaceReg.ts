export type ReplaceFun = (match: RegExpExecArray) => string;

export function replaceReg(
    str: string,
    reg: RegExp,
    replace_str: string | ReplaceFun,
) {
    const matches = findMatches(str, reg);
    let result_data = str;
    for (let len = matches.length, i = len - 1; i >= 0; i--) {
        const match = matches[i];

        let rep_str_r;
        if (typeof replace_str === 'string') {
            rep_str_r = getReplaceStr(replace_str, match);
        } else {
            rep_str_r = replace_str(match);
        }

        let result_arr;
        if (i === len - 1) {
            result_arr = [
                result_data.slice(0, match.index),
                result_data.slice(match.index),
            ];
        } else {
            result_arr = [
                result_data.slice(0, match.index),
                result_data.slice(match.index, matches[i + 1].index),
                result_data.slice(matches[i + 1].index),
            ];
        }
        result_arr[1] = result_arr[1].replace(match[0], rep_str_r);

        result_data = result_arr.join('');
    }

    return result_data;
}

function findMatches(str: string, reg: RegExp) {
    const matches = [] as RegExpExecArray[];

    let m: RegExpExecArray;
    // tslint:disable-next-line:no-conditional-assignment
    while ((m = reg.exec(str))) {
        matches.push(m);
    }
    return matches;
}

function getReplaceStr(rep_str: string, match: RegExpExecArray) {
    /** 找到特殊匹配部分 */
    const rep_matches = findMatches(rep_str, /\$(\d)/g);
    if (!rep_matches) {
        return rep_str;
    }
    for (let len = rep_matches.length, i = len - 1; i >= 0; i--) {
        const replace_match = rep_matches[i];
        let result_arr;
        if (i === len - 1) {
            result_arr = [
                rep_str.slice(0, replace_match.index),
                rep_str.slice(replace_match.index),
            ];
        } else {
            result_arr = [
                rep_str.slice(0, replace_match.index),
                rep_str.slice(replace_match.index, rep_matches[i + 1].index),
                rep_str.slice(rep_matches[i + 1].index),
            ];
        }

        const index = replace_match[1];
        if (!index || !match[index]) {
            result_arr[1] = result_arr[1].replace(replace_match[0], '');
        } else {
            result_arr[1] = result_arr[1].replace(
                replace_match[0],
                match[index],
            );
        }

        rep_str = result_arr.join('');
    }

    return rep_str;
}
