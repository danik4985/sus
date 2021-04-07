import * as fs from 'fs'
import { Token } from 'js-tokens'
import * as randomstring from 'randomstring'

import { DefaultIdentifierNames } from './defaults'
import { encase } from './encase'
import { rand } from './rand'

const jsTokens = require('js-tokens')

// Declare constants
const _file = process.argv[2]
const __file = process.argv[3]
const raw = String(fs.readFileSync(_file))
const tokens: Token[] = Array.from(jsTokens(raw))

// Declare variables
var map = {}
var _map: string[] = []
var _tokens = []

// Token loop
tokens.forEach((i, n) => {
	var _this: Token = i

	console.log(n, i)

	// Renaming variables
	if (i.type === 'IdentifierName'
	 && !DefaultIdentifierNames.includes(i.value)
	 && tokens[(n-1)].value != '.'
	 && tokens[(n+1)].value != ':') {

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
	console.log(n, _this)
})

var final = 'function řඞŘ(řඞŘඞ, řඞŘඞř) { return řඞŘඞř + řඞŘඞ }\n'

_tokens.forEach((i) => { final += i.value })

fs.writeFileSync(__file, final)