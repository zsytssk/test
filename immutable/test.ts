import {
    Map,
    List,
    Stack,
    fromJS,
    is
} from "immutable";

let a = Map({
    x: 1, y: 2
});

for (let i in a.keys()) {
    console.log(i);
}