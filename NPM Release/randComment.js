"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randComment = void 0;
const rand_1 = require("./rand");
function randComment() {
    const comments = [
        'sus',
        'amogus',
        'gay popbob sex dupe',
        'ඞ sus ඞ',
        'ඞsusඞ',
        '𓆏ඞ𓆏ඞ𓆏'
    ];
    const str = comments[rand_1.rand(0, (comments.length - 1))];
    const s = [
        (rand_1.rand(0, 2) % 2 === 0) ? ' ' : '',
        (rand_1.rand(0, 2) % 2 === 0) ? ' ' : ''
    ];
    return `/*${s[0]}${str}${s[1]}*/`;
}
exports.randComment = randComment;
