"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fill = void 0;
function fill(sequence, amount) {
    var _s = '';
    for (let i = 0; i < amount; i++) {
        _s += sequence;
    }
    return _s;
}
exports.fill = fill;
