export interface Config {
	transforms: {
		obfuscateNames: boolean
		obfuscateBooleans: boolean

		keyObfuscationLevel: 0 | 1 | 2 | 3
		stringObfLevel: 0 | 1 | 2 | 3
		numberObfLevel: 0 | 1 | 2 | 3

		extractStringsToArray: boolean | 'Random'

		ignore: string[]
		webMode: boolean

		noES2021Syntax: boolean
	}

	format: {
		amogus: {
			start: boolean
			end: boolean
		}

		epicEndArt: boolean

		lineStart: string | boolean
		lineEnd: string | boolean

		removeEmptyLines: boolean
		shrink: boolean
		commentFrequency: 0 | 1 | 2 | 3

		comments: string[]
	}

	input: {
		esVersion: number
		seed: string
	}
}