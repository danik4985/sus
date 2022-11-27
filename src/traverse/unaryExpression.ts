import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function unaryExpression(expr: any) {
	return expr.operator + comment(1) + '(' + rightExpression(expr.argument) + ')'
}