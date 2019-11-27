/** 1
 * @param {string[]} strs
 * @return {string}
 * 最长公共前缀
 */
var longestCommonPrefix = function(strs: string[]) {
    let result = strs.pop();
    for (const item of strs) {
        for (let i = 0; i < result.length; i++) {
            const char = result[i];

            if (item.indexOf(char) === -1) {
                result = result.slice(0, i);
                break;
            }
        }
    }
    return result;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight']));

/** 2
 * @param {string} s
 * @return {number}
 * 无重复字符的最长子串
 */
var lengthOfLongestSubstring = function(s) {
    let num = 0;
    let cur_str = '';
    for (let char of s) {
        let index = cur_str.indexOf(char);
        if (index === -1) {
            cur_str += char;
        } else {
            if (cur_str.length > num) {
                num = cur_str.length;
            }
            cur_str = cur_str.slice(index + 1) + char;
        }
    }
    return num;
};

console.log(lengthOfLongestSubstring('pwwkew'));

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 *  字符串的排列
 */
var checkInclusion = function(s1, s2) {};
