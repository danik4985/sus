import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function breakStatement(expr: any) {
	if (expr.label) {
		return comment(3) + 'break ' + comment(2) + rightExpression(expr.label)
	} else return comment(3) + 'break'
}