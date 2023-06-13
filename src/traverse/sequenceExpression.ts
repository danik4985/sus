import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function sequenceExpression(expr: any) {
	var data = '(' + comment(3)
	const l: number = expr.expressions.length - 1

	expr.expressions.forEach((i: any, n: number) => {
		data += rightExpression(i)
		if (n < l) data += ','
		else data += comment(3)
	})

	data += ')' + comment(2)

	return data
}