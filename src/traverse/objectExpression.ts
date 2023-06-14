import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { stringObf } from '../obfuscate/stringObf'
import { rightExpression } from './rightExpression'

export function objectExpression(expr: any) {
	var data = comment(2) + '{'

	//console.log(expr)

	;(expr.properties as any[]).forEach((i, n) => {
		// console.log('::', i)

		if (i.computed) {
			// TODO: this
			warn(`Computed property in objectExpression: ${JSON.stringify(i)}`)
		} else {
			if (i.type === 'Property') {
				data += '['

				if (i.key.type === 'Identifier') {
					data += stringObf(i.key.name, cfg().transforms.keyObfuscationLevel)
				} else {
					data += rightExpression(i.key)
				}

				data += comment(3) + ']:' + rightExpression(i.value)
			} else if (i.type === 'SpreadElement') {
				data += '...' + comment(3) + rightExpression(i.argument)
			} else warn(`Unknown expression type in objectExpression(e) => e.properties[${n}] : ${i.type}`)
		}

		data += comment(2)
		data += ','
	})

	data += '}' + comment(3)

	return data
}