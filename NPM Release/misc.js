"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printVersion = exports.printHelp = void 0;
const chalk = require("chalk");
const defaults_1 = require("./defaults");
function printHelp() {
    console.log(chalk.cyan.bold('sus'), '| The "epic" javascript obfuscator');
    console.log(defaults_1.HelpText);
    console.log(chalk.bold('Usage:'), chalk.inverse(' sus <args> '));
    process.exit(0);
}
exports.printHelp = printHelp;
function printVersion() {
    console.log(chalk.cyan.bold('sus'), '| The "epic" javascript obfuscator');
    console.log('Version:', chalk.bold(defaults_1.Version), '\n');
    console.log(chalk.dim('Licensed under MIT License'));
    console.log(chalk.dim('Built with tsc version 4.2.4'));
    process.exit(0);
}
exports.printVersion = printVersion;
