"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkVersion = void 0;
const NpmApi = require("npm-api");
const chalk = require("chalk");
const defaults_1 = require("./defaults");
const fill_1 = require("./fill");
const calcLength_1 = require("./calcLength");
function printVersionInfo(version) {
    const string = chalk `There is an {red update} avalible
Version {yellow ${version[0]}} --> {bold.green ${version[1]}}

{magenta How to install:}
Simply run {inverse ${(process.platform === 'win32') ? '' : 'sudo '}npm install -g }{inverse.blue sus-obfuscator}`;
    var maxL = 0;
    string.split('\n').forEach((i) => { if (i.length > maxL)
        maxL = i.length; });
    maxL += 4;
    const top = `┏${fill_1.fill('━', maxL)}┓`;
    const bottom = `┗${fill_1.fill('━', maxL)}┛`;
    console.log(top);
    string.split('\n').forEach((i) => { console.log('┃', i + fill_1.fill(' ', maxL - calcLength_1.calcLength(i) - 2), '┃'); });
    console.log(bottom);
}
function checkVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const currentVersion = defaults_1.Version;
        const npm = new NpmApi();
        const repo = npm.repo('sus-obfuscator');
        const _package = yield repo.package();
        const latestVersion = _package.version;
        if (currentVersion != latestVersion)
            printVersionInfo([currentVersion, latestVersion]);
    });
}
exports.checkVersion = checkVersion;
