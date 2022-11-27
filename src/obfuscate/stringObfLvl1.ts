import { fill } from '../util/fill'

const pad = (x: string) => fill(5 - x.length, '0') + x

export function stringObfLvl1(str: string) {
	var out = '"'

	str.split('').forEach((i) => {
		const code = i.charCodeAt(0)
		const thing = pad(code.toString(16))
		out += '\\u' + thing
	})
	
	return out + '"'
}