import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function tryStatement(expr: any) {
	var data = ''

	data += 'try' + comment(2) + '{'
	data += traverse(expr.block.body)
	data += '}'

	if (expr.handler) {
		data += 'catch'

		if (expr.handler.param) {
			data += comment(2) + '(' + rightExpression(expr.handler.param) + comment(3) + ')'
		}

		data += '{' + comment(1)
		data += traverse(expr.handler.body.body)
		data += '}'
	}

	if (expr.finalizer) {
		data += 'finally' + comment(2) + '{'
		data += traverse(expr.finalizer.body)
		data += '}'
	}

	return data
}