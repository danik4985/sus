import { cfg } from '../config/cfg'
import { Randomizer } from '../random/Randomizer'

const map: { [k: string]: string } = {}
const _map: string[] = []

const defaults = [
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'interface',
	'let',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'super',
	'switch',
	'static',
	'this',
	'throw',
	'try',
	'true',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield',
	'__dirname',
	'__filename',
	'clearImmediate',
	'clearInterval',
	'clearTimeout',
	'Event',
	'EventTarget',
	'exports',
	'global',
	'MessageChannel',
	'MessageEvent',
	'MessagePort',
	'module',
	'process',
	'queueMicrotask',
	'setImmediate',
	'setInterval',
	'setTimeout',
	'TextDecoder',
	'TextEncoder',
	'URL',
	'URLSearchParams',
	'WebAssembly'
]

const REDO = [
	'String',
	'Object',
	'require',
	'Number',
	'JSON',
	'Math',
	'Date',
	'console'
]

export const REDONE_PAIRS: string[][] = []

var ranDefaults = false

export function _obfuscateName(name: string, bfRD = false) {
	if (!ranDefaults && !bfRD) {
		// lets not obfuscate console and shit
		defaults.forEach(i => map[i] = i)
		cfg().transforms.ignore.forEach(i => map[i] = i)
		REDO.forEach((i) => REDONE_PAIRS.push([ i, _obfuscateName(i, true) ]))
		ranDefaults = true
	}
	if (map[name]) return map[name]
	var rs = Randomizer.INSTANCE.randIName(64)
	while (_map.includes(rs)) rs = Randomizer.INSTANCE.randIName(64)
	_map.push(rs)
	map[name] = rs
	return rs
}

const DEBUG_MODE = false

export function obfuscateName(name: string) {
	const d = DEBUG_MODE ?  `_obf_${name}_sus`  : _obfuscateName(name)
	// console.log(name, d)
	return d
}
