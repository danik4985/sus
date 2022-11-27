import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function awaitExpression(expr: any) {
	// console.log(expr, expr.argument, rightExpression(expr.argument))
	return 'await(' + comment(1) + rightExpression(expr.argument) + ')'
}