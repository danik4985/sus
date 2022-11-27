import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { stringObf } from '../obfuscate/stringObf'
import { rightExpression } from './rightExpression'

export function objectExpression(expr: any) {
	var data = comment(2) + '{'

	// console.log(expr)

	;(expr.properties as any[]).forEach((i) => {
		// console.log('::', i)

		if (i.computed) {
			// TODO: this
		} else {
			data += '['

			if (i.key.type === 'Identifier') {
				data += stringObf(i.key.name, cfg().transforms.keyObfuscationLevel)
			} else {
				data += rightExpression(i.key)
			}

			data += comment(3) + ']:'
		}

		data += rightExpression(i.value)
		data += comment(2)
		data += ','
	})

	data += '}' + comment(3)

	return data
}