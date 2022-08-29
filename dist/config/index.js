"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
async function read() {
    const file = JSON.parse(await (0, promises_1.readFile)('.durandal.json', { encoding: 'utf8' }));
    return file;
}
exports.default = read;
