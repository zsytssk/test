const {
    Map,
    List,
    Seq,
    fromJS,
} = require('immutable');

var map1 = fromJS({
    name: 'Howard',
    birthday: {
        year: 1988,
        month: 3,
        day: 28
    },
});
var map2 = map1.setIn(['birthday', 'year'], 2015);
debugger;