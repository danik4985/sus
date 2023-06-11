import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { arrayPattern } from './arrayPattern'

export function objectPattern(expr: any) {
	var data = '{' + comment(3)

	expr.properties.forEach((i: any, n: number) => {
		if (i.value.type === 'Identifier') {
			data += i.value.name
		} else if (i.value.type === 'ObjectPattern') {
			data += objectPattern(i.value)
		} else if (i.value.type === 'ArrayPattern') {
			data += arrayPattern(i.value)
		} else warn(`Unknown expression type in objectPattern(e) => e.properties[${n}].value : ${i.value.type}`)

		data += comment(3) + ':' + comment(2)
		data += cfg().transforms.obfuscateNames ? obfuscateName(i.key.name) : i.key.name
		data += comment(3) + ','
	})

	data += '}' + comment(2)

	return data
}