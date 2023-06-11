import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function newExpression(expr: any) {
	var data = 'new ' + comment(2)

	data += '(' + comment(3) + rightExpression(expr.callee) + comment(3) + ')' + comment(2) + '('

	expr.arguments.forEach((i: any) => {
		data += rightExpression(i) + comment(3) + ','
	})

	data += ')'

	return data
}