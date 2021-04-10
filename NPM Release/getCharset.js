"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCharset = void 0;
function getCharset(useFrog) {
    if (useFrog) {
        return '\u{1318F}řඞŘ';
    }
    else
        return 'řඞŘ';
}
exports.getCharset = getCharset;
