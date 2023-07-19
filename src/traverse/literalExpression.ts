import { E_FNC_NAME } from '../main'
import { booleanObf } from '../obfuscate/booleanObf'
import { comment } from '../obfuscate/comment'
import { numberObf } from '../obfuscate/numberObf'
import { stringObf } from '../obfuscate/stringObf'

export function literalExpression({ value, regex }: any) {
	if (typeof value === 'string') {
		return stringObf(value)
	} else if (typeof value === 'number') {
		return numberObf(value)
	} else if (typeof value === 'boolean') {
		return booleanObf(value)
	} else if (value === undefined) {
		return 'undefined' + comment(2)
	} else if (value === null) {
		return 'null' + comment(2)
	} else if (regex !== null) {
		return `new ${E_FNC_NAME()}(${stringObf(regex.pattern)}, ${stringObf(regex.flags)})`
	}
}