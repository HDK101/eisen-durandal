"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generator_1 = require("../generator");
const safeMkdir_1 = __importDefault(require("../utils/safeMkdir"));
const safeRm_1 = __importDefault(require("../utils/safeRm"));
const config_1 = __importDefault(require("../config"));
async function start() {
    await (0, safeRm_1.default)('dependencies');
    await (0, safeMkdir_1.default)('dependencies');
    const config = await (0, config_1.default)();
    if (!(config === null || config === void 0 ? void 0 : config.paths)) {
        console.error('Config field "paths" is empty.');
        return;
    }
    await Promise.all(config.paths.map(async (path) => {
        await (0, generator_1.processFolder)(path);
    }));
    console.log('Graphs generated.');
}
start();
