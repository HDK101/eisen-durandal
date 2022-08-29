"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
async function safeRm(folder) {
    try {
        await (0, promises_1.rm)(folder, {
            recursive: true,
        });
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.default = safeRm;
