import { comment } from '../obfuscate/comment'
import { leftExpression } from './leftExpression'

export function arrayPattern(expr: any) {
	var data = '[' + comment(3)

	expr.elements.forEach((i: any) => {
		if (i !== null) {
			data += leftExpression(i)
		} else data += comment(3)

		data += ','
	})

	data += ']' + comment(2)

	return data
}