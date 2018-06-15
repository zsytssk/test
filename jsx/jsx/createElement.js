"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const $el = document.createElement(node.type);
    node.children.map(createElement).forEach($el.appendChild.bind($el));
    return $el;
}
exports.createElement = createElement;
