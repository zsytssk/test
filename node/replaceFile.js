const path = require("path");
const fs = require("fs");

function replaceFile(file, regexp, replace_str) {
  return new Promise((resolve, reject) => {
    file = path.resolve(file);

    fs.readFile(file, "utf8", (err, data) => {
      if (err) throw err;

      let matches = findMatches(data, regexp);
      let result_data = replace(data, matches, replace_str);
      if (!result_data) {
        resolve();
        return;
      }

      fs.writeFile(file, result_data, err => {
        if (err) throw err;
        resolve();
      });
    });
  });
}

function findMatches(data, regexp) {
  const regexp_g = new RegExp(regexp, "g");
  let matchs = data.match(regexp_g);

  let match_mall = [];
  if (!matchs) {
    return;
  }

  for (let match of matchs) {
    let begin_pos = match_mall.length
      ? match_mall[match_mall.length - 1].index + match.length
      : 0;
    let test_str = data.slice(begin_pos);
    let match_r = test_str.match(regexp);
    match_r.index = begin_pos + match_r.index;
    match_r.input = data;
    match_mall.push(match_r);
  }
  return match_mall;
}

function replace(data, matches, replace_str) {
  let result_data = data;
  for (let len = matches.length, i = len - 1; i >= 0; i--) {
    let match = matches[i];
    let replace_str_r = getReplaceStr(replace_str, match);

    let result_arr;
    if (i == len - 1) {
      result_arr = [
        result_data.slice(0, match.index),
        result_data.slice(match.index)
      ];
    } else {
      result_arr = [
        result_data.slice(0, match.index),
        result_data.slice(match.index, matches[i + 1].index),
        result_data.slice(matches[i + 1].index)
      ];
    }
    result_arr[1] = result_arr[1].replace(match[0], replace_str_r);

    result_data = result_arr.join("");
  }

  return result_data;
}

function getReplaceStr(replace_str, match) {
  let replace_matches = findMatches(replace_str, /\$(\d)/);
  for (let len = replace_matches.length, i = len - 1; i >= 0; i--) {
    let replace_match = replace_matches[i];
    let result_arr;
    if (i == len - 1) {
      result_arr = [
        replace_str.slice(0, replace_match.index),
        replace_str.slice(replace_match.index)
      ];
    } else {
      result_arr = [
        replace_str.slice(0, replace_match.index),
        replace_str.slice(replace_match.index, replace_matches[i + 1].index),
        replace_str.slice(replace_matches[i + 1].index)
      ];
    }
    let index = replace_match[1];
    if (!index || !match[index]) {
      result_arr[1] = result_arr[1].replace(replace_match[0], "");
    } else {
      result_arr[1] = result_arr[1].replace(replace_match[0], match[index]);
    }

    replace_str = result_arr.join("");
  }

  return replace_str;
}

replaceFile("./test.txt", /(function)/, "$1");
