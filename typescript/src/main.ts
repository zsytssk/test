var C = function (p) {
    this.p = p;
};
C.prototype = {
    m() {
        console.log(this.p);
    }
};
C.prototype.q = function (r) {
    return this.p === r;
};

let a = new C(1);
a.q();