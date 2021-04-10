"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcLength = void 0;
function calcLength(str) {
    const _str = str.split(/\u001B\[[0-9]{1,2}m/gm).join('');
    return _str.length;
}
exports.calcLength = calcLength;
