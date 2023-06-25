import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function returnStatement(expr: any, data = '') {
	data += 'return('
	data += comment(2)

	if (expr.argument) data += rightExpression(expr.argument)
	else data += 'void(0)'

	data += ')'

	return data
}