#!/usr/bin/env node

import * as fs from 'fs'
import { Token } from 'js-tokens'
import * as randomstring from 'randomstring'
import * as parser from 'simple-args-parser'
import * as YAML from 'yaml'
import * as chalk from 'chalk'

import { Amogus, DefaultIdentifierNames, EpicArt, NotAddSemicolon, _Redo } from './defaults'
import { encase } from './encase'
import { rand } from './rand'
import { startsWithCapital } from './startsWithCapital'
import { Config } from './types'
import { printHelp, printVersion } from './misc'
import { fill } from './fill'
import { checkVersion } from './checkVersion'
import { randComment } from './randComment'
import { FakeCodeManager } from './FakeCodeMaganer'
import { BlankCodeManager } from './BlankCodeManager'

const jsTokens = require('js-tokens')

// Parse arguments
const _args: any = parser.parse(process.argv, {
	long: ['input:', 'output:', 'config:', 'verbose', 'help', 'version'],
	short: ['i:', 'o:', 'c:', 'v', 'h'],
	errOnDisallowed: true
}, (err: string) => {
	console.error(err)
})

/* HELP    => */ if (_args.h || _args.help) printHelp()
/* VERSION => */ if (_args.version) printVersion()

const args = {
	input: _args.i || _args.input,
	output: _args.o || _args.output,
	config: _args.c || _args.config,
	verbose: _args.v || _args.verbose || false
}

if (!args.input
 || !fs.existsSync(args.input)) {
	console.error(chalk.bold.red('Error: Input file not found (8)'))
	printHelp()
}

if (!args.output) {
	 console.error(chalk.bold.red('Error: Output file not found (9)'))
	 printHelp()
}

// Load config
var _config: Config
if (args.config
 && fs.existsSync(args.config)) {
	_config = YAML.parse(String(fs.readFileSync(args.config)))
	inform('Loading custom config')
} else _config = {
	ignore: [], removeEmptyLines: true,
	shrink: true, amogus: [ true, false ],
	lineStart: true, epicEndArt: true, fakeCode: false
}
const config = _config

// Inform function
function inform(...data: any) { if (args.verbose) console.log(chalk.blue('[i]'), ...data) }

// Terminal announcement
console.log(chalk.green('Starting obfuscation of'), chalk.greenBright.bold(args.input))
console.log('Verbose:', chalk.blue(args.verbose))
console.log(chalk.dim.italic('Plase be patient...'))

console.time('Time')

inform('Config:', config)
inform('Args:', args)

// Declare constants
const _file = args.input
const __file = args.output
const raw = String(fs.readFileSync(_file)).split('#!/usr/bin/env node').join('')
const tokens: Token[] = Array.from(jsTokens(raw))
const Redo = (config.redo) ? _Redo.concat(config.redo) : _Redo
const fakeCode = (config.fakeCode) ? new FakeCodeManager() : new BlankCodeManager()

inform(fakeCode)

// Declare variables
var map = { '𓆏ඞ𓆏ඞ𓆏': 'Boolean' }
var _map: string[] = [ '𓆏ඞ𓆏ඞ𓆏' ]
var _tokens = []
var final = `function řඞŘ(řඞŘඞ, řඞŘඞř) { return řඞŘඞř + řඞŘඞ };const 𓆏ඞ𓆏ඞ𓆏 = Boolean;`
var keyStrings: string[] = []

// Redo some basics
Redo.forEach((i) => {
	var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' })
	while (_map.includes(rs)) { rs = randomstring.generate({ length: 64, charset: 'řඞŘ' }) }

	_map.push(rs)
	map[i] = rs

	final += `const ${randComment()}\t${rs}=${i};`
})

// Token loop
tokens.forEach((i, n) => {
	var _this: Token = i

	// inform(n, i)

	// Renaming variables
	if (i.type === 'IdentifierName'
	 && !DefaultIdentifierNames.includes(i.value)
	 && (!tokens[(n-1)] || tokens[(n-1)].value != '.')
	 && tokens[(n+1)].value != ':'
// && !startsWithCapital(i.value)
	 && !config.ignore.includes(i.value)) {

		if (map[i.value]) { // This value exists
			_this.value = map[i.value]
		} else { // Create this value
			var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' })
			while (_map.includes(rs)) { rs = randomstring.generate({ length: 64, charset: 'řඞŘ' }) }

			_map.push(rs)
			map[i.value] = rs
			_this.value = '/*ඞ\u202Eඞ*/' + map[i.value]
		}
	}

	// Puting things after . to [] and encoding them
	if (i.type === 'IdentifierName'
	&& !DefaultIdentifierNames.includes(i.value)
	&& tokens[(n-1)] && tokens[(n-1)].value === '.') {
		_tokens[(n-1)].value = '['
		_this.value = `${randComment()}${JSON.stringify(i.value.split('').reverse())}.reverse().join('')${randComment()}]`
	}

	// Putting things before : to [] and registering them to the get function
	if (i.type === 'IdentifierName'
	 && tokens[(n+1)].value === ':') {
		const _r = [ rand(1, 10), rand(3, 7), rand(2, 16) ]

		for (let i = 0; i < _r[0]; i++) {
			keyStrings.push(randomstring.generate(rand(4, 16)))
		}

		const l = keyStrings.length
		keyStrings.push(i.value)

		for (let i = 0; i < _r[1]; i++) {
			keyStrings.push(randomstring.generate(rand(4, 16)))
		}

		_this.value = `[${randComment()}Řඞř(${l / _r[2]}${randComment()},${_r[2]})${randComment()}]`
	}

	// Re-doing comments
	if (i.type === 'MultiLineComment'
	 || i.type === 'SingleLineComment') _this.value = randComment()

	// Strings
	if (i.type === 'StringLiteral') {
		const stringStart = i.value.split('')[0]
		const stringValue = i.value.slice(1, -1)
		var _strLenA: number
		var _strLenB: number

		if ((stringValue.length % 2) === 0) {
			_strLenA = stringValue.length / 2
			_strLenB = stringValue.length / 2
		} else {
			_strLenA = (stringValue.length - 1) / 2
			_strLenB = ((stringValue.length + 1) / 2) - 1
		}

		const strSplit = [ encase(stringValue.slice(0, _strLenA), stringStart), encase(stringValue.slice(_strLenB), stringStart) ]

		_this.value = `řඞŘ(${strSplit[1]},${randComment()} ${strSplit[0]})`
	}

	// Number
	if (i.type === 'NumericLiteral') {
		const _r = [ rand(0, 10), rand(68, 421), rand(2, 16), rand(8, 24) ]
		const __num = Number(i.value)

		const num = __num - _r[1]
		const _num = num / _r[2]
		const rnum = _r[1] / _r[3]

		const template = [ `(${rnum} * ${_r[3]})`, `(${_r[2]} * ${_num})` ]

		if ((_r[0] % 2) === 0) {
			_this.value = `řඞŘ(${template[1]},${randComment()} ${template[0]})`
		} else {
			_this.value = `řඞŘ(${template[0]},${randComment()} ${template[1]})`
		}
	}

	// Boolean
	if (i.type === 'IdentifierName' && (
		i.value === 'true'
 || i.value === 'false'
	)) {
		(i.value === 'true') ? _this.value = '𓆏ඞ𓆏ඞ𓆏(!![])' : _this.value = '𓆏ඞ𓆏ඞ𓆏(![])'
	}

	// Removing newlines
	if (i.type === 'LineTerminatorSequence'
	 && i.value === '\n') {
		var _next: Token
		for (let i = (n + 1); i < tokens.length; i++) { 
			if (tokens[i].type != 'WhiteSpace'
			 && tokens[i].type != 'LineTerminatorSequence') {
				_next = tokens[i]
				break
			}
		}
		const next = _next

		var _prev: Token
		for (let i = (n - 1); i >= 0; i--) { 
			if (tokens[i].type != 'WhiteSpace'
			&& tokens[i].type != 'LineTerminatorSequence') {
				_prev = tokens[i]
				break
			}
		}
		const prev = _prev

		inform('DEBUG: ', prev, next)
		// inform('=', next.value === ')')

		if (config.shrink && (
			  (prev && prev.value === ',')
		 || (prev && prev.value === '(')
		 || (prev && prev.value === '{')
		 || (next && next.value === ')')
		 || (next && next.value === '}')
		 || (next && next.value === '||')
		 || (next && next.value === '&&')
		 || (next && NotAddSemicolon.includes(next.value)))) _this.value = ''
		else _this.value = ';'

		// inform('VALUE', _this.value)

		if ((prev && prev.value === ',')
		 || (prev && prev.value === '{')
		 || (next && next.value === '}')
		 || (next && next.value === '||')
		 || (next && next.value === '&&')
		 || (next && next.value === ')')
		 || (next && NotAddSemicolon.includes(next.value))) {}
		else {
			if (config.fakeCode) {
				var data = fakeCode.generate()
				if (config.shrink) data = data.split('\n').join(';')
				_this.value += data
			}
		}
	}

	// Messing up whitespaces and add extra rlo
	if (i.type === 'WhiteSpace') {
		_this.value = fill(' ', rand(1, 16)) + (rand(0, 2) % 2 === 0) ? '/*\u202E*/' : '/**//**/'
	}

	_tokens.push(_this)
	// inform(n, _this)
})

// Prepare the final string
final += `function Řඞř(Řඞřඞ,ඞŘඞř) {const ŘඞřඞඞŘඞř= [`

keyStrings.forEach((i, n) => {
	final += JSON.stringify(i)

	if (rand(0, 2) % 2 === 0) final += '/*Řඞřඞ,\u202EඞŘඞř*/'
	else final += '/*Řඞřඞ,ඞŘඞř*/'
	if (keyStrings[n+1]) final += ','
})

final += `] ;return ŘඞřඞඞŘඞř[ඞŘඞř * Řඞřඞ]}`

// Build the string
_tokens.forEach((i) => { final += i.value })

// Remove empty lines
if (config.removeEmptyLines) {
	var _final: string = ''
	final.split('\n').forEach((i) => {
		if (i != '' && i != ';') {
			if (config.lineStart === true) _final += randComment()
			else if (config.lineStart) _final += `/*${config.lineStart}*/`

			_final += i + '\n'
		}
	})

	final = _final
}

// Add amogus
if (config.amogus) {
	if (config.amogus[0]) final = Amogus + final
	if (config.amogus[1]) final = final + Amogus
}

if (config.epicEndArt) final += '\n' + EpicArt

fs.writeFileSync(__file, final)

// Terminal announcement
if (!args.verbose) process.stdout.write('\x1b[A\x1b[A\x1b[A')

console.log(chalk.green('Done obfuscating'), chalk.greenBright.bold(_file), chalk.green('| Written to'), chalk.greenBright.bold(__file))
console.log('Verbose:', chalk.blue(args.verbose))
console.log(chalk.dim.italic('Obfuscation was sucesfull'))

console.timeEnd('Time'); /* Semicolon has to be here, so that the following async block works */

// Check version
(async () => { checkVersion() })()