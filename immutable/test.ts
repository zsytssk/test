import {
    Map,
    List,
    Stack,
    fromJS,
    is
} from "immutable";

let a = fromJS({
    b: {
        c: {
            x: 100
        }
    }
});

let y = fromJS({
    x: 10
})

console.log(a.updateIn(['b', 'c'], bc => bc.mergeWith(
    (old_val, new_val) => old_val > new_val ? old_val : new_val,
    y
)));