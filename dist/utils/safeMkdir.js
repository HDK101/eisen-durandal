"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
async function safeMkdir(folder, options) {
    try {
        await (0, promises_1.mkdir)(folder, options);
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.default = safeMkdir;
