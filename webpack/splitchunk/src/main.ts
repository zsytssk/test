import(/* webpackPreload: true */ /* webpackChunkName: "test" */ "lodash");

import isArray from "lodash/isArray";
import { createStore } from "redux";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/from";

function test() {
  console.log(isArray);
  let a = [1, 2, 3, 4, 5];
  if (isArray(a)) {
    console.log(a.length);
  }
  let ob = Observable.from(a);
  ob.subscribe(value => console.log(value));

  let store = createStore(reducer);
  const state = store.getState();
}
function reducer() {}

test();

document.getElementsByTagName("button")[0].addEventListener("click", () => {
  console.time(`load`);
  import("lodash").then(test => {
    console.log(test);
    console.timeEnd(`load`);
  });
});
