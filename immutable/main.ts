import {
    Map,
    List,
    Stack,
    fromJS,
    is
} from "immutable";

import { compareObj } from './compare';
import * as state1 from './data1.json';
import * as state2 from './data2.json';

const a = fromJS(state1);
const b = fromJS(state2);

let count = 2;
console.time(`compare ${count} time`);
for (let i = 0; i < count; i++) {
    if (i == 0) {
        console.log(compareObj(a, b));
        continue;
    }
    compareObj(a, b);
}
console.timeEnd(`compare ${count} time`);