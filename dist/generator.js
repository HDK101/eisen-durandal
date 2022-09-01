"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processFolder = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const madge_1 = __importDefault(require("madge"));
const config_1 = __importDefault(require("./config"));
const safeMkdir_1 = __importDefault(require("./utils/safeMkdir"));
const chunkArray_1 = __importDefault(require("./utils/chunkArray"));
async function generateSVG(file) {
    const config = await (0, config_1.default)();
    const res = config.madge ? await (0, madge_1.default)(file, config.madge) : await (0, madge_1.default)(file);
    const buffer = await res.svg();
    return (buffer === null || buffer === void 0 ? void 0 : buffer.toString('utf-8')) || '';
}
async function processFile(file, dest, relativeFolder) {
    const svgContent = await generateSVG(`${dest}/${file}`);
    if (!svgContent) {
        console.error(`Could not generate SVG for file: ${file} in folder ${relativeFolder}`);
        return;
    }
    await (0, promises_1.writeFile)(`dependencies/${relativeFolder}/${file}.svg`, svgContent);
    console.log(`"${file}" generated`);
}
async function processFolder(dest) {
    const files = await (0, promises_1.readdir)(dest);
    const relativeFolder = (0, path_1.relative)((0, path_1.resolve)(), dest);
    await (0, safeMkdir_1.default)(`dependencies/${relativeFolder}`, { recursive: true });
    const fileGroups = (0, chunkArray_1.default)(files, 10);
    for (const fileGroup of fileGroups) {
        await Promise.all(fileGroup.map(async (file) => processFile(file, dest, relativeFolder)));
    }
}
exports.processFolder = processFolder;
