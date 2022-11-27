import { cfg } from '../config/cfg'

export function booleanObf(bool: boolean) {
	if (cfg().transforms.obfuscateBooleans) {
		return `Řඞř(!${bool ? '' : '!'}+[])`
	} else {
		return bool
	}
}