import {
    Map,
    List,
    Stack,
    fromJS,
    is
} from "immutable";

import {
    ReduxConnectManager,
    ChangeInfo
} from './reduxManager';

let redux_manager = new ReduxConnectManager();
redux_manager.init();

redux_manager.add({
    path: '1.res.rInfo.roomId',
    listener: (change_info: ChangeInfo) => {
        console.log(change_info);
    }
});
redux_manager.add({
    path: '1.res.rInfo',
    listener: (change_info: ChangeInfo) => {
        console.log(change_info);
    }
});
redux_manager.add({
    path: '1.res.rInfo.currentNum',
    listener: (change_info: ChangeInfo) => {
        console.log(change_info);
    }
});
redux_manager.add({
    path: '1.res.list.3003',
    listener: (change_info: ChangeInfo) => {
        console.log(change_info);
    }
});

import { compareObj } from './compare';
import * as state1 from './data1.json';
import * as state2 from './data2.json';

const a = fromJS(state1);
const b = fromJS(state2);

redux_manager.onStateChange(a, b);

// let count = 10;
// console.time(`compare ${count} time`);
// for (let i = 0; i < count; i++) {
//     a.equals(b);
// }
// console.timeEnd(`compare ${count} time`);

// let count = 1;
// console.time(`compare total ${count} time`);
// for (let i = 0; i < count; i++) {
//     compareObj(a, b);
// }
// console.timeEnd(`compare total ${count} time`);