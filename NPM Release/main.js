#!/usr/bin/env node
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
const fs = require("fs");
const randomstring = require("randomstring");
const parser = require("simple-args-parser");
const YAML = require("yaml");
const chalk = require("chalk");
const defaults_1 = require("./defaults");
const encase_1 = require("./encase");
const rand_1 = require("./rand");
const startsWithCapital_1 = require("./startsWithCapital");
const misc_1 = require("./misc");
const fill_1 = require("./fill");
const checkVersion_1 = require("./checkVersion");
const randComment_1 = require("./randComment");
const jsTokens = require('js-tokens');
const _args = parser.parse(process.argv, {
    long: ['input:', 'output:', 'config:', 'verbose', 'help', 'version'],
    short: ['i:', 'o:', 'c:', 'v', 'h'],
    errOnDisallowed: true
}, (err) => {
    console.error(err);
});
if (_args.h || _args.help)
    misc_1.printHelp();
if (_args.v || _args.version)
    misc_1.printVersion();
const args = {
    input: _args.i || _args.input,
    output: _args.o || _args.output,
    config: _args.c || _args.config,
    verbose: _args.v || _args.verbose || false
};
if (!args.input
    || !fs.existsSync(args.input)) {
    console.error(chalk.bold.red('Error: Input file not found (8)'));
    misc_1.printHelp();
}
if (!args.output) {
    console.error(chalk.bold.red('Error: Output file not found (9)'));
    misc_1.printHelp();
}
var _config;
if (args.config
    && fs.existsSync(args.config))
    _config = YAML.parse(String(fs.readFileSync(args.config)));
else
    _config = {
        ignore: [], removeEmptyLines: true,
        shrink: true, amogus: [true, false],
        lineStart: false
    };
const config = _config;
function inform(...data) { if (args.verbose)
    console.log(...data); }
console.log(chalk.green('Starting obfuscation of'), chalk.greenBright.bold(args.input));
console.log('Verbose:', chalk.blue(args.verbose));
console.log(chalk.dim.italic('Plase be patient...'));
console.time('Time');
inform('Config:', config);
const _file = args.input;
const __file = args.output;
const raw = String(fs.readFileSync(_file)).split('#!/usr/bin/env node').join('');
const tokens = Array.from(jsTokens(raw));
const Redo = (config.redo) ? defaults_1._Redo.concat(config.redo) : defaults_1._Redo;
var map = { '𓆏ඞ𓆏ඞ𓆏': 'Boolean' };
var _map = ['𓆏ඞ𓆏ඞ𓆏'];
var _tokens = [];
var final = `function řඞŘ(řඞŘඞ, řඞŘඞř) { return řඞŘඞř + řඞŘඞ };const 𓆏ඞ𓆏ඞ𓆏 = Boolean;`;
Redo.forEach((i) => {
    var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' });
    while (_map.includes(rs)) {
        rs = randomstring.generate({ length: 64, charset: 'řඞŘ' });
    }
    _map.push(rs);
    map[i] = rs;
    final += `const ${rs}=${i};`;
});
tokens.forEach((i, n) => {
    var _this = i;
    inform(n, i);
    if (i.type === 'IdentifierName'
        && !defaults_1.DefaultIdentifierNames.includes(i.value)
        && tokens[(n - 1)].value != '.'
        && tokens[(n + 1)].value != ':'
        && !startsWithCapital_1.startsWithCapital(i.value)
        && !config.ignore.includes(i.value)) {
        if (map[i.value]) {
            _this.value = map[i.value];
        }
        else {
            var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' });
            while (_map.includes(rs)) {
                rs = randomstring.generate({ length: 64, charset: 'řඞŘ' });
            }
            _map.push(rs);
            map[i.value] = rs;
            _this.value = map[i.value];
        }
    }
    if (i.type === 'IdentifierName'
        && !defaults_1.DefaultIdentifierNames.includes(i.value)
        && tokens[(n - 1)].value === '.') {
        _tokens[(n - 1)].value = '[';
        _this.value = `${randComment_1.randComment()}${JSON.stringify(i.value)}${randComment_1.randComment()}]`;
    }
    if (i.type === 'IdentifierName'
        && tokens[(n + 1)].value === ':') {
        _this.value = `[${randComment_1.randComment()}${JSON.stringify(i.value)}${randComment_1.randComment()}]`;
    }
    if (i.type === 'MultiLineComment'
        || i.type === 'SingleLineComment')
        _this.value = randComment_1.randComment();
    if (i.type === 'StringLiteral') {
        const stringStart = i.value.split('')[0];
        const stringValue = i.value.slice(1, -1);
        var _strLenA;
        var _strLenB;
        if ((stringValue.length % 2) === 0) {
            _strLenA = stringValue.length / 2;
            _strLenB = stringValue.length / 2;
        }
        else {
            _strLenA = (stringValue.length - 1) / 2;
            _strLenB = ((stringValue.length + 1) / 2) - 1;
        }
        const strSplit = [encase_1.encase(stringValue.slice(0, _strLenA), stringStart), encase_1.encase(stringValue.slice(_strLenB), stringStart)];
        _this.value = `řඞŘ(${strSplit[1]},${randComment_1.randComment()} ${strSplit[0]})`;
    }
    if (i.type === 'NumericLiteral') {
        const _r = [rand_1.rand(0, 10), rand_1.rand(68, 421), rand_1.rand(2, 16), rand_1.rand(8, 24)];
        const __num = Number(i.value);
        const num = __num - _r[1];
        const _num = num / _r[2];
        const rnum = _r[1] / _r[3];
        const template = [`(${rnum} * ${_r[3]})`, `(${_r[2]} * ${_num})`];
        if ((_r[0] % 2) === 0) {
            _this.value = `řඞŘ(${template[1]},${randComment_1.randComment()} ${template[0]})`;
        }
        else {
            _this.value = `řඞŘ(${template[0]},${randComment_1.randComment()} ${template[1]})`;
        }
    }
    if (i.type === 'IdentifierName' && (i.value === 'true'
        || i.value === 'false')) {
        (i.value === 'true') ? _this.value = '𓆏ඞ𓆏ඞ𓆏(!![])' : _this.value = '𓆏ඞ𓆏ඞ𓆏(![])';
    }
    if (i.type === 'LineTerminatorSequence'
        && i.value === '\n'
        && config.shrink) {
        var _next;
        for (let i = (n + 1); i < tokens.length; i++) {
            if (tokens[i].type != 'WhiteSpace') {
                _next = tokens[i];
                break;
            }
        }
        const next = _next;
        var _prev;
        for (let i = (n - 1); i >= 0; i--) {
            if (tokens[i].type != 'WhiteSpace') {
                _prev = tokens[i];
                break;
            }
        }
        const prev = _prev;
        if ((prev && prev.value === ',')
            || (prev && prev.value === '{')
            || (next && next.value === '}')
            || (next && next.value === '||')
            || (next && next.value === '&&')
            || (next && defaults_1.NotAddSemicolon.includes(next.value)))
            _this.value = '';
        else
            _this.value = ';';
    }
    if (i.type === 'WhiteSpace') {
        _this.value = fill_1.fill(' ', rand_1.rand(1, 16));
    }
    _tokens.push(_this);
    inform(n, _this);
});
_tokens.forEach((i) => { final += i.value; });
if (config.removeEmptyLines) {
    var _final = '';
    final.split('\n').forEach((i) => {
        if (i != '' && i != ';') {
            if (config.lineStart === true)
                _final += randComment_1.randComment();
            else if (config.lineStart)
                _final += `/*${config.lineStart}*/`;
            _final += i + '\n';
        }
    });
    final = _final;
}
if (config.amogus) {
    if (config.amogus[0])
        final = defaults_1.Amogus + final;
    if (config.amogus[1])
        final = final + defaults_1.Amogus;
}
fs.writeFileSync(__file, final);
if (!args.verbose)
    process.stdout.write('\x1b[A\x1b[A\x1b[A');
console.log(chalk.green('Done obfuscating'), chalk.greenBright.bold(_file), chalk.green('| Written to'), chalk.greenBright.bold(__file));
console.log('Verbose:', chalk.blue(args.verbose));
console.log(chalk.dim.italic('Obfuscation was sucesfull'));
console.timeEnd('Time');
(() => __awaiter(void 0, void 0, void 0, function* () { checkVersion_1.checkVersion(); }))();
