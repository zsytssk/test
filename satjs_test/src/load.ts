const res_temp = {};

export type ResType = 'Image';
export type ResArr = {
  url: string;
  type: ResType;
}[];

export function loadRes(
  res_arr: ResArr,
  load_fun?: Function,
  loading_fun?: Function,
) {
  const sum_num = res_arr.length;
  let loaded_num = 0;
  for (let res_item of res_arr) {
    const { type, url } = res_item;
    if (type == 'Image') {
      loadImg(url).then(data => {
        res_temp[url] = data;
        loadedItem();
      });
    }
  }
  function loadedItem() {
    loaded_num++;
    if (loaded_num != sum_num) {
      if (typeof loading_fun == 'function') {
        loading_fun(loaded_num / sum_num);
      }
    }
    if (typeof load_fun == 'function') {
      load_fun();
    }
  }
}
export function getRes(url) {
  return res_temp[url];
}

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const imageObj = new Image();
    imageObj.onload = function() {
      return resolve(imageObj);
    };
    imageObj.src = url;
  });
}
