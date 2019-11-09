// Demo on how to use ES6 decorators
// HOW TO RUN
// $ yarn add --dev babel-plugin-transform-decorators-legacy
// $ babel-node --plugins transform-decorators-legacy test.js
"use strict";

@meta({
  manufacturer: "evolas"
})
class Data {
  @fluent
  set(key, value) {
    this[key] = value;
  }

  show() {
    console.log(JSON.stringify(this));
  }

  toJSON() {
    var tmp = {};

    for (var key in this) {
      if (typeof this[key] !== "function") tmp[key] = this[key];
    }

    return tmp;
  }
}

// target – The class that the decorator is used on.
// key – If using the decorator on a property, this is the name of the property.
// descriptor – Contains the properties value, enumerable, configurable, and writable for the property/function.
function fluent(target, name, descriptor) {
  const method = descriptor.value;

  descriptor.value = function(...args) {
    method.apply(this, args);
    return this;
  };
}

function meta(object) {
  return function(target) {
    Object.keys(object).forEach(key => (target.prototype[key] = object[key]));
  };
}

var c = new Data();
c.set("pre", 1).set("post", 3);
c.show();
