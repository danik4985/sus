export interface Config {
	transforms: {
		obfuscateNames: boolean
		obfuscateBooleans: boolean

		keyObfuscationLevel: 0 | 1 | 2 | 3
		stringObfLevel: 0 | 1 | 2 | 3
		numberObfLevel: 0 | 1 | 2 | 3
		stringArrObfLevel: 0 | 1 | 2 | 3

		checkNumbers: boolean

		extractStringsToArray: boolean | 'Random'
		addFakeStringsToArray: boolean

		ignore: string[]
		webMode: boolean

		noES2021Syntax: boolean
		obfuscateFlow: boolean
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