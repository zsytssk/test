import {
    Map,
    List,
    Stack,
    fromJS,
    is
} from "immutable";

import {
    ReduxConnectManager,
    ConnectStoreChangeInfo
} from './reduxManager';


let redux_manager = new ReduxConnectManager();
redux_manager.init();

redux_manager.add({
    path: '1.res.rInfo.roomId',
    listener: (change_info: ConnectStoreChangeInfo) => {
        console.log(change_info);
    }
});
redux_manager.add({
    path: '1.res.rInfo',
    listener: (change_info: ConnectStoreChangeInfo) => {
        console.log(change_info);
    }
});
redux_manager.add({
    path: '1.res.rInfo.currentNum',
    listener: (change_info: ConnectStoreChangeInfo) => {
        console.log(change_info);
    }
});

import { compareObj } from './compare';
import * as state1 from './data1.json';
import * as state2 from './data2.json';

const a = fromJS(state1);
const b = fromJS(state2);

let change = compareObj(a, b);


// let count = 2;
// console.time(`compare ${count} time`);
// for (let i = 0; i < count; i++) {
//     if (i == 0) {
//         console.log(compareObj(a, b));
//         continue;
//     }
//     compareObj(a, b);
// }
// console.timeEnd(`compare ${count} time`);