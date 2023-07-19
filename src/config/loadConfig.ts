import * as fs from 'fs'
import * as YAML from 'yaml'

import { createRandomSeed } from '../random/createRandomSeed'
import { Config } from './Config'

export const __cfg: Config[] = []

function tlvl(o: any, d: 0 | 1 | 2 | 3): 0 | 1 | 2 | 3 {
	if (o === 0) return 0
	if (o === 1) return 1
	if (o === 2) return 2
	if (o === 3) return 3

	return d
}

const numer = (a: any, n: number) => typeof a === 'number' ? a : n
const arr = (a: any, v: string[]) => Array.isArray(a) ? a : v

export function loadConfig(f: string): Config {
	const string = String(fs.readFileSync(f))
	const obj = YAML.parse(string) ?? {}

	const data: Config = {
		transforms: {
			obfuscateNames: obj.transforms?.obfuscateNames ?? true,
			obfuscateBooleans: obj.transforms?.obfuscateBooleans ?? true,
	
			keyObfuscationLevel: tlvl(obj.transforms?.keyObfuscationLevel, 2),
			stringObfLevel: tlvl(obj.transforms?.stringObfLevel, 3),
			numberObfLevel: tlvl(obj.transforms?.numberObfLevel, 3),
			stringArrObfLevel: tlvl(obj.transforms?.stringArrObfLevel, 2),

			checkNumbers: true,

			extractStringsToArray: obj.transforms?.extractStringsToArray ?? 'Random',
			addFakeStringsToArray: obj.transforms?.addFakeStringsToArray ?? true,

			ignore: arr(obj.transforms?.ignore, []),

			webMode: obj.transforms?.webMode ?? false,

			noES2021Syntax: obj.transforms?.noES2021Syntax ?? false,
			obfuscateFlow: obj.transforms?.obfuscateFlow ?? false
		},
	
		format: {
			amogus: {
				start: obj.format?.amogus?.start ?? true,
				end: obj.format?.amogus?.end ?? false,
			},
	
			epicEndArt: obj.format?.epicEndArt ?? true,
	
			lineStart: obj.format?.lineStart ?? true,
			lineEnd: obj.format?.lineEnd ?? false,
	
			removeEmptyLines: obj.format?.removeEmptyLines ?? false,
			shrink: obj.format?.shrink ?? false,
			commentFrequency: tlvl(obj.format?.commentFrequency, 2),

			comments: obj.format?.comments || false
		},

		input: {
			esVersion: numer(obj.input?.esVersion, 6),
			seed: obj.input?.seed || createRandomSeed()
		}
	}

	__cfg.push(data)

	return data
}
