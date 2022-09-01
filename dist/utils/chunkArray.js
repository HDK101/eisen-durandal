"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunkArray(array, size) {
    const groups = [];
    for (let i = 0; i < array.length; i += size) {
        groups.push(array.slice(i, i + size));
    }
    return groups;
}
exports.default = chunkArray;
