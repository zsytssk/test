var importObject = {
    imports: {
        imported_func: function (arg) {
            console.log(arg);
        }
    }
};

onmessage = function (e) {
    console.log('module received from main thread');
    var mod = e.data;

    WebAssembly.instantiate(mod, importObject).then(function (instance) {
        console.log(instance.exports.sum())
    });
};