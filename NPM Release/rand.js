"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rand = void 0;
function rand(minimum, maximum) { return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; }
exports.rand = rand;
