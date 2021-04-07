import * as fs from 'fs'
import { Token } from 'js-tokens'
import * as randomstring from 'randomstring'
import * as parser from 'simple-args-parser'
import * as YAML from 'yaml'

import { DefaultIdentifierNames } from './defaults'
import { encase } from './encase'
import { rand } from './rand'
import { startsWithCapital } from './startsWithCapital'
import { Config } from './types'

const jsTokens = require('js-tokens')

// Parse arguments
const _args: any = parser.parse(process.argv, {
	long: ['input:', 'output:', 'config:', 'verbose'],
	short: ['i:', 'o:', 'c:', 'v'],
	errOnDisallowed: true
}, (err: string) => {
	console.error(err)
})

const args = {
	input: _args.i || _args.input,
	output: _args.o || _args.output,
	config: _args.c || _args.config,
	verbose: _args.v || _args.verbose || false
}

if (!args.input
 || !fs.existsSync(args.input)) {
	console.error('Error: Input file not found (8)')
	process.exit(8)
}

if (!args.output
	|| !fs.existsSync(args.output)) {
	 console.error('Error: Output file not found (9)')
	 process.exit(9)
}

// Load config
var _config: Config
if (args.config
 && fs.existsSync(args.config)) _config = YAML.parse(String(fs.readFileSync(args.config)))
else _config = { ignore: [], removeEmptyLines: true }
const config = _config

// inform
function inform(...data: any[]) {
	if (args.verbose) console.log(data)
}

// Declare constants
const _file = args.input
const __file = args.output
const raw = String(fs.readFileSync(_file))
const tokens: Token[] = Array.from(jsTokens(raw))

// Declare variables
var map = {}
var _map: string[] = []
var _tokens = []

// Token loop
tokens.forEach((i, n) => {
	var _this: Token = i

	inform(n, i)

	// Renaming variables
	if (i.type === 'IdentifierName'
	 && !DefaultIdentifierNames.includes(i.value)
	 && tokens[(n-1)].value != '.'
	 && tokens[(n+1)].value != ':'
	 && !startsWithCapital(i.value)
	 && !config.ignore.includes(i.value)) {

		if (map[i.value]) { // This value exists
			_this.value = map[i.value]
		} else { // Create this value
			var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' })
			while (_map.includes(rs)) { rs = randomstring.generate({ length: 64, charset: 'řඞŘ' }) }

			_map.push(rs)
			map[i.value] = rs
			_this.value = map[i.value]
		}
	}

	// Puting things after . to []
	if (i.type === 'IdentifierName'
	&& !DefaultIdentifierNames.includes(i.value)
	&& tokens[(n-1)].value === '.') {
		_tokens[(n-1)].value = '['
		_this.value = `/* gay popbob sex dupe */${JSON.stringify(i.value)}/* gay popbob sex dupe */]`
	}

	// Putting things before : to []
	if (i.type === 'IdentifierName'
	 && tokens[(n+1)].value === ':') {
		_this.value = `[/*amogus*/${JSON.stringify(i.value)}/*amogus*/]`
	}

	// Re-doing comments
	if (i.type === 'MultiLineComment'
	 || i.type === 'SingleLineComment') _this.value = '/* gay popbob sex dupe */'

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

		_this.value = `řඞŘ(${strSplit[1]},/*ඞ sus ඞ*/ ${strSplit[0]})`
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
			_this.value = `řඞŘ(${template[1]},/*ඞ sus ඞ*/ ${template[0]})`
		} else {
			_this.value = `řඞŘ(${template[0]},/*ඞ sus ඞ*/ ${template[1]})`
		}
	}

	_tokens.push(_this)
	inform(n, _this)
})

var final = 'function řඞŘ(řඞŘඞ, řඞŘඞř) { return řඞŘඞř + řඞŘඞ }\n'

_tokens.forEach((i) => { final += i.value })

if (config.removeEmptyLines) {
	var _final: string = ''
	final.split('\n').forEach((i) => {
		if (i != '') {
			_final += i + '\n'
		}
	})

	final = _final
}

fs.writeFileSync(__file, final)