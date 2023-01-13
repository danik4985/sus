import { cfg } from '../config/cfg'
import { B_FNC_NAME } from '../main'

export function booleanObf(bool: boolean) {
	if (cfg().transforms.obfuscateBooleans) {
		return `${B_FNC_NAME()}(!${bool ? '' : '!'}+[])`
	} else {
		return bool
	}
}